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
      <path d="M25.5 20C25.5 23.0376 23.0376 25.5 20 25.5C16.9624 25.5 14.5 23.0376 14.5 20C14.5 16.9624 16.9624 14.5 20 14.5C23.0376 14.5 25.5 16.9624 25.5 20Z" fill="${color}" fill-opacity="0.1"/>
      <g transform="translate(8, 8) scale(0.0375)">
        <path d="M216.3 124C262.5 44 378 44 424.2 124L461.5 188.6L489.2 172.6C497.6 167.7 508.1 168.4 515.8 174.3C523.5 180.2 526.9 190.2 524.4 199.6L500.9 287C497.5 299.8 484.3 307.4 471.5 304L384.1 280.6C374.7 278.1 367.8 270.2 366.5 260.6C365.2 251 369.9 241.5 378.3 236.7L406 220.7L368.7 156.1C347.1 118.8 293.3 118.8 271.7 156.1L266.4 165.2C257.6 180.5 238 185.7 222.7 176.9C207.4 168.1 202.2 148.5 211 133.1L216.3 124zM513.7 343.1C529 334.3 548.6 339.5 557.4 354.8L562.7 363.9C608.9 443.9 551.2 543.9 458.8 543.9L384.2 543.9L384.2 575.9C384.2 585.6 378.4 594.4 369.4 598.1C360.4 601.8 350.1 599.8 343.2 592.9L279.2 528.9C269.8 519.5 269.8 504.3 279.2 495L343.2 431C350.1 424.1 360.4 422.1 369.4 425.8C378.4 429.5 384.2 438.3 384.2 448L384.2 480L458.8 480C501.9 480 528.9 433.3 507.3 396L502 386.9C493.2 371.6 498.4 352 513.7 343.2zM115 299.4L87.3 283.4C78.9 278.5 74.2 269.1 75.5 259.5C76.8 249.9 83.7 242 93.1 239.5L180.5 216C193.3 212.6 206.5 220.2 209.9 233L233.3 320.4C235.8 329.8 232.4 339.7 224.7 345.7C217 351.7 206.5 352.3 198.1 347.4L170.4 331.4L133.1 396C111.5 433.3 138.5 480 181.6 480L192.2 480C209.9 480 224.2 494.3 224.2 512C224.2 529.7 209.9 544 192.2 544L181.6 544C89.3 544 31.6 444 77.8 364L115 299.4z" fill="${color}"/>
      </g>
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
