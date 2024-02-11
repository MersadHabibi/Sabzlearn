import { api, apiAdmin, fullScreenLoader, showNotif } from "../../scripts/funcs/utils";
import changeContent from "./changeContents";
import {
  categoryPreviewHandler,
  descriptionPreviewHandler,
  isFreePreviewHandler,
  pricePreviewHandler,
  teacherPreviewHandler,
  titlePreviewHandler,
} from "./createCoursePreview";
import { getCategories } from "./showCategories";

let courseId = null;

const preparationEditCourse = async id => {
  courseId = id;
  fullScreenLoader("loading");

  const newCourseTitle = document.querySelector("#create-course-form #title");
  const newCourseDescription = document.querySelector("#create-course-form #description");
  const newCoursePrice = document.querySelector("#create-course-form #price");
  const newCourseCategory = document.querySelector("#create-course-form #category");
  const newCourseStatus = document.querySelector("#create-course-form #status");
  const newCourseShortName = document.querySelector("#create-course-form #short-name");
  const newCourseTeacher = document.querySelector("#create-course-form #teacher");
  const newCourseCoverElem = document.querySelector("#create-course-form #cover");
  const newCourseIsFreeElem = document.querySelector("#create-course-form #isFree");

  const newCoursePreviewImage = document.querySelector(".preview__img");

  // Back

  const backBtn = document.querySelector("#back-btn");

  backBtn.addEventListener("click", () => {
    changeContent("courses");
  });

  // Get Datas

  const course = await getCourse(id);
  const categories = await getCategories();

  categories === null && changeContent("courses");

  // Set Categories

  newCourseCategory.innerHTML = "<option value=''>دسته بندی...</option>";

  categories.forEach(category => {
    newCourseCategory.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${category.categoryId}"> ${category.categoryName} </option>
      `
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
  newCoursePreviewImage.src = `http://localhost:3000/${course.image}`;
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

const editCourse = event => {
  event.preventDefault();

  const newCourseTitle = document.querySelector("#create-course-form #title");
  const newCourseDescription = document.querySelector("#create-course-form #description");
  const newCoursePrice = document.querySelector("#create-course-form #price");
  const newCourseCategory = document.querySelector("#create-course-form #category");
  const newCourseStatus = document.querySelector("#create-course-form #status");
  const newCourseShortName = document.querySelector("#create-course-form #short-name");
  const newCourseTeacher = document.querySelector("#create-course-form #teacher");
  const newCourseIsFreeElem = document.querySelector("#create-course-form #isFree");

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

    editCourseApi(newCourseDatas);
  }
};

const editCourseApi = async newCourse => {
  console.log(courseId, newCourse);
  fullScreenLoader("loading");
  await apiAdmin
    .patch(`courses/${courseId}`, newCourse)
    .then(res => {
      console.log(res);
      showNotif("دوره با موفقیت ویرایش شد", "success");
    })
    .catch(err => {
      console.log(err);
      showNotif("مشکلی پیش آمده");
    })
    .finally(() => {
      fullScreenLoader("loaded");
    });
};

const getCourse = async id => {
  try {
    const res = await api(`courses/${id}`);
    const course = res.data;
    console.log(course);

    return course;
  } catch (err) {
    console.log(err);
    changeContent("courses");
    showNotif("اینترنت خود را بررسی کنید!");

    return null;
  }
};

export default preparationEditCourse;
