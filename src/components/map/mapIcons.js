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

export const createRequestIcon = (type) => {
  const isPending = type === 'Pending';
  const color = isPending ? "#64748B" : "#F43F5E";
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
      ${isPending 
        ? `<rect x="10" y="10" width="20" height="20" rx="4" fill="${color}" transform="rotate(45 20 20)" filter="url(#shadow)"/>
           <path d="M20 16V20L22.5 21.5M26.5 20C26.5 23.6 23.6 26.5 20 26.5C16.4 26.5 13.5 23.6 13.5 20C13.5 16.4 16.4 13.5 20 13.5C23.6 13.5 26.5 16.4 26.5 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<rect x="6" y="6" width="28" height="28" rx="8" fill="${color}" filter="url(#shadow)"/>
           <path d="M15 16V26C15 26.8 15.7 27.5 16.5 27.5H23.5C24.3 27.5 25 26.8 25 26V16M20 12.5V16M15 16H25M18 21H22" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`
      }
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
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
