import { OFFERS_COUNT } from './const.js';
import { createCard } from './card.js';
import { renderMap } from './map.js';
import { getData } from './api.js';
import { createMocks } from './mocks.js';
import { toggleFilters } from './filters.js';
import { togglePostForm } from './post-form.js';

let hasOffers = false;

const getOffers = window.location.search.includes('test') ? createMocks : getData;

const togglePage = (status) => {
  togglePostForm(status);
  toggleFilters(!status ? false : hasOffers);
};

const renderOffers = (filterOffers = Boolean) => {
  togglePage(false);

  getOffers().then((data) => {
    hasOffers = data.length > 0;
    const offers = hasOffers ? data.filter(filterOffers).slice(0, OFFERS_COUNT) : data;

    renderMap(offers, createCard, () => {
      togglePage(true);
    });
  });
};

export { hasOffers, renderOffers, togglePage };
