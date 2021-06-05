import images from './gallery-items.js'


const galleryContainer = document.querySelector('.js-gallery');
const imageCard = createImageCards(images);

galleryContainer.insertAdjacentHTML('beforeend', imageCard)

function createImageCards(images) {
    return images.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
        `;
    })
    .join('');
}

galleryContainer.addEventListener('ckick', openModalWindowByClick);

function openModalWindowByClick(e) {
    if (!e.target.classList.contains('.gallery__item')) {
        return;
    }
console.log(e.target);

};


