export const validate = (values) => {
  const errors = {};
  let hasErrors = false;

  if (!values.brand) {
    errors.email = 'Required';
    hasErrors = true;
  }
  if (!values.model) {
    errors.model = 'Required';
    hasErrors = true;
  }
  if (!values.engine) {
    errors.engine = 'Required';
    hasErrors = true;
  }
  if (!values.year) {
    errors.year = 'Required';
    hasErrors = true;
  }
  if (!values.gearBox) {
    errors.gearBox = 'Required';
    hasErrors = true;
  }

  return hasErrors ? errors : {};
};
