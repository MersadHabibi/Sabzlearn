import { api, apiAdmin, showNotif } from "../src/scripts/funcs/utils";

async function getAllCategories() {
  try {
    const res = await api.get("categories");

    const categories = res.data;

    return categories;
  } catch (err) {
    showNotif(
      "مشکلی در نشان دادن دسته بندی ها به وجود آمده! کمی بعد دوباره تلاش کنید",
    );
    return null;
  }
}

async function createCategoryApi(name) {
  try {
    const res = await apiAdmin.post("categories", {
      name,
    });

    showNotif("دسته بندی جدید با موفقیت اضافه شد", "success");

    return {
      status: true,
    };
  } catch (err) {
    showNotif("مشکلی در ایجاد دسته بندی جدید به وجود آمده!");

    return {
      status: false,
    };
  }
}

export { getAllCategories, createCategoryApi };
