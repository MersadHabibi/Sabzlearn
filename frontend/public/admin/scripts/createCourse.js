import { showNotif } from "../../scripts/funcs/utils.js";

const $ = document;
let newCourseCover = null;

const preparerCreateCourse = () => {
  const newCourseCoverElem = $.querySelector("#create-course-form #cover");
  const newCourseform = $.querySelector("#create-course-form");

  newCourseCoverElem.addEventListener("change", (event) => {
    newCourseCover = event.target.files;
  });

  newCourseform.addEventListener("submit", (event) => {
    event.preventDefault();
    createCourse();
  });
};

const createCourse = (cover) => {
  const newCourseTitle = $.querySelector("#create-course-form #title");
  const newCourseDescription = $.querySelector(
    "#create-course-form #description"
  );
  const newCoursePrice = $.querySelector("#create-course-form #price");
  const newCourseCategory = $.querySelector("#create-course-form #category");
  const newCourseStatus = $.querySelector("#create-course-form #status");
  const newCourseShortName = $.querySelector("#create-course-form #short-name");
  const newCourseTeacher = $.querySelector("#create-course-form #teacher");

  const newCourseDatas = {
    title: newCourseTitle.value.trim(),
    description: newCourseDescription.value.trim(),
    price: +newCoursePrice.value,
    category: newCourseCategory.value,
    status: newCourseStatus.value,
    shortName: newCourseShortName.value.trim(),
    teacher: newCourseTeacher.value.trim(),
  };

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
    console.log(newCourseDatas);
  } else {
    console.log(newCourseDatas);

    const formData = new FormData();
    formData.append("data", newCourseDatas);
    formData.append("image", newCourseCover);
  }
};

export default preparerCreateCourse;
