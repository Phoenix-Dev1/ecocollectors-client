export const validateForm = (inputs, setError) => {
  // Check if all required fields are filled in
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'password',
    'confirm_password',
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

  // Check password
  if (inputs.password.length < 8) {
    setError('Password must be at least 8 characters long');
    return false;
  }

  if (inputs.password.length > 30) {
    setError('Password length cannot exceed 30 characters long');
    return false;
  }

  if (!/\d/.test(inputs.password)) {
    setError('Password must contain at least one number');
    return false;
  }

  if (!/[a-zA-Z]/.test(inputs.password)) {
    setError('Password must contain at least one letter');
    return false;
  }

  // Check confirm_password
  if (inputs.confirm_password !== inputs.password) {
    setError('Passwords do not match');
    return false;
  }

  const addressRegex = /^[A-Za-z0-9\s.-]+$/;
  // Check city and address
  if (!addressRegex.test(inputs.city) || inputs.city.length > 50) {
    setError('Invalid city');
    return false;
  }

  // Check address
  if (inputs.address.length > 50) {
    setError('Address cannot exceed 50 characters');
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
