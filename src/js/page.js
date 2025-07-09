import { OFFERS_COUNT } from './const';
import { createCard } from './card';
import { renderMap } from './map';
import { getData } from './api';
import { createMocks } from './mocks';
import { toggleFilters } from './filters';
import { togglePostForm } from './post-form';

let hasOffers = false;

const getOffers = window.location.search.includes('test') ? createMocks : getData;

const togglePage = (status) => {
  togglePostForm(status);
  toggleFilters(!status ? false : hasOffers);
};

const renderOffers = (filterOffer = Boolean) => {
  togglePage(false);

  getOffers().then((data) => {
    hasOffers = data.length > 0;
    const offers = hasOffers ? data.filter(filterOffer).slice(0, OFFERS_COUNT) : data;

    renderMap(offers, createCard, () => {
      togglePage(true);
    });
  });
};

export { hasOffers, renderOffers, togglePage };
