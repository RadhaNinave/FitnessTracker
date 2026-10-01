export function validateHealthForm(form) {
  const errors = {};
  if (!form.date) errors.date = 'Date is required.';
  if (form.calorieIntake === '' || Number(form.calorieIntake) < 0) errors.calorieIntake = 'Enter a valid calorie intake.';
  if (form.calorieBurned === '' || Number(form.calorieBurned) < 0) errors.calorieBurned = 'Enter a valid calorie burned value.';
  return errors;
}
