const DECLINE_THRESHOLD = 5;
const DECLINE_TAILSTART = -2;

// Получение случайного целого из диапазона
export const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Получение случайного числа с заданной точностью из диапапзона
export const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return parseFloat(result.toFixed(digits));
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
export const getNumberWithLeadZero = (number) => number < 10 ? `0${number}` : number;

// Корректировка существительных после числительных
export const declineNum = (num, nominative, genitiveSingular = nominative, genitivePlural = genitiveSingular) => {
  let answer = genitivePlural;
  const numLast = parseInt(num.toString().slice(-1), 10);
  const numLastDecim = parseInt(num.toString().slice(DECLINE_TAILSTART, -1), 10);
  if (numLastDecim !== 1) {
    if (numLast === 1) {
      answer = nominative;
    } else if (numLast > 1 && numLast < DECLINE_THRESHOLD) {
      answer = genitiveSingular;
    }
  }
  return `${num} ${answer}`;
};

export const isEscapeKeyPressed = (evt) => evt.key === 'Escape';

export const toggleForm = (activeFlag, formElement, disabledClassName) => {
  const classMethod = activeFlag ? 'remove' : 'add';
  formElement.classList[classMethod](disabledClassName);

  formElement.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = !activeFlag;
  });
};
