const $ = document;
const contentContainer = $.querySelector(".content");

const whichContent = "home";

if (whichContent == "home") {
  contentContainer.innerHTML = `
  <main class="bg-white dark:bg-gray-800 flex gap-x-10 w-full lg:p-7">
  <div class="w-full lg:container">
    <div class="flex gap-x-10">
      <aside
        class="panel-menu__container fixed -right-full top-0 bottom-0 lg:static shrink-0 px-7 py-5 md:py-0 md:px-0 md:pt-10 bg-white dark:bg-gray-800 z-20 md:-z-0 transition-all">
        <div class="flex items-center gap-x-7 mb-12">
          <div class="flex items-center gap-x-2">
            <img src="images/logo.webp" class="h-10 md:h-14" alt="logo" />
            <svg class="w-[86px] h-10 md:w-32 md:h-[57px] text-white dark:text-slate-600">
              <use href="#logo-type"></use>
            </svg>
          </div>
          <div class="mobile-aside__close md:hidden">
            <svg class="w-5 h-5 text-slate-500 dark:text-slate-400">
              <use href="#close"></use>
            </svg>
          </div>
        </div>
        <ul class="panel-menu flex flex-col gap-y-4 dark:text-white">
          <a href="#" class="panel-menu__item inline-flex items-center gap-x-2 px-3 py-2 rounded-lg active">
            <svg class="w-6 h-6">
              <use href="#home"></use>
            </svg>
            <span> پیشخوان </span>
          </a>
          <a href="#" class="panel-menu__item inline-flex items-center gap-x-2 px-3 py-2 rounded-lg">
            <svg class="w-6 h-6">
              <use href="#folder"></use>
            </svg>
            <span> دوره های من </span>
          </a>
          <a href="#" class="panel-menu__item inline-flex items-center gap-x-2 px-3 py-2 rounded-lg">
            <svg class="w-6 h-6">
              <use href="#chat-bubble"></use>
            </svg>
            <span> تیکت ها </span>
          </a>
          <a href="#" class="panel-menu__item inline-flex items-center gap-x-2 px-3 py-2 rounded-lg">
            <svg class="w-6 h-6">
              <use href="#user"></use>
            </svg>
            <span> جزئیات حساب </span>
          </a>
          <a href="#" class="panel-menu__item inline-flex items-center gap-x-2 px-3 py-2 rounded-lg">
            <svg class="w-6 h-6">
              <use href="#logout"></use>
            </svg>
            <span> خروج </span>
          </a>
        </ul>
      </aside>
      <section class="w-full bg-gray-100 dark:bg-gray lg:rounded-3xl md:p-10">
        <!-- Header -->
        <div
          class="flex justify-between bg-white dark:bg-transparent md:bg-transparent p-5 md:p-0 dark:border-b md:border-none border-b-gray-700 mb-5">
          <div class="flex items-center">
            <div class="moblie-aside__open flex md:hidden gap-x-1 font-DanaMedium dark:text-white">
              <svg class="w-5 h-5">
                <use href="#bars-3-bottom-right"></use>
              </svg>
              <span>پیشخوان</span>
            </div>
            <p class="font-DanaDemiBold text-2xl dark:text-white hidden md:inline-block">
              <span>مرصاد حبیبی</span> عزیز؛ خوش اومدی 🙌
            </p>
          </div>
          <div class="flex gap-x-3 md:gap-x-8">
            <!-- notif Btn -->
            <div
              class="search-btn flex items-center justify-center relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-gray-100 dark:bg-gray-800 md:bg-white md:dark:bg-gray-800 cursor-pointer">
              <svg class="w-6 md:w-7 h-6 md:h-7 text-slate-500">
                <use href="#bell"></use>
              </svg>
              <!-- notif Box -->
              <div
                class="search-box absolute top-[70px] -left-[115px] bg-white dark:bg-gray-800 w-80 md:w-96 rounded-2xl overflow-hidden transition-all z-20 py-5 px-5">
                <div
                  class="font-DanaMedium text-xl dark:text-white pb-3.5 mb-3.5 border-b border-gray-200 dark:border-slate-500">
                  <p>اعلان ها</p>
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-xl text-center p-3">
                  <p class="dark:text-white">اعلان جدیدی وجود ندارد.</p>
                </div>
              </div>
            </div>
            <!-- Change Theme -->
            <div
              class="toggle-theme change-theme-btn flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-gray-100 dark:bg-gray-800 md:bg-white md:dark:bg-gray-800 transition-all cursor-pointer">
              <svg class="inline-block dark:hidden w-6 md:w-7 h-6 md:h-7 text-slate-500">
                <use href="#moon"></use>
              </svg>
              <svg class="hidden dark:inline-block w-6 md:w-7 h-6 md:h-7 text-slate-500">
                <use href="#sun"></use>
              </svg>
            </div>
            <!-- Profile -->
            <div class="h-12 md:h-14 w-auto rounded-full cursor-pointer">
              <!-- Login & Register -->
              <div
                class="hidden relative flex items-center justify-between w-[155px] h-full text-white child:w-25 child:h-full child:flex child:items-center child:rounded-full">
                <a href="#" class="absolute pr-4 right-0 bg-sky-300 hover:bg-sky-400 block">ورود</a>
                <a href="#" class="absolute justify-center left-0 bg-sky-500 hover:bg-sky-600 block">عضویت</a>
              </div>
              <!-- Profile Photo -->
              <div class="profile relative h-full w-12 md:w-14">
                <div class="w-12 md:w-14 h-12 md:h-14 rounded-full overflow-hidden">
                  <img src="images/user-profile.png" alt="" />
                </div>
                <!-- SubMenu Profile -->
                <div
                  class="profile__menu absolute top-16 left-0 w-[278px] p-5 z-20 bg-white dark:bg-[#32334D] dark:text-white rounded-2xl">
                  <div class="flex items-center gap-3 mb-5">
                    <div class="w-14 h-14 rounded-full overflow-hidden">
                      <img src="images/user-profile.png" alt="" />
                    </div>
                    <div>
                      <p class="text-lg">مرصاد حبیبی</p>
                      <p class="font-DanaMedium text-sm text-sky-500">موجودی: 0 تومان</p>
                    </div>
                  </div>
                  <ul
                    class="py-2 border-y border-y-gray-200 dark:border-y-slate child:flex child:items-center child:gap-x-2 child:h-12 child:px-2 child:rounded-xl">
                    <a class="hover:bg-gray-100 dark:hover:bg-slate" href="#">
                      <svg class="w-5 h-5">
                        <use href="#home"></use>
                      </svg>
                      پیشخوان
                    </a>
                    <a class="hover:bg-gray-100 dark:hover:bg-slate" href="#">
                      <svg class="w-5 h-5">
                        <use href="#folder"></use>
                      </svg>
                      دوره های من
                    </a>
                    <a class="hover:bg-gray-100 dark:hover:bg-slate" href="#">
                      <svg class="w-5 h-5">
                        <use href="#chat-bubble"></use>
                      </svg>
                      تیکت های پشتیبانی
                    </a>
                  </ul>
                  <div class="pt-2 child:flex child:items-center child:gap-x-2 child:h-12 child:px-2 child:rounded-xl">
                    <a class="hover:bg-gray-100 dark:hover:bg-slate" href="#">
                      <svg class="w-5 h-5">
                        <use href="#logout"></use>
                      </svg>
                      خروج
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Body -->
        <div class="p-5 pt-0 md:p-0">
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
        </div>
      </section>
    </div>
  </div>
</main>

    
`;
}
