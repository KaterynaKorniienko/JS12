import template from "../template/template.handlebars";
import refs from "./refs";


const imgMarkup = (images) => {
  let imgTempl = template(images);
  refs.galleryList.insertAdjacentHTML("beforeend", imgTempl);
};

export default imgMarkup;
