import { isEscapeKeyPressed } from './utils';
import { togglePage } from './page';

export const PopupMode = {
  SUCCESS_POST: 'SUCCESS_POST',
  ERROR_POST: 'ERROR_POST',
  ERROR_FETCH: 'ERROR_FETCH'
};

const Template = {
  [PopupMode.SUCCESS_POST]: document.querySelector('#success').content.querySelector('.success'),
  [PopupMode.ERROR_POST]: document.querySelector('#error').content.querySelector('.error')
};
Template[PopupMode.ERROR_FETCH] = Template[PopupMode.ERROR_POST].cloneNode(true);
Template[PopupMode.ERROR_FETCH].querySelector('.error__message').textContent = 'Ошибка получения объявлений';
Template[PopupMode.ERROR_FETCH].querySelector('.error__button').textContent = 'Добавить объявление';

const createPopup = (mode) => {
  const popupElement = Template[mode].cloneNode(true);

  togglePage(false);
  document.body.append(popupElement);

  const closePopup = () => {
    popupElement.remove();
    document.removeEventListener('keydown', keyCloseHandler);

    togglePage(true);
  };

  function keyCloseHandler(evt) {
    if (isEscapeKeyPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  popupElement.addEventListener('click', () => closePopup());
  document.addEventListener('keydown', keyCloseHandler);
};

export { createPopup };
