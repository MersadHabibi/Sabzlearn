import { api, apiAdmin, getToken, showNotif } from "../src/scripts/funcs/utils";

async function getAllUsers() {
  try {
    const res = await apiAdmin.get("users");
    const users = res.data;

    return users;
  } catch (err) {
    showNotif("اینترنت خود را بررسی کنید!");
    return null;
  }
}

async function getMe() {
  let token = getToken();
  if (!token) {
    return null;
  }

  try {
    const res = await api.get("me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data;

    return user;
  } catch (err) {
    return null;
  }
}

async function registerApi(data) {
  return await api
    .post("register", {
      ...data,
    })
    .then(res => {
      showNotif("اکانت شما با موفقیت ساخته شد", "success");
      localStorage.setItem("token", res.data.token);

      return res;
      // location.href = getAfterPageLink();
    })
    .catch(err => {
      if (err.message == "Request failed with status code 403") showNotif("ایمیل یا نام کاربری قبلا استفاده شده است");
      else showNotif("ساخت حساب با مشکل مواجه شد");

      return null;
    });
}

async function loginApi(data) {
  return await api
    .post("login", {
      ...data,
    })
    .then(res => {
      if (!res.data.token) {
        showNotif("ایمیل یا رمز عبور درست نیست");
      } else if (res.data.token) {
        showNotif("با موفقیت وارد شدید", "success");
        localStorage.setItem("token", res.data.token);

        return res;
      }
    })
    .catch(err => {
      showNotif("مشکلی پیش آمده");
      return null;
    });
}

async function blockAndUnBlockUserApi(action, id, callback) {
  try {
    const res = await apiAdmin.post(`users/${id}`, {
      id,
    });
    showNotif(`${action === "block" ? `کاربر مسدود شد` : `کاربر رفع انسداد شد`}`, "success");

    return {
      status: true,
    };
  } catch (err) {
    showNotif("مشکلی به وجود آمده! دوباره امتحان کنید");

    return {
      status: false,
    };
  } finally {
    callback();
  }
}

async function changeUserRoleApi(id, role, callback) {
  try {
    const res = await apiAdmin.patch(`users/${id}`, {
      id,
      role,
    });

    role == "admin" && showNotif("ادمین با موفقیت انتخاب شد", "success");
    role == "user" && showNotif("ادمین با موفقیت حذف شد", "success");

    return {
      status: true,
    };
  } catch (err) {
    role == "admin" && showNotif("مشکلی در انتخاب ادمین به وجود آمده!");
    role == "user" && showNotif("مشکلی در حذف ادمین به وجود آمده!");

    return {
      status: false,
    };
  } finally {
    callback();
  }
}

async function editUserApi(datas, callback) {
  console.log(`token ${getToken()}`, datas);
  try {
    const res = await api.patch("me", datas, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });

    console.log(res);

    showNotif("اطلاعات شما با موفقیت ویرایش شد", "success");

    return {
      status: true,
    };
  } catch (err) {
    showNotif("مشکلی در ویرایش اطلاعات شما به وجود آمده");

    console.log(err);

    return {
      status: false,
    };
  } finally {
    callback();
  }
}

export { getMe, registerApi, loginApi, getAllUsers, blockAndUnBlockUserApi, changeUserRoleApi, editUserApi };
