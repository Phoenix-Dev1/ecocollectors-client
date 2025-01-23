export const validateForm = (inputs, setError, navigate) => {
  // Check if all required fields are filled in
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'message',
  ];

  const missingFields = requiredFields.filter((field) => !inputs[field]);

  if (missingFields.length > 0) {
    setError(
      `Please fill in the following fields: ${missingFields.join(', ')}`
    );
    return false;
  }

  // Check first_name and last_name
  const nameRegex = /^[a-zA-Z\s]+$/; // Allow alphabets and spaces
  if (!nameRegex.test(inputs.first_name) || inputs.first_name.length > 55) {
    setError('Invalid first name');
    return false;
  }
  if (!nameRegex.test(inputs.last_name) || inputs.last_name.length > 55) {
    setError('Invalid last name');
    return false;
  }

  // Check phone
  const phoneRegex = /^\d{9,10}$/;
  if (!phoneRegex.test(inputs.phone)) {
    setError('Invalid phone number');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputs.email)) {
    setError('Invalid email address');
    return false;
  }

  return true;
};
