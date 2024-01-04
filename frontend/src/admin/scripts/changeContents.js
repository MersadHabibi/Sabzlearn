import preparationCreateCourse from "./createCourse";
import getAndShowComments, { setEventForCommentDeleteBtn } from "./getAndShowComments";

const changeContent = async targetMenu => {
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
              class="h-full self-end lg:self-auto w-36 xl:w-40 flex justify-center items-center shrink-0 gap-x-4 lg:gap-x-2 xl:gap-x-4 p-4 lg:p-2 xl:p-2">
              <span class="text-white">اعمال</span>
            </div>
          </div>
          <!-- Comments Container -->
          <div class="comments__container mt-4 space-y-2">
            <!-- Load From JS -->
          </div>
        </div>
      </div>`;

    await getAndShowComments();
    setEventForCommentDeleteBtn();
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
  } else if (targetMenu == "topics") {
    contentContainer.innerHTML = `
      <div class="content topics">
        <!-- Select Course -->
        <select
          id="category"
          name=""
          id=""
          class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
          <option value="">انتخاب دوره ...</option>
          <option value="frontend">فرانت اند</option>
          <option value="python">پایتون</option>
          <option value="security">امنیت</option>
          <option value="softskills">مهارت های نرم</option>
        </select>
        <!-- Body -->
        <div class="w-full h-96 text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl mt-5 md:mt-10">
          <div>
            <!-- head -->
            <div class="border-b border-gray-200 dark:border-slate flex flex-col xs:flex-row justify-between xs:items-center gap-y-2 px-5 xs:px-7 py-3">
              <div>
                <h5 class="text-lg xs:text-xl font-DanaMedium dark:text-white">سر فصل های دوره</h5>
              </div>
              <div class="self-end xs:self-auto">
                <button
                  class="flex items-center justify-center gap-x-1 h-10 md:h-11 rounded-lg bg-primary hover:bg-green-500 cursor-pointer pr-3 pl-4 text-white transition-colors">
                  <svg class="w-6 md:w-6 h-6 md:h-6">
                    <use href="#plus"></use>
                  </svg>
                  <span class="text-sm font-DanaMedium"> افزودن سر فصل </span>
                </button>
              </div>
            </div>
            <!-- topics -->
            <div class="mt-8 px-5 space-y-5">
              <div
                class="topic flex flex-col lg:flex-row justify-between lg:items-center gap-y-3 gap-x-1 w-full bg-gray-100 shadow-light dark:shadow-none dark:bg-gray dark:text-white px-5 py-4 rounded-lg">
                <!-- topic right -->
                <h4 class="font-DanaMedium text-lg md:text-xl">فصل اول - مباحث TailwindCss</h4>

                <!-- topic left -->
                <div class="flex flex-col xs:flex-row gap-2 shrink-0 self-end lg:self-auto w-full xs:w-auto">
                  <button
                    class="bg-primary text-white w-full xs:w-auto flex justify-center items-center gap-x-1 px-4 py-2 rounded-md hover:bg-green-500 transition-colors">
                    <svg class="w-6 h-6">
                      <use href="#eye"></use>
                    </svg>
                    <span class="text-sm"> دیدن قسمت ها </span>
                  </button>
                  <button
                    class="bg-secondary text-white w-full xs:w-auto flex justify-center items-center gap-x-1 px-4 py-2 rounded-md hover:bg-sky-600 transition-colors">
                    <svg class="w-6 h-6">
                      <use href="#plus"></use>
                    </svg>
                    <span class="text-sm"> افزودن قسمت </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modals -->
        <!-- view episodes modal -->
        <div class="hidden fixed inset-0 w-11/12 h-5/6 bg-white dark:bg-gray m-auto rounded-lg z-30 flex flex-col overflow-hidden">
          <!-- head -->
          <div class="border-b border-gray-200 dark:border-slate flex justify-between items-center px-8 py-4 shrink-0">
            <div>
              <h5 class="sm:text-xl font-DanaMedium dark:text-white">فصل اول - مباحث TailwindCss</h5>
            </div>
            <!-- Close Btn -->
            <div>
              <div
                class="flex items-center justify-center gap-x-1 h-10 md:h-11 w-10 md:w-11 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white transition-colors">
                <svg class="w-6 md:w-8 h-6 md:h-8 rotate-45">
                  <use href="#plus"></use>
                </svg>
              </div>
            </div>
          </div>
          <!-- body -->
          <div class="py-5 px-5 space-y-3 overflow-auto basis-full">
            <div
              class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
              <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                <span
                  class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                  >1</span
                >
                <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                  معرفی دوره + نگاه کلی به پروژه دوره
                </h4>
              </a>
              <div class="flex items-center w-full justify-between">
                <span
                  class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                  >جلسه رایگان</span
                >
                <div class="flex items-center gap-x-1 md:gap-x-1.5">
                  <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                  <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                    <use xlink:href="#play-circle"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
              <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                <span
                  class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                  >1</span
                >
                <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                  معرفی دوره + نگاه کلی به پروژه دوره
                </h4>
              </a>
              <div class="flex items-center w-full justify-between">
                <span
                  class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                  >جلسه رایگان</span
                >
                <div class="flex items-center gap-x-1 md:gap-x-1.5">
                  <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                  <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                    <use xlink:href="#play-circle"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
              <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                <span
                  class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                  >1</span
                >
                <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                  معرفی دوره + نگاه کلی به پروژه دوره
                </h4>
              </a>
              <div class="flex items-center w-full justify-between">
                <span
                  class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                  >جلسه رایگان</span
                >
                <div class="flex items-center gap-x-1 md:gap-x-1.5">
                  <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                  <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                    <use xlink:href="#play-circle"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
              <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                <span
                  class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                  >1</span
                >
                <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                  معرفی دوره + نگاه کلی به پروژه دوره
                </h4>
              </a>
              <div class="flex items-center w-full justify-between">
                <span
                  class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                  >جلسه رایگان</span
                >
                <div class="flex items-center gap-x-1 md:gap-x-1.5">
                  <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                  <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                    <use xlink:href="#play-circle"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
              <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                <span
                  class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                  >1</span
                >
                <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                  معرفی دوره + نگاه کلی به پروژه دوره
                </h4>
              </a>
              <div class="flex items-center w-full justify-between">
                <span
                  class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                  >جلسه رایگان</span
                >
                <div class="flex items-center gap-x-1 md:gap-x-1.5">
                  <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                  <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                    <use xlink:href="#play-circle"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
              <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                <span
                  class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                  >1</span
                >
                <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                  معرفی دوره + نگاه کلی به پروژه دوره
                </h4>
              </a>
              <div class="flex items-center w-full justify-between">
                <span
                  class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                  >جلسه رایگان</span
                >
                <div class="flex items-center gap-x-1 md:gap-x-1.5">
                  <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                  <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                    <use xlink:href="#play-circle"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 bg-gray-100 dark:bg-gray-700 py-2 md:py-4 px-3.5 md:px-5 rounded-lg group">
              <a href="" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                <span
                  class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                  >1</span
                >
                <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                  معرفی دوره + نگاه کلی به پروژه دوره
                </h4>
              </a>
              <div class="flex items-center w-full justify-between">
                <span
                  class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                  >جلسه رایگان</span
                >
                <div class="flex items-center gap-x-1 md:gap-x-1.5">
                  <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                  <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                    <use xlink:href="#play-circle"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- add topic modal -->
        <div
          class="hidden fixed inset-0 w-11/12 sm:w-1/2 lg:w-2/5 xl:w-1/3 h-fit bg-white dark:bg-gray m-auto rounded-lg z-30 flex flex-col overflow-hidden">
          <!-- head -->
          <div class="border-b border-gray-200 dark:border-slate flex justify-between items-center px-5 py-4 shrink-0">
            <div>
              <h5 class="sm:text-xl font-DanaMedium dark:text-white">افزودن سر فصل</h5>
            </div>
            <!-- Close Btn -->
            <div>
              <div
                class="flex items-center justify-center gap-x-1 h-10 md:h-11 w-10 md:w-11 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white transition-colors">
                <svg class="w-6 md:w-8 h-6 md:h-8 rotate-45">
                  <use href="#plus"></use>
                </svg>
              </div>
            </div>
          </div>
          <!-- body -->
          <div class="pt-5 px-5">
            <!-- topic name -->
            <input
              id="title"
              class="xs:col-span-2 lg:col-span-3 bg-gray-100 shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
              type="text"
              placeholder="نام سر فصل" />
          </div>
          <!-- footer -->
          <div class="flex justify-end p-5">
            <button
              class="flex items-center justify-center gap-x-2 h-14 rounded-lg bg-primary hover:bg-green-500 cursor-pointer pr-3 pl-4 text-white transition-colors w-full">
              <svg class="w-6 md:w-7 h-6 md:h-7">
                <use href="#plus"></use>
              </svg>
              <span class="font-DanaMedium text-lg mt-0.5"> افزودن </span>
            </button>
          </div>
        </div>
        <!-- add episode modal -->
        <div class="hidden fixed inset-0 w-11/12 sm:w-1/2 lg:w-5/12 h-fit bg-white dark:bg-gray m-auto rounded-lg z-30 flex flex-col overflow-hidden">
          <!-- head -->
          <div class="border-b border-gray-200 dark:border-slate flex justify-between items-center px-5 py-4 shrink-0">
            <div>
              <h5 class="sm:text-xl font-DanaMedium dark:text-white">افزودن قسمت جدید</h5>
            </div>
            <!-- Close Btn -->
            <div>
              <div
                class="flex items-center justify-center gap-x-1 h-10 md:h-11 w-10 md:w-11 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white transition-colors">
                <svg class="w-6 md:w-8 h-6 md:h-8 rotate-45">
                  <use href="#plus"></use>
                </svg>
              </div>
            </div>
          </div>
          <!-- body -->
          <div class="px-5 pt-5 space-y-4">
            <!-- episode name -->
            <input
              id="title"
              class="xs:col-span-2 lg:col-span-3 bg-gray-100 shadow-light dar:shadow-none dark:bg-gray-700 h-12 sm:h-14 px-3 sm:px-5 text-sm sm:text-xl"
              type="text"
              placeholder="نام سر فصل" />
            <!-- is Free -->
            <select
              id="is-free"
              name=""
              id=""
              class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
              <option value="">این قسمت رایگان است؟</option>
              <option value="false">خیر</option>
              <option value="true">بله</option>
            </select>
          </div>
          <!-- footer -->
          <div class="flex justify-end p-5">
            <button
              class="flex items-center justify-center gap-x-2 h-14 rounded-lg bg-primary hover:bg-green-500 cursor-pointer pr-3 pl-4 text-white transition-colors w-full">
              <svg class="w-6 md:w-7 h-6 md:h-7">
                <use href="#plus"></use>
              </svg>
              <span class="font-DanaMedium text-lg mt-0.5"> افزودن </span>
            </button>
          </div>
        </div>
      </div>
  `;
  }
};

export default changeContent;
