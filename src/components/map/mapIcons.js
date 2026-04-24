export const markerColors = {
  blue: "#3B82F6", // Magazines/Cardboard
  carton: "#92400E", // Carton
  "electronic-waste": "#EF4444", // Electronics
  orange: "#F97316", // Plastic
  purple: "#A855F7", // Glass
  textile: "#65A30D", // Clothes
  default: "#10B981",
};

export const createMarkerIcon = (type) => {
  const color = markerColors[type] || markerColors.default;
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
          <feOffset dx="0" dy="1.5" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="20" cy="20" r="16" fill="white" filter="url(#shadow)"/>
      <circle cx="20" cy="20" r="16" stroke="${color}" stroke-width="2" stroke-opacity="0.1"/>
      <path d="M25.5 20C25.5 23.0376 23.0376 25.5 20 25.5C16.9624 25.5 14.5 23.0376 14.5 20C14.5 16.9624 16.9624 14.5 20 14.5C23.0376 14.5 25.5 16.9624 25.5 20Z" fill="${color}" fill-opacity="0.15"/>
      <path d="M20 13V15.5M20 24.5V27M27 20H24.5M15.5 20H13" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M16 16L17.5 17.5M24 24L22.5 22.5M16 24L17.5 22.5M24 16L22.5 17.5" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="20" cy="20" r="3" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const createRequestIcon = (type = "") => {
  const normalizedType = String(type).toLowerCase();
  const isPending = normalizedType.includes("pending");
  const color = isPending ? "#64748B" : "#F43F5E";
  
  const svg = `
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      
      ${isPending 
        ? `<!-- Pending Request: Slate Diamond -->
           <rect x="12" y="12" width="20" height="20" rx="4" fill="${color}" filter="url(#glow)" transform="rotate(45 22 22)"/>
           <rect x="12" y="12" width="20" height="20" rx="4" stroke="white" stroke-width="2.5" transform="rotate(45 22 22)"/>
           <path d="M22 17V22L24.5 23.5M29 22C29 25.866 25.866 29 22 29C18.134 29 15 25.866 15 22C15 18.134 18.134 15 22 15C25.866 15 29 18.134 29 22Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<!-- Active Request: Rose Rounded Square -->
           <rect x="8" y="8" width="28" height="28" rx="8" fill="${color}" filter="url(#glow)"/>
           <rect x="8" y="8" width="28" height="28" rx="8" stroke="white" stroke-width="2.5"/>
           <path d="M16 20V28C16 28.5523 16.4477 29 17 29H27C27.5523 29 28 28.5523 28 28V20M16 20C16 19.4477 16.4477 19 17 19H27C27.5523 19 28 19.4477 28 20M16 20H28M20 24H24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`
      }
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
};

export const createAddMarkerIcon = () => {
  const color = "#10B981";
  const svg = `
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="20" fill="${color}" fill-opacity="0.2">
        <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="25" cy="25" r="14" fill="white" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.2))"/>
      <path d="M25 19V31M19 25H31" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
