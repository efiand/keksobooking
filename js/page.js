import { initAdForm } from './ad-form.js';

const mapFiltersElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const mapFiltersDisabledClassName = 'map__filters--disabled';
const adFormDisabledClassName = 'ad-form--disabled';

const toggleForm = (activeFlag, formElement, disabledClassName) => {
  const classMethod = activeFlag ? 'remove' : 'add';
  formElement.classList[classMethod](disabledClassName);

  formElement.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = !activeFlag;
  });
};

const togglePage = (activeFlag) => () => {
  toggleForm(activeFlag, mapFiltersElement, mapFiltersDisabledClassName);
  toggleForm(activeFlag, adFormElement, adFormDisabledClassName);
};

export const activatePage = () => {
  initAdForm(adFormElement);
  togglePage(true)();
};
export const deactivatePage = togglePage(false);
