import { _changeClasses } from "./funcs/utils.js";

const $ = document;
const contentContainer = $.querySelector(".content");

const panelMobileMenuText = $.querySelectorAll(".panel-mobile-menu-text__item");

const contentsName = ["home", "courses", "tickets", "new-ticket", "user-details"];

const loadPanelContent = content => {
  if (!contentsName.includes(content)) {
    return false;
  } else if (content == "close-acc") {
    return false;
  } else {
    if (content == "home") {
      contentContainer.innerHTML = `
      <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">مرصاد حبیبی عزیز؛ خوش اومدی 🙌</p>
      <!-- Tags -->
      <div class="flex flex-wrap items-center justify-start gap-x-5 md:gap-x-8 gap-y-3 md:pt-8">
        <div
          class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-amber-400 dark:bg-yellow-400 rounded-2xl flex-grow md:flex-grow-0">
          <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg class="w-8 h-8 md:w-9 md:h-9">
              <use href="#cradit-card"></use>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs mb-1.5 md:mb-3">کش بک</span>
            <span class="text-sm md:text-lg font-DanaMedium">0 تومان</span>
          </div>
        </div>
        <div
          class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-sky-500 dark:bg-secondary rounded-2xl flex-grow md:flex-grow-0">
          <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg class="w-8 h-8 md:w-9 md:h-9">
              <use href="#rocket-launch"></use>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs mb-1.5 md:mb-3">دوره های من</span>
            <span class="text-sm md:text-lg font-DanaMedium">۱۷ دوره</span>
          </div>
        </div>
        <div
          class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-pink-500 dark:bg-rose-500 rounded-2xl flex-grow md:flex-grow-0">
          <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg class="w-8 h-8 md:w-9 md:h-9">
              <use href="#ticket"></use>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs mb-1.5 md:mb-3">مجموع تیکت ها</span>
            <span class="text-sm md:text-lg font-DanaMedium">4 تیکت</span>
          </div>
        </div>
        <div
          class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-primary rounded-2xl flex-grow md:flex-grow-0">
          <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg class="w-8 h-8 md:w-9 md:h-9">
              <use href="#currency-dollar"></use>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xs mb-1.5 md:mb-3">موجودی حساب</span>
            <span class="text-sm md:text-lg font-DanaMedium">0 تومان</span>
          </div>
        </div>
      </div>
      <!-- Last Seen - Tickets - Questions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-7 mt-10">
        <!-- Last Seen -->
        <div>
          <!-- Last Seen Header -->
          <div
            class="flex flex-wrap justify-between gap-x-2 bg-white dark:bg-gray-800 rounded-2xl px-3.5 py-2.5 md:p-5 mb-5">
            <span class="font-DanaMedium text-xl/10 dark:text-white">اخیرا مشاهده شده</span>
            <button
              type="button"
              class="flex items-center gap-x-1 py-1 px-3 rounded-xl text-sky-500 dark:text-secondary hover:bg-sky-500/10 dark:hover:bg-secondary/10 transition-colors mr-auto">
              <span>همه دوره های ثبت نام شده</span>
              <svg class="w-4 h-4">
                <use href="#arrow-small-left"></use>
              </svg>
            </button>
          </div>
          <!-- Last Seen Body -->
          <div class="grid grid-rows-1 grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
              <a class="block w-full rounded-2xl overflow-hidden">
                <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
              </a>
              <div class="px-5 py-2.5 flex-grow">
                <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
                <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex justify-between text-xs">
                    <span>میزان مشاهده</span>
                    <span>0%</span>
                  </div>
                  <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
                </div>
              </div>
            </div>
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
              <a class="block w-full rounded-2xl overflow-hidden">
                <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
              </a>
              <div class="px-5 py-2.5 flex-grow">
                <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
                <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex justify-between text-xs">
                    <span>میزان مشاهده</span>
                    <span>0%</span>
                  </div>
                  <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
                </div>
              </div>
            </div>
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
              <a class="block w-full rounded-2xl overflow-hidden">
                <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
              </a>
              <div class="px-5 py-2.5 flex-grow">
                <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
                <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex justify-between text-xs">
                    <span>میزان مشاهده</span>
                    <span>0%</span>
                  </div>
                  <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
                </div>
              </div>
            </div>
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
              <a class="block w-full rounded-2xl overflow-hidden">
                <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
              </a>
              <div class="px-5 py-2.5 flex-grow">
                <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
                <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex justify-between text-xs">
                    <span>میزان مشاهده</span>
                    <span>0%</span>
                  </div>
                  <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- tickets and questions -->
        <div class="space-y-7">
          <!-- tickets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl px-3.5 md:px-5 pb-5 pt-1">
            <!-- tickets header -->
            <div
              class="flex flex-wrap justify-between gap-x-2 py-2.5 md:py-3 mb-5 border-b border-gray-200 dark:border-gray-700">
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
            <div>
              <div
                class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/my-account/view_ticket?id=8529"
                  class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >استوری آقای سعیدی راد در مورد next js</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/09/05</span>
                  <span
                    class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                    >بسته شده</span
                  >
                </div>
              </div>
              <div
                class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/my-account/view_ticket?id=8529"
                  class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >استوری آقای سعیدی راد در مورد next js</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/09/05</span>
                  <span
                    class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                    >بسته شده</span
                  >
                </div>
              </div>
              <div
                class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/my-account/view_ticket?id=8529"
                  class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >استوری آقای سعیدی راد در مورد next js</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/09/05</span>
                  <span
                    class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                    >بسته شده</span
                  >
                </div>
              </div>
              <div
                class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/my-account/view_ticket?id=8529"
                  class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >استوری آقای سعیدی راد در مورد next js</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/09/05</span>
                  <span
                    class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                    >بسته شده</span
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- Questions -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl px-3.5 md:px-5 pb-5 pt-1">
            <!-- Questions header -->
            <div
              class="flex flex-wrap justify-between gap-x-2 py-2.5 md:py-3 mb-5 border-b border-gray-200 dark:border-gray-700">
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
            <div>
              <div
                class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/lesson/34-24560/#q-3267"
                  class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >پروژه های تخصصی با جاوا اسکریپت برای بازار کار - نمایش دوره‌ها بر اساس دسته بندی</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/08/15</span>
                  <span
                    class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                    >بسته شده</span
                  >
                </div>
              </div>
              <div
                class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/lesson/34-24560/#q-3267"
                  class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >پروژه های تخصصی با جاوا اسکریپت برای بازار کار - نمایش دوره‌ها بر اساس دسته بندی</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/08/15</span>
                  <span
                    class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                    >بسته شده</span
                  >
                </div>
              </div>
              <div
                class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/lesson/34-24560/#q-3267"
                  class="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate"
                  >پروژه های تخصصی با جاوا اسکریپت برای بازار کار - نمایش دوره‌ها بر اساس دسته بندی</a
                >
                <div class="flex items-center gap-3">
                  <span class="text-xs text-slate-500 dark:text-slate-400">1402/08/15</span>
                  <span
                    class="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded"
                    >بسته شده</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    } else if (content == "courses") {
      contentContainer.innerHTML = `
        <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">مرصاد حبیبی عزیز؛ خوش اومدی 🙌</p>
        <!-- Tags -->
        <div class="flex flex-wrap items-center justify-start gap-x-5 md:gap-x-8 gap-y-3 md:pt-8">
          <div
            class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-amber-400 dark:bg-yellow-400 rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#cradit-card"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">دوره های ثبت نام شده</span>
              <span class="text-sm md:text-lg font-DanaMedium">17 دوره</span>
            </div>
          </div>
          <div
            class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-sky-500 dark:bg-secondary rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#currency-dollar"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">دوره های نقدی</span>
              <span class="text-sm md:text-lg font-DanaMedium">4 دوره</span>
            </div>
          </div>
          <div
            class="flex items-center gap-x-4 md:w-60 text-white p-2 pl-5 md:pl-2 bg-primary rounded-2xl flex-grow md:flex-grow-0">
            <div class="flex items-center justify-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
              <svg class="w-8 h-8 md:w-9 md:h-9">
                <use href="#rocket-launch"></use>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xs mb-1.5 md:mb-3">دوره های رایگان</span>
              <span class="text-sm md:text-lg font-DanaMedium">13 دوره</span>
            </div>
          </div>
        </div>
        <!-- Courses -->
        <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
            <a class="block w-full rounded-2xl overflow-hidden">
              <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
            </a>
            <div class="px-5 py-2.5 flex-grow">
              <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
              <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between text-xs">
                  <span>میزان مشاهده</span>
                  <span>0%</span>
                </div>
                <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
            <a class="block w-full rounded-2xl overflow-hidden">
              <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
            </a>
            <div class="px-5 py-2.5 flex-grow">
              <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
              <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between text-xs">
                  <span>میزان مشاهده</span>
                  <span>0%</span>
                </div>
                <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
            <a class="block w-full rounded-2xl overflow-hidden">
              <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
            </a>
            <div class="px-5 py-2.5 flex-grow">
              <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
              <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between text-xs">
                  <span>میزان مشاهده</span>
                  <span>0%</span>
                </div>
                <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
            <a class="block w-full rounded-2xl overflow-hidden">
              <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
            </a>
            <div class="px-5 py-2.5 flex-grow">
              <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
              <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between text-xs">
                  <span>میزان مشاهده</span>
                  <span>0%</span>
                </div>
                <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
            <a class="block w-full rounded-2xl overflow-hidden">
              <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
            </a>
            <div class="px-5 py-2.5 flex-grow">
              <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
              <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between text-xs">
                  <span>میزان مشاهده</span>
                  <span>0%</span>
                </div>
                <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
            <a class="block w-full rounded-2xl overflow-hidden">
              <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
            </a>
            <div class="px-5 py-2.5 flex-grow">
              <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
              <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between text-xs">
                  <span>میزان مشاهده</span>
                  <span>0%</span>
                </div>
                <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-light dark:shadow-none dark:border dark:border-gray-700 dark:text-white">
            <a class="block w-full rounded-2xl overflow-hidden">
              <img src="images/course-1.webp" class="h-full w-full object-cover" alt="" />
            </a>
            <div class="px-5 py-2.5 flex-grow">
              <a href="#" class="font-DanaMedium line-clamp-2">آموزش حرفه ای طراحی قالب با Html Css FlexBox از صفر</a>
              <div class="flex flex-col pb-1 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-between text-xs">
                  <span>میزان مشاهده</span>
                  <span>0%</span>
                </div>
                <progress value="20" max="100" class="h-1 w-full mt-2 dark:bg-gray-700"></progress>
              </div>
            </div>
          </div>
        </div>
        `;
    } else if (content == "tickets") {
      contentContainer.innerHTML = `
      <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">مرصاد حبیبی عزیز؛ خوش اومدی 🙌</p>
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
        <a
          href="./panel.html?content=new-ticket"
          class="flex items-center gap-x-3 w-full xs:w-auto bg-sky-500 dark:bg-secondary text-white rounded-2xl p-4 md:p-6 font-DanaDemiBold text-lg md:text-xl">
          <svg class="w-8 h-8">
            <use href="#plus-circle"></use>
          </svg>
          <span>تیکت جدید</span>
        </a>
      </div>
      <!-- tickets -->
      <div class="bg-white dark:bg-gray-800 p-3.5 md:p-4.5 rounded-2xl mt-10">
        <div
          class="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
          <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">تیکت ها</span>
        </div>
        <div>
          <div
            class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
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
          </div>
          <div
            class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
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
          </div>
          <div
            class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
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
          </div>
          <div
            class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
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
          </div>
          <div
            class="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
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
          </div>
        </div>
      </div>
      `;
    } else if (content == "new-ticket") {
      contentContainer.innerHTML = `
      <p class="md:hidden font-DanaDemiBold mb-5 dark:text-white">مرصاد حبیبی عزیز؛ خوش اومدی 🙌</p>
                  <!-- New Ticket -->
                  <div class="bg-white dark:bg-gray-800 p-3.5 md:p-5 rounded-2xl mt-10 md:mt-15">
                    <!-- New Ticket Header -->
                    <div
                      class="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
                      <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">ارسال تیکت</span>
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
    } else if (content == "user-details") {
      contentContainer.innerHTML = `
        
      <p class="md:hidden font-DanaDemiBold font mb-5 dark:text-white">مرصاد حبیبی عزیز؛ خوش اومدی 🙌</p>
      <!-- User Details -->
      <div class="user-details grid grid-cols-1 xl:grid-cols-3 gap-10 md:mt-15">
        <div class="xl:col-span-2 bg-white dark:bg-gray-800 p-5 rounded-2xl">
          <div class="pb-5 border-b border-b-gray-200 dark:border-b-slate-500">
            <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">جزییات حساب کاربری</span>
          </div>
          <form id="edit-account-info" class="p-3.5 pt-8">
            <div class="relative mb-11">
              <img src="images/user-profile.png" class="w-32 md:w-44 h-32 md:h-44 rounded-full" />
              <a
                href="https://gravatar.com/"
                target="_blank"
                title="برای تغییر پروفایل وارد وبسایت Gravatar.com شوید."
                class="absolute bottom-0 right-0 flex items-center justify-center w-10 md:w-14 h-10 md:h-14 rounded-full bg-sky-600 dark:bg-secondary dark:hover:bg-blue-600 border-2 md:border-4 border-white dark:border-gray-800 cursor-pointer transition-colors">
                <svg class="w-5 md:w-6 h-5 md:h-6 text-white">
                  <use href="#arrow-path-rounded-square-mini"></use>
                </svg>
              </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
              <div>
                <label for="phone" class="font-DanaDemiBold text-zinc-700 dark:text-white">شماره موبایل</label>
                <input
                  type="text"
                  id="phone"
                  class="text-ltr mt-3.5 md:mt-4 bg-gray-200 cursor-not-allowed"
                  value="09148906005"
                  disabled="" />
              </div>
              <div class="hidden md:block"></div>
              <div>
                <label for="first_name" class="font-DanaDemiBold text-zinc-700 dark:text-white">نام</label>
                <input type="text" class="mt-3.5 md:mt-4" id="first_name" name="first_name" required="" value="مرصاد" />
              </div>
              <div>
                <label for="last_name" class="font-DanaDemiBold text-zinc-700 dark:text-white">نام خانوادگی</label>
                <input type="text" class="mt-3.5 md:mt-4" id="last_name" name="last_name" value="حبیبی" />
              </div>
              <div>
                <label for="username" class="font-DanaDemiBold text-zinc-700 dark:text-white">نام کاربری</label>
                <input
                  type="text"
                  class="mt-3.5 md:mt-4 bg-gray-200 cursor-not-allowed"
                  disabled=""
                  id="username"
                  value="Darcy" />
              </div>
              <div>
                <label for="email" class="font-DanaDemiBold text-zinc-700 dark:text-white">ایمیل</label>
                <input
                  type="email"
                  class="mt-3.5 md:mt-4"
                  id="email"
                  name="email"
                  required=""
                  value="mersad.up@gmail.com" />
              </div>
            </div>
            <input type="hidden" name="nonce" value="8c6668f0dc" />
            <button
              type="submit"
              class="flex justify-center items-center bg-primary text-white h-14 p-7 text-xl rounded-xl mr-auto w-full md:w-auto mt-10">
              ثبت اطلاعات
            </button>
          </form>
        </div>
        <div class="xl:col-span-1 bg-white dark:bg-gray-800 p-5 rounded-2xl">
          <div class="pb-5 border-b border-b-gray-200 dark:border-b-slate-500">
            <span class="font-DanaMedium md:text-xl text-zinc-700 dark:text-white">تغییر رمز عبور</span>
          </div>
          <form id="edit-account-password" class="p-3.5 pt-8">
            <div class="space-y-5 md:space-y-6">
              <div>
                <label for="old_pass" class="font-DanaDemiBold text-zinc-700 dark:text-white">رمز عبور فعلی</label>
                <input
                  type="password"
                  id="old_pass"
                  name="old_pass"
                  required=""
                  class="mt-3.5 md:mt-4 mb-3"
                  placeholder="رمز فعلی را وارد کنید" />
                <a href="https://sabzlearn.ir/login/lost-password" class="text-slate-500 dark:text-slate-400 text-sm"
                  >رمز عبور را فراموش کرده اید؟</a
                >
              </div>
              <div>
                <label for="new_pass" class="font-DanaDemiBold text-zinc-700 dark:text-white">رمز عبور جدید</label>
                <input
                  type="password"
                  class="mt-3.5 md:mt-4"
                  id="new_pass"
                  name="new_pass"
                  required=""
                  placeholder="رمز جدید را وارد کنید" />
              </div>
            </div>
            <input type="hidden" name="nonce" value="0f25f8f35f" />
            <button
              type="submit"
              class="flex justify-center items-center bg-primary text-white h-14 p-7 text-xl rounded-xl mr-auto w-full md:w-auto mt-10">
              تغییر رمز
            </button>
          </form>
        </div>
      </div>
      `;
    }

    panelMobileMenuText.forEach(e => {
      _changeClasses("remove", e, ["!block"]);
    });
    content = content == "new-ticket" ? "tickets" : content;
    const panelMobileMenuTextActive = $.querySelector(`.panel-mobile-menu-text__item#${content}`);
    console.log(panelMobileMenuTextActive);
    _changeClasses("add", panelMobileMenuTextActive, ["!block"]);
  }
};

export { loadPanelContent };
