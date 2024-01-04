import preparationCreateCourse from "./createCourse";
import getAndShowComments from "./getAndShowComments";

const changeContent = targetMenu => {
  const contentContainer = document.querySelector(".content-container");
  contentContainer.innerHTML = "";

  console.log(targetMenu);

  if (targetMenu == "tickets") {
  } else if (targetMenu == "comments") {
    contentContainer.innerHTML = `
      <div class="content comments">
        <div class="w-full pb-40 bg-white dark:bg-gray-800 shadow-light rounded-xl px-5">
          <!-- Title -->
          <div class="py-4 border-b border-gray-200 dark:border-slate">
            <h5 class="text-xl font-DanaMedium pr-4 dark:text-white">همه کامنت ها</h5>
          </div>
          <!-- Comments Topbar -->
          <div class="w-full bg-primary rounded-lg flex flex-col lg:flex-row items-center overflow-hidden mt-5">
            <div class="flex flex-col xs:flex-row xs:h-20 lg:h-15 items-center border-b lg:border-none border-white/50 w-full">
              <!-- comment id -->
              <div
                class="h-full w-full xs:w-15 xl:w-20 text-lg border-b xs:border-b-0 xs:border-l border-white/50 flex justify-center items-center shrink-0 py-2 xs:py-0">
                <span class="text-white"> ردیف </span>
              </div>
              <!-- Comment Body -->
              <div
                class="h-full w-full xs:w-auto basis-full text-lg border-b xs:border-b-0 xs:border-l border-white/50 flex justify-center items-center py-4 xs:py-0">
                <span class="text-white">متن کامنت</span>
              </div>
              <!-- Comment Creator -->
              <div class="h-full w-25 xl:w-40 text-lg xs:border-l border-white/50 flex justify-center items-center shrink-0 py-2 xs:py-0">
                <span class="text-white">نویسنده</span>
              </div>
            </div>
            <!-- Comment Actions -->
            <div
              class="h-full self-end lg:self-auto w-52 xl:w-60 flex justify-center items-center shrink-0 gap-x-4 lg:gap-x-2 xl:gap-x-4 p-4 lg:p-2 xl:p-2">
              <span class="text-white">اعمال</span>
            </div>
          </div>
          <!-- Comments Container -->
          <div class="comments__container mt-4 space-y-2">
            <!-- Load From JS -->
          </div>
        </div>
      </div>`;

    getAndShowComments();
  } else if (targetMenu == "create-course") {
    contentContainer.innerHTML = `
      <div class="content create-course">
        <form id="create-course-form" class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-5 xl:gap-x-8 gap-y-4 lg:gap-y-5">
          <!-- course name -->
          <input
            id="title"
            class="xs:col-span-2 lg:col-span-3 bg-white shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
            type="text"
            placeholder="نام دوره" />
          <!-- course description -->
          <textarea
            id="description"
            rows="8"
            class="xs:col-span-2 lg:col-span-3 w-full p-3 sm:p-5 outline-none text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all"
            id="text"
            name="text"
            placeholder="توضیحات دوره"></textarea>
          <!-- course price -->
          <input
            id="price"
            class="bg-white shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
            type="text"
            placeholder="قیمت دوره به تومان" />
          <!-- course category -->
          <select
            id="category"
            name=""
            id=""
            class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
            <option value="">دسته بندی مورد نظر...</option>
            <option value="frontend">فرانت اند</option>
            <option value="python">پایتون</option>
            <option value="security">امنیت</option>
            <option value="softskills">مهارت های نرم</option>
          </select>
          <!-- course status -->
          <select
            id="status"
            name=""
            id=""
            class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
            <option value="">وضعیت دوره...</option>
            <option value="presell">پیش فروش</option>
            <option value="completing">در حال تکمیل</option>
            <option value="completed">تکمیل شده</option>
          </select>
          <!-- course link -->
          <input
            id="short-name"
            class="bg-white shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
            type="text"
            placeholder="لینک دوره" />
          <!-- course teacher -->
          <select
            id="teacher"
            name=""
            id=""
            class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
            <option value="">مدرس دوره...</option>
            <option value="SaeidiRad">محمد امین سعیدی راد</option>
            <option value="ebadi">حمید رضا عبادی</option>
            <option value="barati">مهرشاد براتی</option>
            <option value="rezaDolati">رضا دولتی</option>
          </select>
          <!-- is Free -->
          <select
            id="teacher"
            name=""
            id=""
            class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
            <option value="false">دوره رایگان است؟</option>
            <option value="true">بله</option>
            <option value="false">خیر</option>
          </select>
          <!-- course cover -->
          <div id="image" class="flex justify-center items-center xl:pr-7 text-sm md:text-base">
            <label for="cover" class="custom-file-upload shrink-0 shadow-light dark:shadow-none"> انتخاب عکس دوره </label>
            <input id="cover" class="w-auto border-none" type="file" multiple />
          </div>
          <!-- Submit btn -->
          <div class="flex justify-end xs:col-span-2 lg:col-span-3 border-t border-gray-200 dark:border-gray-800">
            <button
              class="bg-primary hover:bg-green-500 text-white rounded-xl px-6 xs:px-7 py-2 xs:py-3 mt-5 mr-auto text-base xs:text-xl transition-colors"
              type="submit">
              ارسال
            </button>
          </div>
        </form>
      </div>
  `;
    preparationCreateCourse();
  }
};

export default changeContent;
