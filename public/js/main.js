import { toggleForm } from './utils.js';
import { getData } from './api.js';
import { createMocks } from './mocks.js';
import { createCard } from './card.js';
import { initMap } from './map.js';
import { AD_DISABLED_CLASS_NAME, adFormElement } from './ad-form.js';
import { FILTERS_DISABLED_CLASS_NAME, filtersElement } from './filters.js';

const togglePage = (isPageActive) => {
  toggleForm(isPageActive, filtersElement, FILTERS_DISABLED_CLASS_NAME);
  toggleForm(isPageActive, adFormElement, AD_DISABLED_CLASS_NAME);
};

const getOffers = window.location.search.includes('test') ? createMocks : getData;

togglePage(false);

getOffers((data) => initMap(data, createCard, () => togglePage(true)));
