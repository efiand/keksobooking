import { isEscapeKeyPressed } from './utils.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const createPopup = ({ ok = true, message = null, buttonText = null } = {}) => {
  const popupElement = (ok ? successTemplate : errorTemplate).cloneNode(true);

  if (!ok) {
    const errorMessageElement = popupElement.querySelector('.error__message');
    const errorButtonElement = popupElement.querySelector('.error__button');

    if (message) {
      errorMessageElement.textContent = message;
    }

    if (buttonText) {
      errorButtonElement.textContent = buttonText;
    }
  }

  document.body.append(popupElement);

  const closePopup = () => {
    popupElement.remove();
    document.removeEventListener('keydown', keyCloseHandler);
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
