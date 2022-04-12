import { OFFERS_COUNT } from './const.js';
import { getData } from './api.js';
import { createMocks } from './mocks.js';
import { createCard } from './card.js';
import { initMap } from './map.js';
import { togglePage } from './page.js';

togglePage(false);

const createMapFromData = (data) => initMap(data.slice(0, OFFERS_COUNT), createCard, () => {
  togglePage(true);
});
const getOffers = window.location.search.includes('test') ? createMocks : getData;

getOffers(createMapFromData);
