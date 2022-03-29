import { roomToGuests } from './data.js';
import { createPopup } from './popup.js';

const GROUP_CLASS_NAME = 'ad-form__element';
const AD_DISABLED_CLASS_NAME = 'ad-form--disabled';

const adFormElement = document.querySelector('.ad-form');
const roomFieldElement = adFormElement.querySelector('[name="rooms"]');
const capacityFieldElement = adFormElement.querySelector('[name="capacity"]');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const validateCapacity = () => roomToGuests[roomFieldElement.value].includes(capacityFieldElement.value);

const pristine = new Pristine(adFormElement, {
  classTo: GROUP_CLASS_NAME,
  errorTextParent: GROUP_CLASS_NAME
});
pristine.addValidator(capacityFieldElement, validateCapacity, 'Количество гостей не соответствует количеству комнат');
roomFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

adFormElement.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    return createPopup(successTemplate);
  }

  evt.preventDefault();
  createPopup(errorTemplate);
});

export { AD_DISABLED_CLASS_NAME, adFormElement };
