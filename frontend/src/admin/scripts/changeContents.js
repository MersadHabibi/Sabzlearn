import preparationCreateCourse from "./createCourse";
import getAndShowComments, { setEventForCommentDeleteBtn } from "./getAndShowComments";
import getAndShowCourses from "./getAndShowCourses";
import preparationAccounts from "./preparationAccounts";
import preparationEditDescription from "./preparationEditDescription";
import preparationTopics from "./preparationTopics";

const changeContent = async (targetMenu, courseId) => {
  const contentContainer = document.querySelector(".content-container");
  contentContainer.innerHTML = "";

  console.log(targetMenu);

  if (targetMenu == "tickets") {
  } else if (targetMenu == "comments") {
    contentContainer.innerHTML = `
      <div class="content comments">
        <div class="w-full pb-5 bg-white dark:bg-gray-800 shadow-light rounded-xl px-5">
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
            <div class="loader mx-auto mt-5"></div>
            <!-- Load From JS -->
          </div>
        </div>
      </div>

`;

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
            placeholder="کلمات کلیدی(برای جستجو بهتر)" />
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
            id="isFree"
            name=""
            class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
            <option value="false">دوره رایگان است؟</option>
            <option value="true">بله</option>
            <option value="false">خیر</option>
          </select>
          <!-- course cover -->
          <div id="image" class="flex justify-center items-center xl:pr-7 text-sm md:text-base">
            <label for="cover" class="custom-file-upload shrink-0 shadow-light dark:shadow-none"> انتخاب عکس دوره </label>
            <input id="cover" class="w-auto border-none" type="file" />
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
          id="select-course"
          name=""
          class="w-full px-3 sm:px-5 h-12 sm:h-14 text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-slate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all outline-none">
          <option value=""> در حال جستوجو دوره ها </option>
        </select>
        <!-- Body -->
        <div class="w-full pb-5 text-zinc-700 dark:text-white bg-white shadow-light dar:shadow-none dark:bg-gray-700 rounded-xl mt-5 md:mt-10">
          <div id="course-topic-cover" class="text-center pt-5 text-xl"> دوره را انتخاب کنید </div>
          <div id="course-topic-container" class="hidden">
            <!-- head -->
            <div class="border-b border-gray-200 dark:border-slate flex flex-col xs:flex-row justify-between xs:items-center gap-y-2 px-5 xs:px-7 py-3">
              <div>
                <h5 class="text-lg xs:text-xl font-DanaMedium dark:text-white">سر فصل های دوره</h5>
              </div>
              <div class="self-end xs:self-auto">
                <button
                  id="add-topic-btn"
                  class="flex items-center justify-center gap-x-1 h-10 md:h-11 rounded-lg bg-primary hover:bg-green-500 cursor-pointer pr-3 pl-4 text-white transition-colors">
                  <svg class="w-6 md:w-6 h-6 md:h-6">
                    <use href="#plus"></use>
                  </svg>
                  <span class="text-sm font-DanaMedium"> افزودن سر فصل </span>
                </button>
              </div>
            </div>
            <!-- topics -->
            <div id="topics__container" class="mt-8 px-5 space-y-3">
              <!-- Load From JS -->
            </div>
          </div>
        </div>
        <!-- Modals -->
        <!-- view episodes modal -->
        <div id="view-episodes-modal" class="fixed inset-0 w-11/12 h-5/6 bg-white dark:bg-gray m-auto       rounded-lg z-30 flex flex-col overflow-hidden transition-all">
          <!-- head -->
          <div class="border-b border-gray-200 dark:border-slate flex justify-between items-center px-8 py-4 shrink-0">
            <div>
              <h5 class="title sm:text-xl font-DanaMedium dark:text-white">فصل اول - مباحث TailwindCss</h5>
            </div>
            <!-- Close Btn -->
            <div>
              <div
                class="close-modal flex items-center justify-center gap-x-1 h-10 md:h-11 w-10 md:w-11 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white transition-colors">
                <svg class="w-6 md:w-8 h-6 md:h-8 rotate-45">
                  <use href="#plus"></use>
                </svg>
              </div>
            </div>
          </div>
          <!-- body -->
          <div id="episodes__container" class="py-5 px-5 space-y-3 overflow-auto basis-full">
            <!-- Load from JS -->
          </div>
        </div>
        <!-- add topic modal -->
        <form id="add-topic-modal" class="fixed inset-0 w-11/12 sm:w-1/2 lg:w-2/5 xl:w-1/3 h-fit bg-white dark:bg-gray m-auto rounded-lg z-30 flex flex-col overflow-hidden transition-all">
          <!-- head -->
          <div class="border-b border-gray-200 dark:border-slate flex justify-between items-center px-5 py-4 shrink-0">
            <div>
              <h5 class="sm:text-xl font-DanaMedium dark:text-white">افزودن سر فصل</h5>
            </div>
            <!-- Close Btn -->
            <div>
              <div
                class="close-modal flex items-center justify-center gap-x-1 h-10 md:h-11 w-10 md:w-11 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white transition-colors">
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
              type="submit"
              class="flex items-center justify-center gap-x-2 h-14 rounded-lg bg-primary hover:bg-green-500 cursor-pointer pr-3 pl-4 text-white transition-colors w-full">
              <svg class="w-6 md:w-7 h-6 md:h-7">
                <use href="#plus"></use>
              </svg>
              <span class="font-DanaMedium text-lg mt-0.5"> افزودن </span>
            </button>
          </div>
        </form>
        <!-- add episode modal -->
        <form id="add-episode-modal" class="fixed inset-0 w-11/12 sm:w-1/2 lg:w-5/12 h-fit bg-white dark:bg-gray m-auto rounded-lg z-30 flex flex-col overflow-hidden transition-all">
          <!-- head -->
          <div class="border-b border-gray-200 dark:border-slate flex justify-between items-center px-5 py-4 shrink-0">
            <div>
              <h5 class="sm:text-xl font-DanaMedium dark:text-white">افزودن قسمت جدید</h5>
            </div>
            <!-- Close Btn -->
            <div>
              <div 
                class="close-modal flex items-center justify-center gap-x-1 h-10 md:h-11 w-10 md:w-11 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white transition-colors">
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
              placeholder="نام قسمت جدید" />
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
            <div id="file" class="flex justify-start items-center text-sm md:text-base py-3">
              <label for="fileInput" class="custom-file-upload shrink-0 shadow-light dark:shadow-none"> انتخاب ویدیو دوره </label>
              <input id="fileInput" class="w-auto border-none" type="file" multiple />
            </div>
          </div>
          <!-- footer -->
          <div class="flex justify-end p-5">
            <button
              type="submit"
              id="add-episode-modal-submit"
              class="flex items-center justify-center gap-x-2 h-14 rounded-lg bg-primary hover:bg-green-500 cursor-pointer pr-3 pl-4 text-white transition-colors w-full">
              <svg class="w-6 md:w-7 h-6 md:h-7">
                <use href="#plus"></use>
              </svg>
              <span class="font-DanaMedium text-lg mt-0.5"> افزودن </span>
            </button>
          </div>
        </form>
      </div>
  `;

    await preparationTopics(courseId);
  } else if (targetMenu == "courses") {
    contentContainer.innerHTML = `
      <div class="content courses">
        <div
          class="courses__container grid grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-5 w-full bg-white dark:bg-gray-800 shadow-light rounded-xl p-5">
          <div class="loader mx-auto my-2 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-3 xxl:col-span-4"></div>
        </div>
        <!-- Delete Course Modal -->
        <div id="delete-course-modal" class="fixed bg-white dark:bg-gray inset-0 m-auto w-[95%] sm:w-[500px] h-fit rounded-md z-30">
          <div class="pt-5 pb-3 px-4">
            <p class="dark:text-white text-xl font-DanaMedium mb-2">آیا از حذف کردن دوره ... مطمعن هستید؟</p>
            <span class="flex items-center gap-x-1 text-red-600 font-DanaMedium">
              <svg class="size-5 mb-1">
                <use href="#exclamation-circle"></use>
              </svg>
              این عمل غیر قابل بازگشت است
            </span>
          </div>
          <div class="flex justify-end gap-x-2 p-2 border-t border-gray-200 dark:border-gray-800">
            <button class="modal-cancel-delete-course-btn bg-gray-500 hover:bg-gray-600/75 text-white font-DanaMedium py-2 w-24 rounded-md transition">لغو</button>
            <button class="modal-delete-course-btn bg-red-500 hover:bg-red-600 text-white font-DanaMedium py-2 w-24 rounded-md transition">حذف</button>
          </div>
        </div>
      </div>
  `;

    getAndShowCourses();
  } else if (targetMenu == "description") {
    contentContainer.innerHTML = `
      <div class="content description w-full pb-5 bg-white dark:bg-gray-800 shadow-light rounded-xl px-5">
        <div class="flex justify-between items-center py-4 border-b border-gray-200 dark:border-slate mb-4">
          <p id="course-name" class="dark:text-white text-lg font-DanaMedium">اسم دوره‌ :</p>
          <button id="back-btn" class="size-9 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center transition-colors">
            <svg class="size-5">
              <use href="#arrow-uturn-left"></use>
            </svg>
          </button>
        </div>
        <div class="">
          <textarea name="content" id="editor" class=""> </textarea>
          <button
            id="submit"
            type="submit"
            class="w-full bg-primary hover:bg-green-500 text-md font-DanaMedium text-white py-2.5 transition mt-3 rounded-md shadow-light dark:shadow-none">
            ثبت توضیحات
          </button>
        </div>
      </div>
     `;

    preparationEditDescription(courseId);
  } else if (targetMenu == "accounts") {
    contentContainer.innerHTML = `
    <div class="content accounts">
      <div class="w-full pb-5 bg-white dark:bg-gray-800 shadow-light rounded-xl px-5">
        <!-- Title -->
        <div class="py-4 border-b border-gray-200 dark:border-slate">
          <h5 class="text-xl font-DanaMedium pr-4 dark:text-white">همه حساب ها</h5>
        </div>
        <!-- Accounts Container -->
        <div class="acconts__container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4 mt-4">
          <!-- <div class="loader mx-auto mt-5"></div> -->
          <div
            class="relative flex flex-col justify-center items-center bg-gray-100 dark:bg-gray rounded-xl p-4 border border-gray-300 dark:border-none overflow-hidden">
            <!-- Role -->
            <span class="absolute top-2 right-2 bg-secondary px-2 py-1 text-white rounded-lg text-xs"> ادمین </span>
            <!-- Profile & Username -->
            <div class="flex flex-col justify-center items-center gap-y-5 w-full border-b border-gray-200 dark:border-gray-700 py-4 shrink-0">
              <!-- Profile -->
              <div class="rounded-full overflow-hidden size-22 shadow-light">
                <img src="../../public/images/user-profile.png" alt="" />
              </div>
              <!-- Username -->
              <span class="font-DanaDemiBold text-xl/5 dark:text-white text-center"> Mersad habibi </span>
            </div>
            <!-- Firstname & Lastname & Email & Number -->
            <div class="dark:text-white w-full">
              <!-- Firstname & Lastname -->
              <div class="flex flex-col justify-center gap-y-2 w-full border-b border-gray-200 dark:border-gray-700 text-lg px-3 py-4">
                <p class="overflow-hidden whitespace-nowrap text-ellipsis">
                  <span class="font-DanaMedium"> نام: </span>
                  <span> مرصاد </span>
                </p>
                <p class="overflow-hidden whitespace-nowrap text-ellipsis">
                  <span class="font-DanaMedium"> نام خانوادگی: </span>
                  <span> حبیبی </span>
                </p>
              </div>
              <!-- Email & Number -->
              <div class="flex flex-col justify-center gap-y-2 w-full border-b border-gray-200 dark:border-gray-700 text-lg px-3 py-4">
                <p class="flex flex-col">
                  <span class="font-DanaMedium"> ایمیل: </span>
                  <span class="overflow-hidden whitespace-nowrap text-ellipsis"> mersad.up@gmail.com </span>
                </p>
                <p>
                  <span class="font-DanaMedium"> شماره: </span>
                  <span> ۰۹۱۴۸۹۰۶۰۰۵ </span>
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
        </div>
      </div>
    </div>
     `;

    preparationAccounts();
  }
};

export default changeContent;
