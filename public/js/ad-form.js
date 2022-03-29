import { MAX_PRICE, offerTypes, roomToGuests } from './data.js';
import { declineNum } from './utils.js';
import { createPopup } from './popup.js';

const GROUP_CLASS_NAME = 'ad-form__element';
const AD_DISABLED_CLASS_NAME = 'ad-form--disabled';
const PRICE_VALIDATION_PRIORITY = 1000;

const adFormElement = document.querySelector('.ad-form');
const typeFieldElement = adFormElement.querySelector('[name="type"]');
const priceFieldElement = adFormElement.querySelector('[name="price"]');
const roomsFieldElement = adFormElement.querySelector('[name="rooms"]');
const capacityFieldElement = adFormElement.querySelector('[name="capacity"]');
const timeinFieldElement = adFormElement.querySelector('[name="timein"]');
const timeoutFieldElement = adFormElement.querySelector('[name="timeout"]');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const validatePrice = (value) => {
  const price = Number(value || 0);
  const inRange = price >= Number(priceFieldElement.min) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};
const validateCapacity = () => roomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value);

const getCapacityMessage = () => {
  const roos = declineNum(roomsFieldElement.value, 'комнаты', 'комнат');
  const validGuests = roomToGuests[roomsFieldElement.value];
  return `Для ${roos} допустимо гостей: ${validGuests.join(', ')}`;
};
const getPriceMessage = () => `Выберите число между ${priceFieldElement.min} и ${MAX_PRICE}`;

const setPriceAttributes = () => {
  const minPrice = offerTypes[typeFieldElement.value].min;
  priceFieldElement.min = minPrice;
  priceFieldElement.placeholder = minPrice;
};

const timesChangeHandler = (evt) => {
  const { value } = evt.currentTarget;
  timeinFieldElement.value = value;
  timeoutFieldElement.value = value;
};

const pristine = new Pristine(adFormElement, {
  classTo: GROUP_CLASS_NAME,
  errorTextParent: GROUP_CLASS_NAME
});
pristine.addValidator(priceFieldElement, validatePrice, getPriceMessage, PRICE_VALIDATION_PRIORITY, true);
pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityMessage);

setPriceAttributes();

typeFieldElement.addEventListener('change', () => {
  setPriceAttributes();
  pristine.validate(priceFieldElement);
});

roomsFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

timeinFieldElement.addEventListener('change', timesChangeHandler);
timeoutFieldElement.addEventListener('change', timesChangeHandler);

adFormElement.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    return createPopup(successTemplate);
  }

  evt.preventDefault();
  createPopup(errorTemplate);
});

export { AD_DISABLED_CLASS_NAME, adFormElement };
