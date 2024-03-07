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
    .then((res) => {
      // showNotif("اکانت شما با موفقیت ساخته شد", "success");

      return {
        status: true,
      };
    })
    .catch((err) => {
      if (err.message == "Request failed with status code 403")
        showNotif("ایمیل یا نام کاربری قبلا استفاده شده است");
      else showNotif("ساخت حساب با مشکل مواجه شد");

      return {
        status: false,
      };
    });
}

async function loginApi(datas) {
  try {
    const res = await api.post("login", datas);

    console.log(res);

    if (!res.data.token) {
      showNotif("ایمیل یا رمز عبور درست نیست");

      return {
        status: false,
      };
    } else if (res.data.token) {
      showNotif("با موفقیت وارد شدید", "success");
      localStorage.setItem("token", res.data.token);

      return {
        status: true,
      };
    }
  } catch (err) {
    if (err.status) {
      showNotif("ایمیل یا رمز عبور درست نیست");
    } else {
      showNotif("مشکلی به وجود آمده!");
    }
    console.log(err);

    return {
      status: false,
    };
  }

  // return await api
  //   .post("login", {
  //     ...data,
  //   })
  //   .then((res) => {
  //     if (!res.data.token) {
  //       showNotif("ایمیل یا رمز عبور درست نیست");
  //     } else if (res.data.token) {
  //       showNotif("با موفقیت وارد شدید", "success");
  //       localStorage.setItem("token", res.data.token);

  //       return res;
  //     }
  //   })
  //   .catch((err) => {
  //     showNotif("مشکلی پیش آمده");
  //     return null;
  //   });
}

async function blockAndUnBlockUserApi(action, id, callback) {
  try {
    const res = await apiAdmin.post(`users/${id}`, {
      id,
    });
    showNotif(
      `${action === "block" ? `کاربر مسدود شد` : `کاربر رفع انسداد شد`}`,
      "success",
    );

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

async function editUserApi(datas) {
  console.log(`token ${getToken()}`, datas);
  try {
    const res = await api.patch("me", datas, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });

    if (res.status === 200) {
      showNotif("اطلاعات شما با موفقیت ویرایش شد", "success");

      return {
        status: true,
      };
    } else throw new Error("Error in update user");
  } catch (err) {
    showNotif("مشکلی در ویرایش اطلاعات شما به وجود آمده");

    return {
      status: false,
    };
  }
}

async function changePasswordApi(datas, callback) {
  console.log(`token ${getToken()}`, datas);
  try {
    const res = await api.patch("me?changePassword=true", datas, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });

    console.log(res);

    if (res.status === 200) {
      showNotif("رمز شما با موفقیت عوض شد", "success");

      return {
        status: true,
      };
    } else throw new Error("Error in update user");
  } catch (err) {
    showNotif("مشکلی در ویرایش رمز شما به وجود آمده");

    console.log(err);

    return {
      status: false,
    };
  } finally {
    callback();
  }
}

async function verifyOTPApi(datas, callback) {
  console.log(datas);
  try {
    const res = await api.post("verify-otp", datas);

    console.log(res);

    return {
      status: true,
    };

    // if (res.response.status === 200) {
    //   showNotif("حساب شما با موفقیت ساخته شد", "success");

    //   localStorage.setItem("token", res.data.token);

    //   return {
    //     status: true,
    //   };
    // } else throw new Error("Unknown Error");
  } catch (err) {
    // console.log(err);
    // if (err.response.status === 403) {
    //   showNotif("زمان وارد کردن کد تموم شده است");
    // } else if (err.response.status === 401) {
    //   showNotif("کد وارد شده درست نیست");
    // }

    return {
      status: false,
    };
  } finally {
    callback();
  }
}

async function resendOTPApi(datas) {
  try {
    const res = await api.post("send-otp", datas);

    showNotif("کد برای شما ارسال شد", "success");

    console.log(res);

    return {
      status: true,
    };
  } catch (err) {
    showNotif("مشکلی در ارسال مجدد کد به وجود آمده");

    console.log(err);

    return {
      status: false,
    };
  }
}

async function changeUserProfileApi(image) {
  try {
    const res = await api.post(
      "me",
      {
        image,
      },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      },
    );

    console.log("changeUserProfileApi =>", res);

    showNotif("پروفایل با موفقیت عوض شد", "success");

    return {
      status: true,
    };
  } catch (err) {
    showNotif("تغیید پروفایل موفق نبود");
    console.log("changeUserProfileApi =>", err);

    return {
      status: false,
    };
  }
}

async function logoutApi() {
  try {
    const res = await api.get("logout", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });

    showNotif("با موفقیت خارج شدید", "success");

    return {
      status: true,
    };
  } catch (err) {
    console.log(err);
    showNotif("خروج ناموفق بود");

    return {
      status: false,
    };
  }
}

async function forgetPasswordApi(email) {
  console.log("forgetPasswordApi email: " + email);
  try {
    const res = await api.post("forget-password", {
      email,
    });

    console.log("forgetPasswordApi=>", res);

    if (res.status == 200) {
      showNotif("لینک بازنشانی رمز به ایمیل شما ارسال شد", "success");
    }

    return {
      status: true,
    };
  } catch (err) {
    console.log("forgetPasswordApi =>", err);
    if (err.response.status == 403) {
      showNotif("کاربری با این ایمیل وجود ندارد");

      return {
        status: false,
      };
    }
    showNotif("مشکلی در بازنشانی رمز عبور به وجود آمده");

    return {
      status: false,
    };
  }
}

export {
  getMe,
  registerApi,
  loginApi,
  getAllUsers,
  blockAndUnBlockUserApi,
  changeUserRoleApi,
  editUserApi,
  changePasswordApi,
  verifyOTPApi,
  resendOTPApi,
  changeUserProfileApi,
  logoutApi,
  forgetPasswordApi,
};
