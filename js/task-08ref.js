import images from './gallery-items.js'

const galleryContainer = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const closeModalWindowBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxImage = document.querySelector('.lightbox__image');
const divOverlay = document.querySelector('.lightbox__overlay');


const createImageCards = ({preview, original, description}) =>
    `<li class="gallery__item">
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
    </li>`;

const galleryElement = images.reduce(
    (acc, elem) => acc + createImageCards(elem), ""
);
    
galleryContainer.insertAdjacentHTML('beforeend', galleryElement);
galleryContainer.addEventListener('click', onCardClick);
closeModalWindowBtn.addEventListener('click', closeModalWindow);
divOverlay.addEventListener('click', onOverlayClick);

function onCardClick(e) {

    e.preventDefault();

    const galleryImgEl = e.target;
    if (galleryImgEl.nodeName !== 'IMG') {
        return;
    }
    openModalWindowByClick(e.target.dataset.source);
}

//Open modal window

function openModalWindowByClick(src) {
    window.addEventListener('keydown', onEscKeyPress)
    
    modalWindow.classList.add('is-open');
    lightboxImage.src = src;
};

// Close modal window
    //by click on the bnt

function closeModalWindow() {
    window.removeEventListener('keydown', onEscKeyPress)
    modalWindow.classList.remove('is-open');
    lightboxImage.src = '';
}

    //by click on the overlay

function onOverlayClick(e) {
    if (e.currentTarget === e.target) {
        closeModalWindow();
    }
}

    //by EscKey

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        closeModalWindow();
    }
}
