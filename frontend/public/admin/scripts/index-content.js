const changeContent = (contentName) => {
  const contentContainer = document.querySelector(".content");
  if (contentName == "tickets") {
    contentContainer.insertAdjacentHTML(
      "beforeend",
      `
    `
    );
  } else if (contentName == "comments") {
    contentContainer.insertAdjacentHTML(
      "beforeend",
      `
    `
    );
  } else if (contentName == "accounts") {
    contentContainer.insertAdjacentHTML(
      "beforeend",
      `
    `
    );
  } else if (contentName == "create-course") {
    contentContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-5 xl:gap-x-8 gap-y-4 lg:gap-y-5">
        <!-- course name -->
        <input
          class="xs:col-span-2 lg:col-span-3 bg-white shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
          type="text"
          placeholder="نام دوره" />
        <!-- course description -->
        <textarea
          rows="8"
          class="xs:col-span-2 lg:col-span-3 w-full p-3 sm:p-5 outline-none text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all"
          id="text"
          name="text"
          required=""
          placeholder="توضیحات دوره"></textarea>
        <!-- course price -->
        <input
          class="bg-white shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
          type="text"
          placeholder="قیمت دوره به تومان" />
        <!-- course category -->
        <select
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
          name=""
          id=""
          class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
          <option value="">وضعیت دوره...</option>
          <option value="presell">پیش فروش</option>
          <option value="incomplete">در حال تکمیل</option>
          <option value="complete">تکمیل شده</option>
        </select>
        <!-- course link -->
        <input
          class="bg-white shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
          type="text"
          placeholder="لینک دوره" />
        <!-- course status -->
        <select
          name=""
          id=""
          class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
          <option value="">مدرس دوره...</option>
          <option value="presell">محمد امین سعیدی راد</option>
          <option value="incomplete">حمید رضا عبادی</option>
          <option value="complete">مهرشاد براتی</option>
        </select>
        <!-- course cover -->
        <div
          class="flex justify-center items-center xl:pr-7 text-sm md:text-base">
          <label
            for="file-upload"
            class="custom-file-upload shrink-0 shadow-light dark:shadow-none">
            انتخاب عکس دوره
          </label>
          <input id="file-upload" class="w-auto border-none" type="file" />
        </div>
        <!-- Submit btn -->
        <div
          class="flex justify-end xs:col-span-2 lg:col-span-3 border-t border-gray-200 dark:border-gray-800">
          <button
            class="bg-primary hover:bg-green-500 text-white rounded-xl px-6 xs:px-7 py-2 xs:py-3 mt-5 mr-auto text-base xs:text-xl transition-colors"
            type="submit">
            ارسال
          </button>
        </div>
      </div>
    `
    );
  } else if (contentName == "edit-course") {
    contentContainer.insertAdjacentHTML(
      "beforeend",
      `
    `
    );
  }
};

export default changeContent;
