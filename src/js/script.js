import apiSearch from "./API";
import imgMarkup from "./imgTemplate";
import refs from "./refs";

import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

const API_KEY = "28979372-85997452645a634297da88211";

let inputValue = "";
let page = 1;

refs.loadMore.style.display = "none";

export const getSubmitForm = (e) => {
  e.preventDefault();
  refs.galleryList.innerHTML = "";
  inputValue = e.target.elements.query.value;
  if (inputValue.length) {
    apiSearch(inputValue, page, API_KEY)
      .then((images) => {
        images.length
          ? (refs.loadMore.style.display = "block")
          : (refs.loadMore.style.display = "none");
        imgMarkup(images);
      })
      .catch((error) => console.log(error));
  }
};

export const moreImages = () => {
  page += 1;
  apiSearch(inputValue, page, API_KEY)
    .then((images) => {
      imgMarkup(images);
      refs.loadMore.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    })
    .catch((error) => console.log(error));
};

export default function onOpenModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.src}" alt="" />`
  );
  instance.show();
}

refs.galleryList.addEventListener("click", onOpenModal);
refs.form.addEventListener("submit", getSubmitForm);
refs.loadMore.addEventListener("click", moreImages);
