import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  evt.preventDefault(); 
  const imageShow = `<img src= ${evt.target.dataset.source}>`;
  console.log(imageShow);
  const instance = basicLightbox.create(imageShow);
  instance.show();
}

export { onOpenModal };