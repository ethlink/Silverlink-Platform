const requiredFields = [
  'email',
  'password',
  'confirm-password',
  'firstName',
  'surname',
  'address',
  'postalcode',
  'country',
  'city',
  'state',
  'identity',
  'residence',
];

const validate = (values) => {
  const errors = {};

  for (let i = 0; i < requiredFields.length; i += 1) {
    const field = requiredFields[i];

    if (!values[field]) {
      errors[field] = 'Required';
    }
  }

  if (values.password) {
    // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
    const passwordRegex = new RegExp('^(?=.{8,})(?=.*[0-9])');
    if (!passwordRegex.test(values.password)) {
      errors.password = 'The string must be at least 8 characters long and contain at least 1 numeric character';
    }

    if (values['confirm-password'] && values.password !== values['confirm-password']) {
      errors['confirm-password'] = 'Passwords do not match';
    }
  }

  if (values.country === 'Select country') {
    errors.country = 'Required';
  }

  if (values.identity && values.identity.size > 1024 * 1024 * 2) {
    errors.identity = 'File too large. Maximum size is 2 MB.';
  }

  if (values.residence && values.identity.residence > 1024 * 1024 * 2) {
    errors.residence = 'File too large. Maximum size is 2 MB.';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default validate;
