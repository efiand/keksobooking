import { OFFERS_COUNT } from './data.js';
import { toggleForm } from './utils.js';
import { createOffersData } from './offer.js';
import { createCard } from './card.js';
import { initMap } from './map.js';
import { AD_DISABLED_CLASS_NAME, adFormElement } from './ad-form.js';
import { FILTERS_DISABLED_CLASS_NAME, filtersElement } from './filters.js';

const togglePage = (isPageActive) => {
  toggleForm(isPageActive, filtersElement, FILTERS_DISABLED_CLASS_NAME);
  toggleForm(isPageActive, adFormElement, AD_DISABLED_CLASS_NAME);
};

togglePage(false);

initMap(createOffersData(OFFERS_COUNT), createCard, () => togglePage(true));
