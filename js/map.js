import { COORD_DECIMALS } from './const.js';

const ZOOM = 12;
const PIN_SIZE = 52;
const MAIN_PIN_SIZE = 52;
const PIN_RATIO = 0.5;
const LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LAYER_COPY = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_LOCATION = {
  lat: 35.684,
  lng: 139.754,
};

let isInitiated = false;

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const setPin = (size, filename) => L.icon({
  iconUrl: `./img/${filename}.svg`,
  iconSize: [size, size],
  iconAnchor: [size * PIN_RATIO, size],
});

const mainPinMarker = L.marker(DEFAULT_LOCATION, {
  draggable: true,
  icon: setPin(MAIN_PIN_SIZE, 'main-pin'),
}).addTo(map);

const getLocationString = ({ lat, lng }) => `${lat.toFixed(COORD_DECIMALS)}, ${lng.toFixed(COORD_DECIMALS)}`;

const createMarker = (createTemplate) => (item) => {
  L
    .marker(item.location, {
      icon: setPin(PIN_SIZE, 'pin')
    })
    .addTo(markerGroup)
    .bindPopup(createTemplate(item));
};

const addMapHandlers = (addressElement) => {
  mainPinMarker.on('moveend', (evt) => {
    addressElement.value = getLocationString(evt.target.getLatLng());
  });

  return () => {
    mainPinMarker.setLatLng(DEFAULT_LOCATION);
    map.closePopup().setView(DEFAULT_LOCATION, ZOOM);
  };
};

const renderMap = (data, createBaloon, loadHandler) => {
  if (isInitiated) {
    markerGroup.clearLayers();
    loadHandler();
  } else {
    isInitiated = true;
    map.on('load', loadHandler);
  }

  data.forEach(createMarker(createBaloon));
  map.setView(DEFAULT_LOCATION, ZOOM);
};

L.tileLayer(LAYER_URL, { attribution: LAYER_COPY }).addTo(map);

export { renderMap, addMapHandlers };
