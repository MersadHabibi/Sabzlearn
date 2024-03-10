import { logoutApi } from "../../../services/usersAPIs.js";
import { BASE_URL, _changeClasses } from "../funcs/utils.js";
import myCourses from "./myCourses.js";
import userInfo from "./userInfo.js";

const $ = document;
const contentContainer = $.querySelector(".content");

const contentsName = [
  "home",
  "courses",
  "tickets",
  "new-ticket",
  "user-infos",
  "logout",
];

const loadPanelContent = async (content, user) => {
  // If Content Name Is Not True
  if (!contentsName.includes(content)) {
    location.replace("./panel.html");
    return;
  }

  const name =
    user.name && user.family ? `${user.name} ${user.family}` : user.username;

  if (content == "logout") {
    const res = await logoutApi();

    if (res.status) {
      localStorage.removeItem("token");
      location.replace("./index.html");
    }

    return false;
  } else if (content == "home") {
    contentContainer.innerHTML = `
      <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">${name} عزیز؛ خوش اومدی 🙌</p>
        <!-- Tags -->
        <div class="flex flex-wrap items-center justify-start gap-x-5 md:gap-x-8 gap-y-3 md:pt-8">
          <div class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-sky-500 dark:bg-secondary rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#rocket-launch"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">دوره های من</span>
              <span class="text-sm md:text-lg font-DanaMedium">${user.courses.length} دوره</span>
            </div>
          </div>
          <div class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-pink-500 dark:bg-rose-500 rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#ticket"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">مجموع تیکت ها</span>
              <span class="text-sm md:text-lg font-DanaMedium">0 تیکت</span>
            </div>
          </div>
        </div>
        <!-- Tickets - Questions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <!-- tickets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl basis-full px-3.5 md:px-5 pb-5 pt-1">
            <!-- tickets header -->
            <div class="flex flex-wrap justify-between gap-x-2 py-2.5 md:py-3 mb-5 border-b border-gray-200 dark:border-gray-700">
              <span class="font-DanaMedium text-xl/10 dark:text-white">تیکت های اخیر</span>
              <button
                type="button"
                class="flex items-center gap-x-1 py-1 px-3 rounded-xl text-sky-500 dark:text-secondary hover:bg-sky-500/10 dark:hover:bg-secondary/10 transition-colors mr-auto">
                <span>همه تیکت ها</span>
                <svg class="w-4 h-4">
                  <use href="#arrow-small-left"></use>
                </svg>
              </button>
            </div>
            <!-- tickets Body -->
            <div class="flex flex-col">
              <!--
              <div class="flex items-start justify-between flex-col gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a href="https://sabzlearn.ir/my-account/view_ticket?id=8529" class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >استوری آقای سعیدی راد در مورد next js</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/09/05</span>
                  <span class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded">بسته شده</span>
                </div>
              </div>
              -->
            </div>
          </div>
          <!-- Questions -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl basis-full px-3.5 md:px-5 pb-5 pt-1">
            <!-- Questions header -->
            <div class="flex flex-wrap justify-between gap-x-2 py-2.5 md:py-3 mb-5 border-b border-gray-200 dark:border-gray-700">
              <span class="font-DanaMedium text-xl/10 dark:text-white">پرسش های اخیر</span>
              <button
                type="button"
                class="flex items-center gap-x-1 py-1 px-3 rounded-xl text-sky-500 dark:text-secondary hover:bg-sky-500/10 dark:hover:bg-secondary/10 transition-colors mr-auto">
                <span>همه پرسش ها</span>
                <svg class="w-4 h-4">
                  <use href="#arrow-small-left"></use>
                </svg>
              </button>
            </div>
            <!-- Questions Body -->
            <div class="flex flex-col">
              <!-- 
              <div class="flex items-start justify-between flex-col gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a href="https://sabzlearn.ir/lesson/34-24560/#q-3267" class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >پروژه های تخصصی با جاوا اسکریپت برای بازار کار - نمایش دوره‌ها بر اساس دسته بندی</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/08/15</span>
                  <span class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded">بسته شده</span>
                </div>
              </div>
              -->
            </div>
          </div>
        </div>
    `;
  } else if (content == "courses") {
    contentContainer.innerHTML = `
        <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">${name} عزیز؛ خوش اومدی 🙌</p>
        <!-- Tags -->
        <div class="flex flex-wrap items-center justify-start gap-x-5 md:gap-x-8 gap-y-3 md:pt-8">
          <div class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-amber-400 dark:bg-yellow-400 rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#cradit-card"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">دوره های ثبت نام شده</span>
              <span class="text-sm md:text-lg font-DanaMedium">${user.courses.length} دوره</span>
            </div>
          </div>
          <div class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-sky-500 dark:bg-secondary rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#currency-dollar"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">دوره های نقدی</span>
              <span id="not-free-courses" class="text-sm md:text-lg font-DanaMedium">0 دوره</span>
            </div>
          </div>
          <div class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-primary rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#rocket-launch"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">دوره های رایگان</span>
              <span id="free-courses" class="text-sm md:text-lg font-DanaMedium">0 دوره</span>
            </div>
          </div>
        </div>
        <!-- Courses -->
        <div id="courses__container" class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          <div class="loader mx-auto xs:col-span-2 lg:col-span-3"></div>
        </div>
        `;

    myCourses(user);
  } else if (content == "tickets") {
    contentContainer.innerHTML = `
      <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">${name} عزیز؛ خوش اومدی 🙌</p>
      <!-- Tags -->
      <div class="flex flex-wrap items-center justify-start gap-x-5 md:gap-x-8 gap-y-3 md:pt-8">
        <div
          class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-amber-400 dark:bg-yellow-400 rounded-2xl flex-grow md:flex-grow-0">
          <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg class="w-8 h-8 md:w-9 md:h-9">
              <use href="#ticket"></use>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs mb-1.5 md:mb-3">همه تیکت ها</span>
            <span class="text-sm md:text-lg font-DanaMedium">4 عدد</span>
          </div>
        </div>
        <div
          class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-sky-500 dark:bg-secondary rounded-2xl flex-grow md:flex-grow-0">
          <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg class="w-8 h-8 md:w-9 md:h-9">
              <use href="#envelope-open"></use>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs mb-1.5 md:mb-3">تیکت های باز</span>
            <span class="text-sm md:text-lg font-DanaMedium">۰ دوره</span>
          </div>
        </div>
        <div
          class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-pink-500 dark:bg-rose-500 rounded-2xl flex-grow md:flex-grow-0">
          <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg class="w-8 h-8 md:w-9 md:h-9">
              <use href="#chat-bubble-left-right"></use>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs mb-1.5 md:mb-3">بسته شده</span>
            <span class="text-sm md:text-lg font-DanaMedium">4 تیکت</span>
          </div>
        </div>
      </div>
      <!-- New Ticket -->
      <div class="flex mt-5">
        <button
          onclick="loadPanelContent('new-ticket')"
          class="flex items-center gap-x-3 w-full xs:w-auto bg-sky-500 dark:bg-secondary text-white rounded-2xl p-4 md:p-6 font-DanaDemiBold text-lg md:text-xl">
          <svg class="w-8 h-8">
            <use href="#plus-circle"></use>
          </svg>
          <span>تیکت جدید</span>
        </button>
      </div>
      <!-- tickets -->
      <div class="bg-white dark:bg-gray-800 p-3.5 md:p-4.5 rounded-2xl mt-10">
        <div
          class="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
          <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">تیکت ها</span>
        </div>
        <div>
          <!-- 
          <div class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <div class="flex items-center">
              <span class="block w-20 text-right font-DanaMedium text-black">#8529</span>
              <a
                href="https://sabzlearn.ir/my-account/view_ticket?id=8529"
                class="text-zinc-700 dark:text-white w-full font-danaMedium sm:max-w-md md:truncate"
                >استوری آقای سعیدی راد در مورد next js</a
              >
            </div>
            <div class="flex items-center gap-5">
              <span class="text-xs text-slate-500 dark:text-slate-400" dir="ltr">1402/08/26 (23:41)</span>
              <span
                class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                >پشتیبانی</span
              >
              <span
                class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                >بسته شده</span
              >
            </div>
           -->
           <p class="text-center text-lg dark:text-white pb-2"> تیکتی وجود ندارد </p>
          </div>
        </div>
      </div>
      `;
  } else if (content == "new-ticket") {
    contentContainer.innerHTML = `
        <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">${name} عزیز؛ خوش اومدی 🙌</p>
        <!-- New Ticket -->
        <div class="bg-white dark:bg-gray-800 p-3.5 md:p-5 rounded-2xl mt-10 md:mt-15">
          <!-- New Ticket Header -->
          <div
            class="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
            <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">ارسال تیکت</span>
            <button onclick="loadPanelContent('tickets')" class="bg-red-500 hover:bg-red-600 size-10 rounded-md flex justify-center items-center text-white transition-colors">
              <svg class="size-5">
                <use href="#arrow-uturn-left"></use>
              </svg>
            </button>
          </div>
          <form>
            <div>
              <label for="department" class="font-DanaDemiBold text-zinc-700 dark:text-white">دپارتمان</label>
              <select
                name="department"
                id="department"
                required=""
                class="mt-3.5 md:mt-4 w-full p-3 sm:p-5 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
                <option value="">دپارتمان مورد نظر...</option>
                <option value="finance">مالی</option>
                <option value="management">ارتباط با مدیریت</option>
                <option value="support">پشتیبانی</option>
                <option value="counseling">مشاوره</option>
              </select>
            </div>
            <div class="mt-6">
              <label for="title" class="font-DanaDemiBold text-zinc-700 dark:text-white">موضوع تیکت</label>
              <input
                type="text"
                class="mt-3.5 md:mt-4 w-full p-3 sm:p-5 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none"
                id="title"
                name="title"
                required=""
                placeholder="موضوع تیکت خود را وارد کنید" />
            </div>
            <div class="mt-6">
              <label for="text" class="font-DanaDemiBold text-zinc-700 dark:text-white">متن تیکت</label>
              <textarea
                rows="8"
                class="mt-3.5 md:mt-4 w-full p-3 sm:p-5 outline-none text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all"
                id="text"
                name="text"
                required=""
                placeholder="متن تیکت خود را وارد کنید"></textarea>
            </div>
            <div class="flex justify-between gap-5 flex-wrap mt-6">
              <div class="flex gap-x-3 mr-auto">
                <button class="bg-primary  text-white rounded-xl px-5 py-2" type="submit">ارسال</button>
              </div>
            </div>
          </form>
        </div>
      `;
  } else if (content == "user-infos") {
    contentContainer.innerHTML = `
        <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">${name} عزیز؛ خوش اومدی 🙌</p>
        <!-- User Details -->
        <div class="user-details grid grid-cols-1 xl:grid-cols-3 gap-10 md:mt-15">
          <div class="xl:col-span-2 bg-white dark:bg-gray-800 p-5 rounded-2xl">
            <div class="pb-5 border-b border-b-gray-200 dark:border-b-slate-500">
              <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">جزییات حساب کاربری</span>
            </div>
            <form onsubmit="editUserInfo( event ,'${user.id}')" id="edit-account-info" class="p-3.5 pt-8">
              <div class="relative mb-11">
                <div class="w-32 md:w-44 h-32 md:h-44 rounded-full overflow-hidden">
                  <img src="${
                    user.imageProfile
                      ? `${BASE_URL}/${user.imageProfile}`
                      : "/images/user-profile.png"
                  }" class="user__profile-image h-full w-full object-cover" />
                </div>
                <label
                  for="user__profile-input"
                  class="absolute bottom-0 right-0 flex items-center justify-center w-10 md:w-14 h-10 md:h-14 rounded-full bg-sky-600 dark:bg-secondary dark:hover:bg-blue-600 border-2 md:border-4 border-white dark:border-gray-800 cursor-pointer transition-colors">
                  <svg class="w-5 md:w-6 h-5 md:h-6 text-white">
                    <use href="#arrow-path-rounded-square-mini"></use>
                  </svg>
                </label>
                <input type="file" id="user__profile-input" class="hidden" onchange="changeProfileHandler(this , '${user.id}')" accept="image/png, image/jpeg"/>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
                <div>
                  <label for="phone" class="font-DanaDemiBold text-zinc-700 dark:text-white">شماره موبایل</label>
                  <input
                    type="text"
                    id="phone"
                    class="text-ltr mt-3.5 md:mt-4 bg-gray-200 cursor-not-allowed"
                    disabled
                    value="${user.phoneNumber}"  />
                </div>
                <div class="hidden md:block"></div>
                <div>
                  <label for="first_name" class="font-DanaDemiBold text-zinc-700 dark:text-white">نام</label>
                  <input type="text" class="mt-3.5 md:mt-4" id="first_name" name="first_name" value="${
                    user.name ? user.name : ""
                  }" oninput="changeInputsValueHandler()" />
                </div>
                <div>
                  <label for="last_name" class="font-DanaDemiBold text-zinc-700 dark:text-white">نام خانوادگی</label>
                  <input type="text" class="mt-3.5 md:mt-4" id="last_name" name="last_name" value="${
                    user.family ? user.family : ""
                  }" oninput="changeInputsValueHandler()" />
                </div>
                <div>
                  <label for="username" class="font-DanaDemiBold text-zinc-700 dark:text-white">نام کاربری</label>
                  <input
                    type="text"
                    class="mt-3.5 md:mt-4 bg-gray-200 cursor-not-allowed"
                    disabled=""
                    id="username"
                    value="${user.username}" />
                </div>
                <div>
                  <label for="email" class="font-DanaDemiBold text-zinc-700 dark:text-white">ایمیل</label>
                  <input
                    type="email"
                    class="mt-3.5 md:mt-4"
                    id="email"
                    name="email"
                    disabled=""
                    required=""
                    value="${user.email}" />
                </div>
              </div>
              <input type="hidden" name="nonce" value="8c6668f0dc" />
              <button
                type="submit"
                class="flex justify-center items-center bg-primary hover:bg-green-500 text-white h-14 p-7 text-xl rounded-xl mr-auto w-full md:w-auto mt-10">
                ثبت اطلاعات
              </button>
            </form>
          </div>
          <div class="xl:col-span-1 bg-white dark:bg-gray-800 p-5 rounded-2xl">
            <div class="pb-5 border-b border-b-gray-200 dark:border-b-slate-500">
              <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">تغییر رمز عبور</span>
            </div>
            <form onsubmit="changeUserPassword( event ,'${user.id}')" id="edit-account-password" class="p-3.5 pt-8">
              <div class="space-y-5 md:space-y-6">
                <div>
                  <label for="current-password" class="font-DanaDemiBold text-zinc-700 dark:text-white">رمز عبور فعلی</label>
                  <input
                    type="password"
                    id="current-password"
                    name="current-password"
                    required=""
                    class="mt-3.5 md:mt-4 mb-3"
                    placeholder="رمز فعلی را وارد کنید" />
                  <!-- <a href="" class="text-slate-500 dark:text-slate-400 text-sm"
                    >رمز عبور را فراموش کرده اید؟</a
                  > -->
                </div>
                <div>
                  <label for="new-password" class="font-DanaDemiBold text-zinc-700 dark:text-white">رمز عبور جدید</label>
                  <input
                    type="password"
                    class="mt-3.5 md:mt-4"
                    id="new-password"
                    name="new-password"
                    required=""
                    placeholder="رمز جدید را وارد کنید" />
                </div>
              </div>
              <input type="hidden" name="nonce" value="0f25f8f35f" />
              <button
                type="submit"
                class="flex justify-center items-center bg-primary hover:bg-green-500 text-white h-14 p-7 text-xl rounded-xl mr-auto w-full md:w-auto mt-10">
                تغییر رمز
              </button>
            </form>
          </div>
        </div>
      `;

    userInfo(user);
  }
};
export { loadPanelContent };
