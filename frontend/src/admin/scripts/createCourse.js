import { showNotif, api, apiAdmin, getToken, fullScreenLoader } from "../../scripts/funcs/utils.js";

const $ = document;

const preparationCreateCourse = () => {
  const newCourseform = $.querySelector("#create-course-form");

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
    if (!(newCourseCover.type == "image/jpeg" || newCourseCover.type == "image/png" || newCourseCover.type == "image/jpg")) {
      showNotif("نوع فایل باید jpg یا png باشد");
      return false;
    }

    const newCourseDatas = {
      title: newCourseTitle.value.trim(),
      description: newCourseDescription.value.trim(),
      price: +newCoursePrice.value,
      category: newCourseCategory.value,
      status: newCourseStatus.value,
      shortName: newCourseShortName.value.trim(),
      teacher: newCourseTeacher.value.trim(),
      isFree: false,
      discount: 0,
      discountPrice: 0,
      time: "0",
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(newCourseDatas));
    formData.append("image", newCourseCover);
    sentCreateCourseApi(formData);
  }
};

const sentCreateCourseApi = async formData => {
  fullScreenLoader("loading");
  await apiAdmin
    .post("courses", formData, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then(res => {
      showNotif("دوره با موفقیت ساخته شد", "success");
      fullScreenLoader("loaded");
    })
    .catch(err => {
      showNotif("مشکلی پیش آمده");
      fullScreenLoader("loaded");
    });
};

export default preparationCreateCourse;
