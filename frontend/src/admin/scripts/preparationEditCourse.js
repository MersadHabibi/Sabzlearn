import { getAllCategories } from "../../../services/categoriesAPIs";
import { editCourseApi, getCourseById } from "../../../services/coursesAPIs";
import {
  BASE_URL,
  fullScreenLoader,
  showNotif,
} from "../../scripts/funcs/utils";
import changeContent from "./changeContents";
import {
  categoryPreviewHandler,
  descriptionPreviewHandler,
  isFreePreviewHandler,
  pricePreviewHandler,
  teacherPreviewHandler,
  titlePreviewHandler,
} from "./createCoursePreview";

let courseId = null;

const preparationEditCourse = async (id) => {
  courseId = id;
  fullScreenLoader("loading");

  const newCourseTitle = document.querySelector("#create-course-form #title");
  const newCourseDescription = document.querySelector(
    "#create-course-form #description",
  );
  const newCoursePrice = document.querySelector("#create-course-form #price");
  const newCourseCategory = document.querySelector(
    "#create-course-form #category",
  );
  const newCourseStatus = document.querySelector("#create-course-form #status");
  const newCourseShortName = document.querySelector(
    "#create-course-form #short-name",
  );
  const newCourseTeacher = document.querySelector(
    "#create-course-form #teacher",
  );
  const newCourseCoverElem = document.querySelector(
    "#create-course-form #cover",
  );
  const newCourseIsFreeElem = document.querySelector(
    "#create-course-form #isFree",
  );

  const newCoursePreviewImage = document.querySelector(".preview__img");

  // Back

  const backBtn = document.querySelector("#back-btn");

  backBtn.addEventListener("click", () => {
    changeContent("courses");
  });

  // Get Datas

  const course = await getCourseById(id);
  const categories = await getAllCategories();

  if (course === null || categories === null) {
    changeContent("courses");
    return;
  }

  // Set Categories

  newCourseCategory.innerHTML = "<option value=''>دسته بندی...</option>";

  categories.forEach((category) => {
    newCourseCategory.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${category.categoryId}"> ${category.categoryName} </option>
      `,
    );
  });

  // Set Value

  newCourseTitle.value = course.title;
  titlePreviewHandler(newCourseTitle);
  newCourseDescription.value = course.caption;
  descriptionPreviewHandler(newCourseDescription);
  newCoursePrice.value = course.price;
  pricePreviewHandler(newCoursePrice);
  newCourseCategory.value = course.categoryId;
  categoryPreviewHandler(newCourseCategory);
  newCourseStatus.value = course.status;
  newCourseShortName.value = course.shortName;
  newCourseTeacher.value = course.teacher;
  teacherPreviewHandler(newCourseTeacher);
  newCoursePreviewImage.src = `${BASE_URL}/${course.image}`;
  newCourseIsFreeElem.value = course.isFree;
  isFreePreviewHandler(newCourseIsFreeElem);

  // Image Preview
  newCourseCoverElem.addEventListener("change", () => {
    const [file] = newCourseCoverElem.files;
    if (file) {
      newCoursePreviewImage.src = URL.createObjectURL(file);
    }
  });

  window.editCourse = editCourse;
  fullScreenLoader("loaded");
};

const editCourse = async (event) => {
  event.preventDefault();

  const newCourseTitle = document.querySelector("#create-course-form #title");
  const newCourseDescription = document.querySelector(
    "#create-course-form #description",
  );
  const newCoursePrice = document.querySelector("#create-course-form #price");
  const newCourseCategory = document.querySelector(
    "#create-course-form #category",
  );
  const newCourseStatus = document.querySelector("#create-course-form #status");
  const newCourseShortName = document.querySelector(
    "#create-course-form #short-name",
  );
  const newCourseTeacher = document.querySelector(
    "#create-course-form #teacher",
  );
  const newCourseIsFreeElem = document.querySelector(
    "#create-course-form #isFree",
  );

  if (
    !newCourseTitle.value ||
    !newCourseDescription.value ||
    !newCoursePrice.value ||
    !newCourseCategory.value ||
    !newCourseStatus.value ||
    !newCourseShortName.value ||
    !newCourseTeacher.value
  ) {
    showNotif("لطفا همه مقادیر را پر کنید");
  } else {
    const newCourseDatas = {
      title: newCourseTitle.value.trim(),
      caption: newCourseDescription.value.trim(),
      price: +newCoursePrice.value,
      categoryId: newCourseCategory.value,
      status: newCourseStatus.value,
      shortName: newCourseShortName.value.trim(),
      teacher: newCourseTeacher.value.trim(),
      isFree: newCourseIsFreeElem.value,
    };

    fullScreenLoader("loading");
    const res = await editCourseApi(courseId, newCourseDatas);
    fullScreenLoader("loaded");

    if (res.status === true) {
      changeContent("courses");
    }
  }
};

export default preparationEditCourse;
