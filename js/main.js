// Утилита общего назначения для получения случайного целого из диапазона
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Утилита общего назначения для получения случайного числа с заданной точностью из диапапзона
const getRandomFloat = (min, max, decimals = 0) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// Проверка, удовлетворяет ли диапазон данных бизнес-требованиям
const checkRange = (min, max) => {
  const errors = [];

  if (min < 0) {
    errors.push('Первый параметр должен быть положительным числом');
  }
  if (max < 0) {
    errors.push('Второй параметр должен быть положительным числом');
  }
  if (max <= min) {
    errors.push('Второй параметр должен быть больше первого');
  }

  if (errors.length) {
    throw new Error(errors.join('. '));
  }
};

// Получение случайного положительного целого с проверкой соответствия диапазона требованиям
export const getRamdomPositiveInt = (min, max) => checkRange(min, max) || getRandomInt(min, max);

// Получение случайного положительного числа с заданной точностью с проверкой соответствия диапазона требованиям
export const getRamdomPositiveFloat = (min, max, decimal = 0) => checkRange(min, max) || getRandomFloat(min, max, decimal);

// console.log(getRamdomPositiveInt(3, 78));
// console.log(getRamdomPositiveFloat(4.3434, 78.3434, 8));
