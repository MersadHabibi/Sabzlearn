import { api, apiAdmin, fullScreenLoader, showNotif } from "../../scripts/funcs/utils";

const getAndPostCourseDescription = async (data, courseId) => {
  try {
    fullScreenLoader("loading");
    const res = await apiAdmin.patch(`courses/${courseId}`, {
      description: data,
    });
    showNotif("توضیحان با موفقیت ویرایش شد", "success");
    console.log(res);
  } catch (err) {
    showNotif("مشکلی پیش آمده!");
    console.log(err);
  } finally {
    fullScreenLoader("loaded");
  }
};

export default getAndPostCourseDescription;
