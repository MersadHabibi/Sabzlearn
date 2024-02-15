import { createCategoryApi } from "../../../services/categoriesAPIs";
import { _changeClasses, fullScreenLoader, showNotif } from "../../scripts/funcs/utils";
import showCategories from "./showCategories";

const overlay = document.querySelector(".overlay");

const preparationAddCategory = () => {
  const openAddCategoryModalBtn = document.querySelector(".open-add-category-modal-btn");
  const closeAddCategoryModalBtn = document.querySelector(".close-add-category-modal-btn");
  const addCategoryModal = document.querySelector("#add-category-modal");
  const newCategoryName = document.querySelector("#add-category-modal #name");

  openAddCategoryModalBtn.addEventListener("click", () => {
    _changeClasses("add", addCategoryModal, ["show"]);
    _changeClasses("add", overlay, ["show"]);
  });

  closeAddCategoryModalBtn.addEventListener("click", () => {
    _changeClasses("remove", addCategoryModal, ["show"]);
    _changeClasses("remove", overlay, ["show"]);
  });

  addCategoryModal.addEventListener("submit", e => {
    e.preventDefault();
    addCategory(newCategoryName.value);
  });
};

const addCategory = async name => {
  if (name.length <= 3) {
    showNotif("اسم دسته بندی جدید باید بیشتر از ۳ کلمه باشه");
  } else {
    fullScreenLoader("loading");

    const res = await createCategoryApi(name);

    if (res.status === true) showCategories();

    _changeClasses("remove", document.querySelector("#add-category-modal"), ["show"]);
    _changeClasses("remove", overlay, ["show"]);

    fullScreenLoader("loaded");
  }
};

export default preparationAddCategory;
