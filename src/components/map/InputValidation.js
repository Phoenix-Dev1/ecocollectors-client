export function validateInputs({
  fullName,
  reqLat,
  reqLng,
  reqAddress,
  phoneNumber,
  bottlesNumber,
  fromTime,
  toTime,
}) {
  if (!/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/.test(fullName)) {
    return {
      isValid: false,
      message: 'Please enter a valid name.',
    };
  }

  if (reqLat === '' || reqLng === '') {
    return {
      isValid: false,
      message: 'Please select a location.',
    };
  }

  if (reqAddress.trim() === '') {
    return {
      isValid: false,
      message: 'Please enter a valid address.',
    };
  }

  if (!/^\d{9,10}$/.test(phoneNumber) || /\s/.test(phoneNumber)) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number.',
    };
  }

  if (!/^\d+$/.test(bottlesNumber) || /\s/.test(bottlesNumber)) {
    return {
      isValid: false,
      message: 'Please enter a valid number of bottles.',
    };
  }

  if (fromTime >= toTime) {
    return {
      isValid: false,
      message: 'Please select a valid time range.',
    };
  }

  return {
    isValid: true,
    message: 'Inputs are valid.',
  };
}
