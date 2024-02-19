import { api, apiAdmin, showNotif } from "../src/scripts/funcs/utils";

async function getAllCourses() {
  try {
    const res = await api.get("courses");

    const courses = res.data;

    return courses;
  } catch (err) {
    showNotif("مشکلی در نشان دادن دوره ها به وجود آمده! کمی بعد دوباره تلاش کنید");
    return null;
  }
}

async function getCourseById(id) {
  try {
    const res = await api.get(`courses/${id}`);

    const course = res.data;

    return course;
  } catch (err) {
    showNotif("مشکلی در نشان دادن دوره به وجود آمده! کمی بعد دوباره تلاش کنید");
    return null;
  }
}

async function getCoursesByCategoryId(id) {
  try {
    const res = await api.get(`courses/category/${id}`);

    const courses = res.data;

    return courses;
  } catch (err) {
    showNotif("مشکلی در نشان دادن دوره ها به وجود آمده! کمی بعد دوباره تلاش کنید");
    return null;
  }
}

async function deleteCourseApi(id) {
  return await apiAdmin
    .delete(`courses/${id}`)
    .then(res => {
      showNotif("دوره با موفقیت حذف شد", "success");
      return {
        status: true,
      };
    })
    .catch(err => {
      showNotif("مشکلی در حذف دوره به وجود آمده ! دوباره امتحان کنید");

      return {
        status: false,
      };
    });
}

async function createCourseApi(formData) {
  return await apiAdmin
    .post("courses", formData)
    .then(res => {
      console.log(res);
      showNotif("دوره با موفقیت ساخته شد", "success");

      return {
        status: true,
      };
    })
    .catch(err => {
      console.log(err);
      showNotif("مشکلی پیش آمده");

      return {
        status: false,
      };
    });
}

async function courseDescriptionApi(id, description) {
  try {
    const res = await apiAdmin.patch(`courses/${id}`, {
      description,
    });
    showNotif("توضیحان با موفقیت ویرایش شد", "success");
  } catch (err) {
    showNotif("مشکلی پیش آمده!");
  }
}

async function editCourseApi(id, datas) {
  return await apiAdmin
    .patch(`courses/${id}`, datas)
    .then(res => {
      showNotif("دوره با موفقیت ویرایش شد", "success");

      return {
        status: false,
      };
    })
    .catch(err => {
      showNotif("مشکلی پیش آمده");

      return {
        status: false,
      };
    });
}

export { getAllCourses, getCourseById, getCoursesByCategoryId, deleteCourseApi, createCourseApi, courseDescriptionApi , editCourseApi };
