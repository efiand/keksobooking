import { activateForm, deactivateForm } from './form.js';

const FORM_CLASSNAMES = ['ad-form', 'map__filters'];

export const activatePage = () => {
  FORM_CLASSNAMES.forEach(activateForm);
};

export const deactivatePage = () => {
  FORM_CLASSNAMES.forEach(deactivateForm);
};
