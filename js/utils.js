/* eslint-disable no-magic-numbers */

const COORD_DECIMALS = 5;
const ESC_KEY = 'Escape';

// Получение случайного целого из диапазона
export const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return getRandomPositiveInteger(Math.abs(min), Math.abs(max));
  }

  if (max < min) {
    return getRandomPositiveInteger(max, min);
  }

  if (max === min) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Получение случайного числа с заданной точностью из диапапзона
export const getRandomPositiveFloat = (min, max) => {
  if (min < 0 || max < 0) {
    return getRandomPositiveFloat(Math.abs(min), Math.abs(max));
  }

  if (max < min) {
    return getRandomPositiveFloat(max, min);
  }

  if (max === min) {
    return min;
  }

  return Math.random() * (max - min) + min;
};

// Получение случайного элемента массива
export const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Получение случайного фрагмента массива
export const getRandomArrayPart = (arr) => {
  const lastIndex = arr.length - 1;
  const a = getRandomPositiveInteger(0, lastIndex);
  const b = getRandomPositiveInteger(0, lastIndex);
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return arr.slice(lower, upper);
};

// Вывод числа с ведущим нулём
export const getNumberWithLeadZero = (number) => (number < 10 ? `0${number}` : number);

// Выбор словоформы по значению числа
export const getWordAfterNum = (num, [form1, form2 = form1, form3 = form2]) => {
  const remainder10 = num % 10;
  const remainder100 = num % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return form1;
  }

  const notInSecondDozen = remainder100 < 10 || remainder100 >= 20;
  if (remainder10 >= 2 && remainder10 <= 4 && notInSecondDozen) {
    return form2;
  }

  return form3;
};

// Вывод числа со словоформой
export const outputNumWithWord = (num, forms) => `${num} ${getWordAfterNum(num, forms)}`;

// Создаёт функцию, генерирующую DOM-узел, заполненный контентом
export const getElementFiller = (template) => {
  const fillElement = (selector, data = '', createChildElement) => {
    const element = template.querySelector(selector);
    const content = data.toString();

    if (Array.isArray(data) && data.length) {
      if (typeof createChildElement === 'function') {
        element.innerHTML = '';
        data.forEach((item) => {
          element.append(createChildElement(item));
        });
      } else {
        element.textContent = data.join(', ');
      }
    } else if (content) {
      element.textContent = content;
    } else {
      element.remove();
    }
  };

  return fillElement;
};

export const getLocationString = ({ lat, lng }) => `${lat.toFixed(COORD_DECIMALS)}, ${lng.toFixed(COORD_DECIMALS)}`;

export const isEscapeKeyPressed = (evt) => evt.key === ESC_KEY;

export const toggleForm = (activeFlag, formElement, disabledClassName) => {
  const classMethod = activeFlag ? 'remove' : 'add';
  formElement.classList[classMethod](disabledClassName);

  formElement.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = !activeFlag;
  });
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
