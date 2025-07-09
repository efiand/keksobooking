const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const initImageControl = (fileChooserElement, photoPreviewElement) => {
  const imageElement = photoPreviewElement.querySelector('img');

  const clearControl = () => {
    fileChooserElement.value = '';
    photoPreviewElement.style.backgroundImage = 'none';

    if (imageElement) {
      imageElement.style.visibility = 'visible';
    }
  };

  photoPreviewElement.style.backgroundSize = 'cover';
  photoPreviewElement.style.backgroundRepeat = 'no-repeat';

  fileChooserElement.addEventListener('change', () => {
    photoPreviewElement.classList.add('preview_style');
    const [file] = fileChooserElement.files;
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (!matches) {
      return clearControl();
    }

    if (imageElement) {
      imageElement.style.visibility = 'hidden';
    }

    photoPreviewElement.style.backgroundImage = `url(${URL.createObjectURL(file)}`;
  });

  return clearControl;
};

export { initImageControl };
