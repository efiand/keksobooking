import { createOffersData } from './create-offers-data.js';
import { createOfferTemplate } from './create-offer-template.js';
import { activatePage, deactivatePage } from './page.js';

const [offer] = createOffersData();
const offerTemplate = createOfferTemplate(offer);
const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(offerTemplate);

deactivatePage();

mapCanvas.addEventListener('click', () => activatePage());
