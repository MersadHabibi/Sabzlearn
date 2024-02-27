import { apiAdmin, showNotif } from "../src/scripts/funcs/utils";

async function addEpisodeApi(formData) {
  return await apiAdmin
    .post("/episode", formData)
    .then((res) => {
      showNotif("قسمت جدید با موفقیت ساخته شد", "success");

      return {
        status: true,
      };
    })
    .catch((err) => {
      showNotif("مشکلی در ساخت قسمت جدید به وجود آمده!");

      return {
        status: false,
      };
    });
}

async function createTopicApi(id, datas, callback) {
  return await apiAdmin
    .post(`courses/${id}/subjects`, datas)
    .then((res) => {
      showNotif("سر فصل جدید ساخته شد", "success");

      return {
        status: true,
      };
    })
    .catch((err) => {
      showNotif("ساخت سر فصل جدید با مشکل مواجه شد!");

      return {
        status: false,
      };
    })
    .finally(() => callback());
}

export { addEpisodeApi, createTopicApi };
