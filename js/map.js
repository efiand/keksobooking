import { DEFAULT_LOCATION } from './data.js';

const ZOOM = 12;
const LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LAYER_COPY = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAIN_PIN = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const PIN = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const map = L.map('map-canvas');

const mainPinMarker = L.marker(DEFAULT_LOCATION, {
  draggable: true,
  icon: L.icon(MAIN_PIN),
});

const getLocationString = ({ lat, lng }) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const createMarker = (createTemplate) => (item) => {
  L
    .marker(item.location, { icon: L.icon(PIN) })
    .addTo(map)
    .bindPopup(createTemplate(item));
};

const addMapHandlers = (addressElement, resetElement) => {
  mainPinMarker.on('moveend', (evt) => {
    addressElement.value = getLocationString(evt.target.getLatLng());
  });

  resetElement.addEventListener('click', () => {
    mainPinMarker.setLatLng(DEFAULT_LOCATION);
    map.setView(DEFAULT_LOCATION, ZOOM);
  });
};

const initMap = (data, createPopup, loadHandler) => {
  data.forEach(createMarker(createPopup));

  map.on('load', loadHandler).setView(DEFAULT_LOCATION, ZOOM);
};

L.tileLayer(LAYER_URL, { attribution: LAYER_COPY }).addTo(map);
mainPinMarker.addTo(map);

export { initMap, addMapHandlers };
