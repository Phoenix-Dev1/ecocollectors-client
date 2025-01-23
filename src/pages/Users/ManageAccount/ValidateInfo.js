export const validateInfo = (inputs, setError) => {
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'city',
    'address',
    'phone',
  ];
  const missingFields = requiredFields.filter((field) => !inputs[field]);

  if (missingFields.length > 0) {
    setError(
      `Please fill in the following fields: ${missingFields.join(', ')}`
    );
    return false;
  }

  const nameRegex = /^[a-zA-Z\s]+$/; // Allow alphabets and spaces
  if (!nameRegex.test(inputs.first_name) || inputs.first_name.length > 55) {
    setError('Invalid first name');
    return false;
  }
  if (!nameRegex.test(inputs.last_name) || inputs.last_name.length > 55) {
    setError('Invalid last name');
    return false;
  }

  // Check email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(inputs.email)) {
    setError('Invalid email address');
    return false;
  }

  // Check city and address
  const addressRegex = /^[A-Za-z0-9\s.-]+$/;
  if (!addressRegex.test(inputs.city) || inputs.city.length > 50) {
    setError('Invalid city');
    return false;
  }

  // Check address
  if (inputs.address.trim() === '') {
    setError('Address cannot be empty');
    return false;
  }

  // Check phone
  const phoneRegex = /^\d{9,10}$/;
  if (!phoneRegex.test(inputs.phone)) {
    setError('Invalid phone number');
    return false;
  }

  return true;
};
