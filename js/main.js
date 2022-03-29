import { toggleForm } from './utils.js';
import { createOfferData, createOfferTemplate } from './offer.js';
import { AD_DISABLED_CLASS_NAME, adFormElement } from './ad-form.js';
import { FILTERS_DISABLED_CLASS_NAME, filtersElement } from './filters.js';

const mapCanvas = document.querySelector('#map-canvas');

const togglePage = (isPageActive) => {
  toggleForm(isPageActive, filtersElement, FILTERS_DISABLED_CLASS_NAME);
  toggleForm(isPageActive, adFormElement, AD_DISABLED_CLASS_NAME);
};

mapCanvas.append(createOfferTemplate(createOfferData()));

togglePage(false);
mapCanvas.addEventListener('click', () => togglePage(true));
