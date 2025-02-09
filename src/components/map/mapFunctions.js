// Show a single Marker Address
export function showAddress(setSelectedMarker, address) {
  setSelectedMarker(address);
}

// Navigation through Google Maps(Moblie)
export function openGoogleMaps(lat, lng) {
  const url = `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${lat},${lng}`;
  window.open(url, "noopener noreferrer");
}

// format the date to DD/MM/YYYY from SQL Date format
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
}

// Validating the request details
export function addRequestValidation(
  fullName,
  bottlesNumber,
  address,
  phoneNumber,
  from_hour,
  to_hour
) {
  const fullNameRegex = /^[A-Za-z\s]+$/; // Regular expression to match letters and spaces
  const bottlesNumberRegex = /^\d+$/; // Regular expression to match digits

  if (!fullNameRegex.test(fullName)) {
    return false;
  }

  if (!bottlesNumberRegex.test(bottlesNumber)) {
    return false;
  }

  if (!/^\d{9,10}$/.test(phoneNumber)) {
    return false;
  }

  const fromHour = new Date(`2000-01-01T${from_hour}`);
  const toHour = new Date(`2000-01-01T${to_hour}`);

  if (fromHour >= toHour) {
    return false;
  }

  return true;
}

// Foramtting Date & Time
export function formatDateTime(datetime) {
  const date = new Date(datetime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function formatTime(datetime) {
  const date = new Date(datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}

// Recycle Bins Render properties
export const typeDescriptions = {
  blue: "Newspapers, magazines, cardboard",
  carton: "Cartons packaging",
  "electronic-waste": "Batteries, phones, electronic devices",
  orange: "Plastic packaging, plastic bags",
  purple: "Glass bottles, jars, glass containers",
  textile: "Clothes, shirts, pants, fabrics",
};

export const typeColors = {
  blue: "text-blue-500",
  carton: "text-yellow-800",
  "electronic-waste": "text-red-500",
  orange: "text-orange-500",
  purple: "text-purple-500",
  textile: "text-lime-600",
};

export const binTypes = [
  "blue",
  "carton",
  "electronic-waste",
  "orange",
  "purple",
  "textile",
];
