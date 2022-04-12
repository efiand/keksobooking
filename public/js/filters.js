import { debounce, toggleForm } from './utils.js';
import { renderOffers } from './page.js';

const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const FILTERS_DISABLED_CLASS_NAME = 'map__filters--disabled';

const housingPrice = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: Infinity,
  },
};

const filtersElement = document.querySelector('.map__filters');
const filterControlGroups = Array.from(filtersElement.children);

const filterRules = {
  'housing-type': ({ type }, value) => value === type,
  'housing-price': ({ price }, value) => price >= housingPrice[value].from && price < housingPrice[value].to,
  'housing-rooms': ({ rooms }, value) => value === rooms.toString(),
  'housing-guests': ({ guests }, value) => value === guests.toString(),
  'housing-features': ({ features }) => {
    if (!features) {
      return false;
    }
    const checkedCheckboxes = Array.from(filtersElement.querySelectorAll('[type="checkbox"]:checked'));
    return checkedCheckboxes.every(({ value }) => features.some((feature) => feature === value));
  },
};

const filterOffers = ({ offer }) => filterControlGroups.every(({ value, id }) => value === DEFAULT_VALUE || filterRules[id](offer, value));

const toggleFilters = (isActive) => {
  toggleForm(isActive, filtersElement, FILTERS_DISABLED_CLASS_NAME);
};

const rerender = () => renderOffers(filterOffers);

const clearFilters = () => {
  filterControlGroups.forEach((group) => {
    if (group.name) {
      group.value = DEFAULT_VALUE;
    } else {
      group.querySelectorAll('input').forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
  rerender();
};

filtersElement.addEventListener('change', debounce(rerender, RERENDER_DELAY));

export { toggleFilters, clearFilters, filterOffers };
