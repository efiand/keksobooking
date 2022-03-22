import { isEscapeKeyPressed } from './utils.js';

export const createPopup = (template) => {
  const popup = template.cloneNode(true);
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
