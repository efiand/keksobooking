import { isEscapeKeyPressed } from './utils.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const createPopup = (isSuccess = true, modifyPopup = null) => {
  const template = isSuccess ? successTemplate : errorTemplate;
  const popup = template.cloneNode(true);

  if (typeof modifyPopup === 'function') {
    modifyPopup(popup);
  }

  document.body.append(popup);

  const closePopup = () => {
    popup.remove();
    document.removeEventListener('keydown', keyCloseHandler);
  };

  function keyCloseHandler(evt) {
    if (isEscapeKeyPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  popup.addEventListener('click', () => closePopup());
  document.addEventListener('keydown', keyCloseHandler);
};

export { createPopup };
