import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

// 1.
const galleryList = galleryItems
  .map((galleryItem) => {
    return `<li class="gallery__item"><a class="gallery__link" href="${galleryItem.original}"><img class="gallery__image" src="${galleryItem.preview}" data-source="${galleryItem.original}"alt="${galleryItem.description}"/></a></li>`;
  })
  .join("");
gallery.innerHTML = galleryList;

// 2.
function clickOnImageHandler(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    event.preventDefault();
    const selectedImage = event.target;
    const originalSrc = selectedImage.dataset.source;
    const instance = basicLightbox.create(
      `<img class="gallery__image" src="${originalSrc}" alt="${selectedImage.alt}">`,
      {
        onShow: () => window.addEventListener("keydown", closeHandler),
        onClose: () => window.removeEventListener("keydown", closeHandler),
      }
    );
    const closeHandler = (event) => {
      if (event.key === "Escape") {
        instance.close();
      }
    };
    const image = instance.element().querySelector(".gallery__image");
    image.src = originalSrc;
    instance.show();
  }
}

gallery.addEventListener("click", clickOnImageHandler);
