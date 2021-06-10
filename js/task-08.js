import images from './gallery-items.js'
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.

const galleryContainer = document.querySelector('.js-gallery');
const imageCard = createImageCards(images);
const modalWindow = document.querySelector('.js-lightbox');
const closeModalWindowBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxImage = document.querySelector('.lightbox__image');
const divOverlay = document.querySelector('.lightbox__overlay');

//Create image Element

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

galleryContainer.addEventListener('click', onCardClick);

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

closeModalWindowBtn.addEventListener('click', closeModalWindow);

function closeModalWindow() {
    window.removeEventListener('keydown', onEscKeyPress)
    modalWindow.classList.remove('is-open');
    lightboxImage.src = '';
}

    //by click on the overlay

divOverlay.addEventListener('click', onOverlayClick);

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
