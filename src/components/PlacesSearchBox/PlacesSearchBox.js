import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// Drop-in replacement for @react-google-maps/api's <StandaloneSearchBox>.
//
// Google closed the legacy google.maps.places.SearchBox / Autocomplete to new API keys and projects
// (March 2025), so this box uses the Places API (New) instead:
//   - AutocompleteSuggestion.fetchAutocompleteSuggestions() for the dropdown while typing;
//   - placePrediction.toPlace().fetchFields() for the address and coordinates of the picked result.
// The Google Cloud project needs "Places API (New)" enabled (plus "Maps JavaScript API").
//
// It keeps the old contract so the pages don't change:
//   - onLoad(box) hands over an object with getPlaces();
//   - onPlacesChanged() fires after a pick;
//   - each place has geometry.location (a LatLng with lat()/lng()), formatted_address, name and vicinity.
//
// Usage is the same as before: wrap one <input>.

const FIELDS = ["displayName", "formattedAddress", "location", "addressComponents"];
const MIN_CHARS = 2;
const DEBOUNCE_MS = 250;

// The old SearchBox results had snake_case fields; map the new Place object onto that shape
function toLegacyPlace(place) {
  const components = place.addressComponents || [];
  const city =
    components.find((c) => c.types.includes("locality")) ||
    components.find((c) => c.types.includes("administrative_area_level_2"));
  return {
    place_id: place.id,
    name: place.displayName,
    formatted_address: place.formattedAddress,
    vicinity: city ? city.longText : undefined,
    geometry: { location: place.location },
    address_components: components.map((c) => ({
      long_name: c.longText,
      short_name: c.shortText,
      types: c.types,
    })),
  };
}

const placesLib = () => window.google?.maps?.places;

export default function PlacesSearchBox({ onLoad, onPlacesChanged, children }) {
  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);

  const wrapperRef = useRef(null);
  const placesRef = useRef([]);
  const tokenRef = useRef(null); // one autocomplete session = typing until a pick (Google bills per session)
  const timerRef = useRef(null);
  const requestRef = useRef(0);
  const onPlacesChangedRef = useRef(onPlacesChanged);
  onPlacesChangedRef.current = onPlacesChanged;

  // The object the pages keep in their ref, like the old SearchBox instance
  const box = useMemo(() => ({ getPlaces: () => placesRef.current }), []);
  useEffect(() => {
    if (onLoad) onLoad(box);
  }, [box]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const inputEl = useCallback(() => wrapperRef.current?.querySelector("input"), []);

  const close = useCallback(() => {
    setOpen(false);
    setActive(-1);
  }, []);

  // The dropdown is drawn on <body> (like Google's old one) so overflow:hidden parents can't clip it
  const updateRect = useCallback(() => {
    const el = inputEl();
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ left: r.left, top: r.bottom + 4, width: r.width });
  }, [inputEl]);

  useEffect(() => {
    if (!open) return undefined;
    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [open, updateRect]);

  const fetchSuggestions = useCallback((text) => {
    clearTimeout(timerRef.current);
    const lib = placesLib();
    if (!text || text.trim().length < MIN_CHARS || !lib?.AutocompleteSuggestion) {
      requestRef.current += 1; // drop any answer still on its way
      setSuggestions([]);
      close();
      return;
    }
    timerRef.current = setTimeout(async () => {
      const id = ++requestRef.current;
      if (!tokenRef.current) tokenRef.current = new lib.AutocompleteSessionToken();
      try {
        const { suggestions: list } = await lib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: text,
          sessionToken: tokenRef.current,
          includedRegionCodes: ["il"],
        });
        if (id !== requestRef.current) return; // a newer request replaced this one
        const predictions = (list || []).map((s) => s.placePrediction).filter(Boolean);
        setSuggestions(predictions);
        setActive(-1);
        setOpen(predictions.length > 0);
      } catch (err) {
        console.error("Google Places autocomplete failed:", err);
        setSuggestions([]);
        close();
      }
    }, DEBOUNCE_MS);
  }, [close]);

  const choose = useCallback(async (prediction) => {
    requestRef.current += 1;
    clearTimeout(timerRef.current);
    setSuggestions([]);
    close();
    const el = inputEl();
    if (el && prediction.text) el.value = prediction.text.text; // show the pick, like the old box did
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: FIELDS });
      tokenRef.current = null; // the pick ends this session
      placesRef.current = [toLegacyPlace(place)];
      if (onPlacesChangedRef.current) onPlacesChangedRef.current();
    } catch (err) {
      console.error("Google Places details failed:", err);
    }
  }, [close, inputEl]);

  const handleKeyDown = (e) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault(); // pick the address instead of submitting the form
      choose(suggestions[active >= 0 ? active : 0]);
    } else if (e.key === "Escape") {
      close();
    }
  };

  const child = Children.only(children);
  const input = cloneElement(child, {
    autoComplete: "off",
    role: "combobox",
    "aria-autocomplete": "list",
    "aria-expanded": open,
    onChange: (e) => {
      if (child.props.onChange) child.props.onChange(e);
      fetchSuggestions(e.target.value);
    },
    onKeyDown: (e) => {
      if (child.props.onKeyDown) child.props.onKeyDown(e);
      handleKeyDown(e);
    },
    onFocus: (e) => {
      if (child.props.onFocus) child.props.onFocus(e);
      if (suggestions.length > 0) setOpen(true);
    },
    onBlur: (e) => {
      if (child.props.onBlur) child.props.onBlur(e);
      close();
    },
  });

  const dropdown =
    open && rect
      ? createPortal(
          <ul
            role="listbox"
            style={{ position: "fixed", left: rect.left, top: rect.top, width: rect.width, zIndex: 10000 }}
            className="max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white text-left shadow-lg"
          >
            {suggestions.map((p, i) => (
              <li
                key={p.placeId || i}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault(); // keep the input focused until the pick is done
                  choose(p);
                }}
                onMouseEnter={() => setActive(i)}
                className={`cursor-pointer px-4 py-2 text-sm ${i === active ? "bg-gray-100" : ""}`}
              >
                <div className="font-medium text-gray-800">{p.mainText?.text || p.text?.text}</div>
                {p.secondaryText?.text && <div className="text-xs text-gray-500">{p.secondaryText.text}</div>}
              </li>
            ))}
            <li aria-hidden="true" className="px-4 py-1 text-right text-[10px] text-gray-400">
              powered by Google
            </li>
          </ul>,
          document.body
        )
      : null;

  return (
    <div ref={wrapperRef} style={{ display: "contents" }}>
      {input}
      {dropdown}
    </div>
  );
}
