import { useLoadScript } from "@react-google-maps/api";

// The one way to load the Maps script. It is injected once, by whichever page
// loads first, so pages asking for different options could leave `places`
// missing on the others (B7). Keep this array a constant: a new array on every
// render makes the loader warn and reload.
const libraries = ["places"];

export const useGoogleMaps = () =>
  useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
