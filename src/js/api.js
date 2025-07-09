import { createPopup, PopupMode } from './popup';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST'
};

const GET_URL = 'https://26.javascript.htmlacademy.pro/keksobooking/data';
const POST_URL = 'https://26.javascript.htmlacademy.pro/keksobooking';

const handleFetchError = () => {
  createPopup(PopupMode.ERROR_FETCH);
  return [];
};

const handlePostError = () => {
  createPopup(PopupMode.ERROR_POST);
};

const getData = () =>
  fetch(GET_URL, {
    method: HttpMethod.GET,
    credentials: 'same-origin'
  })
    .then((res) => {
      const { ok = false } = res;

      if (ok) {
        return res.json();
      }

      return handleFetchError();
    })
    .catch(handleFetchError);

const postData = (body, handleSuccess) =>
  fetch(POST_URL, {
    method: HttpMethod.POST,
    body
  })
    .then(({ ok }) => {
      if (ok) {
        handleSuccess();
        createPopup(PopupMode.SUCCESS_POST);
      } else {
        handlePostError();
      }
    })
    .catch(handlePostError);

export { getData, postData };
