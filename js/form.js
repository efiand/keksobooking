export const activateForm = (className) => {
  const form = document.querySelector(`.${className}`);

  form.classList.remove(`${className}--disabled`);
  form.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export const deactivateForm = (className) => {
  const form = document.querySelector(`.${className}`);

  form.classList.add(`${className}--disabled`);
  form.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = true;
  });
};
