import { apiAdmin, showNotif } from "../../scripts/funcs/utils";

const showUsers = async () => {
  const usersContainer = document.querySelector(".users__container");

  const users = await getUsers();

  if (!users) {
    usersContainer.innerHTML = `<p class="text-xl dark:text-white text-center py-3 sm:col-span-2 md:col-span-1 lg:col-span-3 xl:col-span-4 xxl:col-span-5"></p>`;
    return;
  } else {
    usersContainer.innerHTML = "";
    users.forEach(user => {
      usersContainer.insertAdjacentHTML(
        "beforeend",
        `
        ${createUserCard(user)}
      `
      );
    });
  }
};

const getUsers = async () => {
  try {
    const res = await apiAdmin.get("users");
    const users = res.data;

    return users;
  } catch (err) {
    showNotif("اینترنت خود را بررسی کنید!");
    return null;
  }
};

const createUserCard = user => {
  console.log(user);
  return `
    <div
      class="relative flex flex-col justify-center items-center bg-gray-100 dark:bg-gray rounded-xl p-4 border border-gray-300 dark:border-none overflow-hidden">
      <!-- Role -->
      ${user.role === "admin" ? `<span class="absolute top-2 right-2 bg-secondary px-2 py-1 text-white rounded-lg text-xs"> ادمین </span>` : ""}
      
      <!-- Profile & Username -->
      <div class="flex flex-col justify-center items-center gap-y-5 w-full border-b border-gray-200 dark:border-gray-700 py-4 shrink-0">
        <!-- Profile -->
        <div class="rounded-full overflow-hidden size-22 shadow-light">
          <img src="/images/user-profile.png" alt="" />
        </div>
        <!-- Username -->
        <span class="font-DanaDemiBold text-xl/5 dark:text-white text-center"> ${user.username} </span>
      </div>

      <!-- Firstname & Lastname & Email & Number -->
      <div class="dark:text-white w-full">
        <!-- Firstname & Lastname -->
        <div class="flex flex-col justify-center gap-y-2 w-full border-b border-gray-200 dark:border-gray-700 text-lg px-3 py-4">
          <p class="overflow-hidden whitespace-nowrap text-ellipsis">
            <span class="font-DanaMedium"> نام: </span>
            <span> ${user.name ? user.name : "ندارد"} </span>
          </p>
          <p class="overflow-hidden whitespace-nowrap text-ellipsis">
            <span class="font-DanaMedium"> نام خانوادگی: </span>
            <span> ${user.family ? user.family : "ندارد"} </span>
          </p>
        </div>
        <!-- Email & Number -->
        <div class="flex flex-col justify-center gap-y-2 w-full border-b border-gray-200 dark:border-gray-700 text-lg px-3 py-4">
          <p class="flex flex-col">
            <span class="font-DanaMedium"> ایمیل: </span>
            <span class="overflow-hidden whitespace-nowrap text-ellipsis"> ${user.email} </span>
          </p>
          <p>
            <span class="font-DanaMedium"> شماره: </span>
            <span> ${user.phoneNumber} </span>
          </p>
        </div>
      </div>
      <!-- Button -->
      <div class="pt-4 w-full">
        <button class="open-user-actions-btn bg-primary hover:bg-green-500 w-full py-2 rounded-md text-white text-lg transition-colors">
          تغییرات
        </button>
      </div>
      <!-- Actions -->
      <div
        class="absolute left-0 right-0 !-bottom-full w-full h-full flex flex-col justify-center items-center gap-y-4 bg-gray-200 dark:bg-gray-700">
        <button class="bg-red-500 hover:bg-red-600 py-2 w-36 rounded-md text-white transition-colors">مسدود کردن</button>
        <button class="bg-secondary hover:bg-sky-600 py-2 w-36 rounded-md text-white transition-colors">تغییر دسترسی</button>
        <button class="bg-gray-400/70 hover:bg-gray-400 py-2 w-36 rounded-md text-white transition-colors">بازگشت</button>
      </div>
    </div>
  `;
};

export default showUsers;
