import { getAllCategories } from "../../../services/categoriesAPIs.js";
import { createCourseApi } from "../../../services/coursesAPIs.js";
import { showNotif, fullScreenLoader } from "../../scripts/funcs/utils.js";

const $ = document;

const preparationCreateCourse = async () => {
  const newCourseform = $.querySelector("#create-course-form");
  const newCourseCoverElem = $.querySelector("#create-course-form #cover");
  const newCourseCategory = $.querySelector("#create-course-form #category");
  const submitBtn = $.querySelector("#submit-btn");

  const imagePreview = document.querySelector(".preview__img");

  const categories = await getAllCategories();

  if (categories){
    newCourseCategory.innerHTML = "<option value=''>دسته بندی...</option>";

    categories.forEach(category => {
      newCourseCategory.insertAdjacentHTML(
        "beforeend",
        `
        <option value="${category.categoryId}"> ${category.categoryName} </option>
      `
      );
    });
  } else {
    console.log("false");
    newCourseCategory.innerHTML = "<option value=''>دسته بندی پیدا نشد...</option>";
    submitBtn.disabled = true;
  }

  // Image Preview
  newCourseCoverElem.addEventListener("change", () => {
    const [file] = newCourseCoverElem.files;
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
    }
  });

  newCourseform.addEventListener("submit", event => {
    event.preventDefault();
    createCourse();
  });
};

const createCourse = () => {
  const newCourseTitle = $.querySelector("#create-course-form #title");
  const newCourseDescription = $.querySelector("#create-course-form #description");
  const newCoursePrice = $.querySelector("#create-course-form #price");
  const newCourseCategory = $.querySelector("#create-course-form #category");
  const newCourseStatus = $.querySelector("#create-course-form #status");
  const newCourseShortName = $.querySelector("#create-course-form #short-name");
  const newCourseTeacher = $.querySelector("#create-course-form #teacher");
  const newCourseCoverElem = $.querySelector("#create-course-form #cover");
  const newCourseIsFreeElem = $.querySelector("#create-course-form #isFree");
  let newCourseCover = newCourseCoverElem.files[0];

  if (
    !newCourseTitle.value ||
    !newCourseDescription.value ||
    !newCoursePrice.value ||
    !newCourseCategory.value ||
    !newCourseStatus.value ||
    !newCourseShortName.value ||
    !newCourseTeacher.value ||
    !newCourseCover
  ) {
    showNotif("لطفا همه مقادیر را پر کنید");
  } else {
    if (
      !(newCourseCover.type == "image/jpeg" || newCourseCover.type == "image/png" || newCourseCover.type == "image/jpg" || newCourseCover.type == "image/webp")
    ) {
      showNotif("نوع فایل باید jpg , webp یا png باشد");
      return false;
    }

    const newCourseDatas = {
      title: newCourseTitle.value.trim(),
      caption: newCourseDescription.value.trim(),
      description: newCourseDescription.value.trim(),
      price: +newCoursePrice.value,
      categoryId: newCourseCategory.value,
      status: newCourseStatus.value,
      shortName: newCourseShortName.value.trim(),
      teacher: newCourseTeacher.value.trim(),
      isFree: newCourseIsFreeElem.value,
      discount: 0,
      discountPrice: 0,
      time: 0,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(newCourseDatas));
    formData.append("image", newCourseCover);
    sentCreateCourseApi(formData);
  }
};

const sentCreateCourseApi = async formData => {
  fullScreenLoader("loading");
  await createCourseApi(formData);
  fullScreenLoader("loaded");
};

export default preparationCreateCourse;
