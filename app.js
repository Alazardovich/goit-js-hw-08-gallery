const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

const galleryItemsContainer = document.querySelector(".js-gallery");
const modalWindow = document.querySelector(".js-lightbox");
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const tampleteGalleryItems = listGalleryItem(galleryItems);
const imageEl = document.querySelector(".lightbox__image");
const overlayContainer = document.querySelector('.lightbox__overlay');
const lazyImage = document.querySelectorAll('img[loading="lazy"]');
console.log(imageEl);
galleryItemsContainer.insertAdjacentHTML("afterbegin", tampleteGalleryItems);
galleryItemsContainer.addEventListener("click", addClassForModal);
closeModalBtn.addEventListener("click", onCloseBtnModal);
overlayContainer.addEventListener('click', onCloseBtnModal);

lazyImage.forEach( image=> {
image.addEventListener('load', onImageLoading, {once: true});
});
function onImageLoading(evt) {
  console.log('Картинка загрузилась:', evt);
  
}

function listGalleryItem(galleryItems) {
  return galleryItems
    .map(
      (item) => `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${item.original}
  >
    <img
      class="gallery__image lazyload"
      src=${item.preview}
      data-source=${item.original}
      alt=${item.description}
      loading="lazy"
    />
  </a>
</li>`
    )
    .join("");
}

function addClassForModal(event) {
  event.preventDefault();
  document.addEventListener('keydown', onEscapeKeydown)
  if(event.target.nodeName ==='IMG') {
    modalWindow.classList.add("is-open");
  imageEl.src = event.target.dataset.source;
  imageEl.alt = event.target.alt;
   }
   return;
}
function onEscapeKeydown(event){
if (event.code === "Escape") {
  onCloseBtnModal()
}
}

function onCloseBtnModal() {
  modalWindow.classList.remove("is-open");
  imageEl.src = "";
  document.addEventListener('keydown',onEscapeKeydown);
}

document.addEventListener('keydown', (evt) => {
  const currentIndex = galleryItems.findIndex(
    (img) => img.original === imageEl.src
  );

  if (evt.code === 'ArrowLeft') {
    leftClick(currentIndex);
  }
  if (evt.code === 'ArrowRight') {
    rightClick(currentIndex);
  }
});
function leftClick(currentIndex) {
  let nextIndex = currentIndex ? currentIndex : 0;
  if (nextIndex > 0) {
    nextIndex -= 1;
  } else {
    nextIndex = galleryItems.length - 1;
  }

  imageEl.src = galleryItems[nextIndex].original;
  imageEl.alt = galleryItems[nextIndex].alt;
}
function rightClick(currentIndex) {
  let nextIndex = currentIndex ? currentIndex : 0;
  if (nextIndex < galleryItems.length - 1) {
    nextIndex += 1;
  } else {
    nextIndex = 0;
  }
  imageEl.src = galleryItems[nextIndex].original;
  imageEl.alt = galleryItems[nextIndex].alt;
}
