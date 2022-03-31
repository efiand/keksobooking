import { MAX_PRICE } from './data.js';

const STEP = 1000;

const createUISlider = (sliderElement, min, updateHandler) => {
  noUiSlider.create(sliderElement, {
    range: {
      min,
      max: MAX_PRICE,
    },
    start: min,
    step: STEP,
    connect: 'lower',
    format: {
      to(value) {
        return value.toFixed(0);
      },
      from(value) {
        return parseFloat(value);
      },
    }
  });

  sliderElement.noUiSlider.on('slide', updateHandler);

  return sliderElement.noUiSlider;
};

export { createUISlider };
