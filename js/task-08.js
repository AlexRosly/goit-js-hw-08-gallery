import images from './gallery-items.js'


const galleryContainer = document.querySelector('.js-gallery');
const imageCard = createImageCards(images);
const modalWindow = document.querySelector('.js-lightbox');
const closeModalWindowBtn = document.querySelector('[data-action="close-lightbox"]');
    const lightboxImage = document.querySelector('.lightbox__image');


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


galleryContainer.addEventListener('click', openModalWindowByClick);

function openModalWindowByClick(e) {
    e.preventDefault();

    if (e.target.nodeName === 'IMG') {
        modalWindow.classList.add('is-open');
    }

    lightboxImage.src = e.target.getAttribute('data-source');
    lightboxImage.alt = e.target.alt;
//     console.log(e.target);
//     if (!e.target.classList.contains('.gallery__image')) {
//         return;
//     }

//     modalWindow.classList.add('.is-open');
//     // const openWindow = e.target;

// console.log(e.target);

};

closeModalWindowBtn.addEventListener('click', closeModalWindowByClick);

function closeModalWindowByClick() {
    // if (e.target.nodeName === 'BUTTON') {
    //     modalWindow.classList.remove('is-open');

    // }
    modalWindow.classList.remove('is-open');
    lightboxImage.src = '';
}

keyClosed.addEventListener('keydown', onEscKeyPress);

function onEscKeyPress(e) {
    if (e.code === 'ESCAPE') {
        closeModalWindowByClick();
    }
}



