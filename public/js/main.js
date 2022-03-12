import { createOffersData } from './create-offers-data.js';
import { createOfferTemplate } from './create-offer-template.js';

const [offer] = createOffersData();
const offerTemplate = createOfferTemplate(offer);

document.querySelector('#map-canvas').append(offerTemplate);
