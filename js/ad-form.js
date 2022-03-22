import { roomToGuests } from './data.js';
import { createPopup } from './popup.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const fieldParentClassName = 'ad-form__element';

export const initAdForm = (formElement) => {
  const roomFieldElement = formElement.querySelector('[name="rooms"]');
  const capacityFieldElement = formElement.querySelector('[name="capacity"]');

  const pristine = new Pristine(formElement, {
    classTo: fieldParentClassName,
    errorTextParent: fieldParentClassName
  });
  const validateCapacity = () => roomToGuests[roomFieldElement.value].includes(capacityFieldElement.value);
  pristine.addValidator(capacityFieldElement, validateCapacity, 'Количество гостей не соответствует количеству комнат');
  roomFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

  formElement.addEventListener('submit', (evt) => {
    if (pristine.validate()) {
      return createPopup(successTemplate);
    }

    evt.preventDefault();
    createPopup(errorTemplate);
  });
};
