const $ = document;
const contentContainer = $.querySelector(".content");

const whichContent = "courses";

if (whichContent == "home") {
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
}
if (whichContent == "courses") {
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
}
