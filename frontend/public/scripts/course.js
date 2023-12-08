import { BackendApi, _changeClasses, createTimer, getCourses } from "./funcs/utils.js";

const $ = document;

// Load Course

const getAndShowCourse = async () => {
  const targetCourseQuery = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  }).courseName;

  const courses = await getCourses();

  const targetCourse = courses.filter((e) => {
    return e.shortName == targetCourseQuery;
  })[0];

  console.log(targetCourse);

  const courseContainer = $.querySelector(".course__container");

  courseContainer.insertAdjacentHTML(
    "beforeend",
    `
  <!-- breadCrumb -->
  <div class="breadcrumb">
    <a href="./index.html" class="breadcrumb__item">
      <svg class="w-6 h-6">
        <use href="#home"></use>
      </svg>
    </a>
    <a href="./categories.html" class="breadcrumb__item"> دوره ها </a>
    <a href="./categories.html?value=${targetCourse.categoryID.name}" class="breadcrumb__item"> ${
      targetCourse.categoryID.name == "frontend"
        ? "فرانت اند"
        : targetCourse.categoryID.name == "backend"
        ? "بک اند"
        : targetCourse.categoryID.name == "security"
        ? "امنیت"
        : targetCourse.categoryID.name == "softskills"
        ? "مهارت های نرم"
        : ""
    } </a>
    <a href="./course.html?courseName=${targetCourse.shortName}" class="breadcrumb__item"> ${targetCourse.name} </a>
  </div>
  <!-- Course Header -->
  <section
    class="flex flex-col-reverse lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 lg:items-stretch lg:gap-x-5 xl:gap-x-10 my-5 sm:my-10 p-3.5 sm:p-0 bg-white dark:bg-gray-800 sm:bg-transparent sm:dark:bg-transparent rounded-2xl">
    <!-- Header Right -->
    <div class="flex flex-col justify-center xl:justify-between w-full">
      <!-- header right top -->
      <div>
        <h1 class="course__name font-MorabbaBold text-2xl sm:text-3xl dark:text-white"> ${targetCourse.name} </h1>
        <p
          class="course__description text-lg sm:text-xl text-zinc-700/80 dark:text-white/90 mt-6 xl:mt-8 line-clamp-4 lg:line-clamp-2 xl:line-clamp-3"> ${
            targetCourse.description
          } </p>
      </div>
      <!-- header right bottom -->
      <div class="mt-5 pt-5 sm:pt-0 xl:mt-0 border-t border-t-gray-100 dark:border-gray-700 sm:border-t-0">
        <!-- Offer -->
        ${
          targetCourse.discount && targetCourse.price
            ? `
          <div
            class="offer flex flex-col sm:flex-row items-center justify-between gap-y-3 sm:gap-y-0 w-full sm:bg-white sm:dark:bg-gray-700 sm:shadow-light h-[50px] rounded-xl sm:px-5 mb-11 sm:mb-0">
            <span class="text-primary font-MorabbaBold text-xl"
              ><span class="offer__percent ml-1">${targetCourse.discount}%</span> پیشنهاد شگفت انگیز</span
            >
            <div
              class="flex items-center justify-center sm:justify-start gap-x-2 text-sm text-slate-500 dark:text-slate-400 w-full sm:w-auto bg-gray-100 dark:bg-gray-700 sm:bg-transparent sm:dark:bg-transparent rounded-lg sm:rounded-none pb-1 pt-1.5 sm:py-0">
              <p><span class="offer__day text-2xl font-DanaDemiBold text-zinc-700 dark:text-white">0</span> روز</p>
              <p><span class="offer__hur text-2xl font-DanaDemiBold text-zinc-700 dark:text-white">0</span> ساعت</p>
              <p><span class="offer__min text-2xl font-DanaDemiBold text-zinc-700 dark:text-white">0</span> دقیقه</p>
              <p><span class="offer__sec text-primary text-2xl font-DanaDemiBold">0</span> ثانیه</p>
            </div>
          </div>
        `
            : targetCourse.discount && !targetCourse.price
            ? `
            <div
              class="offer flex flex-col sm:flex-row items-center justify-between gap-y-3 sm:gap-y-0 w-full sm:bg-white sm:dark:bg-gray-700 sm:shadow-light h-[50px] rounded-xl sm:px-5 mb-11 sm:mb-0">
              <span class="text-primary font-MorabbaBold text-xl"
                ><span class="offer__percent ml-1">100%</span> پیشنهاد شگفت انگیز</span
              >
              <div
                class="flex items-center justify-center sm:justify-start gap-x-2 text-sm text-slate-500 dark:text-slate-400 w-full sm:w-auto bg-gray-100 dark:bg-gray-700 sm:bg-transparent sm:dark:bg-transparent rounded-lg sm:rounded-none pb-1 pt-1.5 sm:py-0">
                <p><span class="offer__day text-2xl font-DanaDemiBold text-zinc-700 dark:text-white">0</span> روز</p>
                <p><span class="offer__hur text-2xl font-DanaDemiBold text-zinc-700 dark:text-white">0</span> ساعت</p>
                <p><span class="offer__min text-2xl font-DanaDemiBold text-zinc-700 dark:text-white">0</span> دقیقه</p>
                <p><span class="offer__sec text-primary text-2xl font-DanaDemiBold">0</span> ثانیه</p>
              </div>
            </div>
          `
            : ""
        }
        

        <!-- Price and Buy Btn -->
        <div class="flex flex-col-reverse sm:flex-row items-center justify-between mt-6 sm:mt-3.5">
          <a
            href="#"
            class="flex items-center justify-center sm:justify-start gap-x-2 h-[62px] w-full sm:w-auto px-5 rounded-xl bg-primary hover:bg-green-500 text-white font-DanaDemiBold text-2xl transition-colors">
            <svg class="w-[25px] h-[30px]">
              <use href="#shield-done"></use>
            </svg>
            <span> شرکت در دوره </span>
          </a>
          <!-- Course Price -->
          <div class="course__price mb-5 sm:m-0">
          ${
            !targetCourse.price
              ? ` 
              <div class="flex items-center gap-x-2">
                <span class="font-DanaDemiBold mt-2 text-3xl dark:text-white"> رایگان! </span>
              </div>
              `
              : targetCourse.price && targetCourse.discount
              ? `
              <div class="flex items-center gap-x-2">
                <span
                  class="relative block text-slate-500 dark:text-slate-400 text-2xl -mb-1 pt-1.5 before:content-[''] before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-slate-500 dark:before:bg-slate-400"
                  >${targetCourse.price + (targetCourse.price / 100) * targetCourse.discount}</span
                >
                <span class="flex items-center gap-x-1 font-DanaDemiBold mt-1 text-3xl dark:text-white">
                  <span class="mt-2">  ${targetCourse.price} </span>
                  <svg class="w-6 h-6">
                    <use href="#toman"></use>
                  </svg>
                </span>
              </div>
              `
              : `
              <div class="flex gap-x-1 items-center font-DanaDemiBold dark:text-white">
                <span class="text-3xl mt-1">${targetCourse.price}</span>
                <svg class="w-6 h-6">
                  <use href="#toman"></use>
                </svg>
              </div>
        `
          }
          </div>
        </div>
      </div>
    </div>
    <!-- Header Left - Banner -->
    <div
      class="shrink-0 mb-3 sm:mb-6 lg:mb-0 w-full h-auto md:w-10/12 lg:w-[440px] lg:h-[270px] xl:w-[610px] xl:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden">
      <img src="images/${targetCourse.cover}" class="course__cover w-full h-full object-cover" alt="" />
    </div>
  </section>
  <!-- Course Main -->
  <section class="flex gap-5 items-start">
    <div class="space-y-5 w-full">
      <!-- Course Info -->
      <div class="grid grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
        <div
          class="flex flex-col md:flex-row items-center justify-center md:justify-start shadow-light dark:shadow-none text-center md:text-right gap-y-2 gap-x-4 bg-white dark:bg-gray-800 py-4 px-5 w-full rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
            <path
              d="M9.628,34C3.869,34,0,29.959,0,23.943V10.057C0,4.041,3.869,0,9.628,0h14.74C30.129,0,34,4.041,34,10.057V23.943C34,29.959,30.128,34,24.364,34ZM2.551,10.057V23.943c0,4.561,2.779,7.508,7.078,7.508H24.364c4.305,0,7.087-2.947,7.087-7.508V10.057c0-4.559-2.78-7.506-7.082-7.506H9.628C5.329,2.551,2.551,5.5,2.551,10.057ZM15.715,23.8V17a1.275,1.275,0,0,1,2.551,0v6.8a1.275,1.275,0,0,1-2.551,0Zm-.425-13.255a1.693,1.693,0,0,1,1.692-1.7H17a1.7,1.7,0,1,1-1.709,1.7Z"
              fill="#2ed573"></path>
          </svg>
          <div class="flex flex-col">
            <span class="text-lg/10 font-DanaDemiBold dark:text-white">وضعیت دوره</span>
            <span class="course__status text-xs text-slate-500 dark:text-slate-400"> ${
              targetCourse.status == "presell"
                ? "پیش فروش"
                : targetCourse.status == "start" && targetCourse.isComplete
                ? "تکمیل شده"
                : "در حال برگزاری"
            } </span>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row items-center justify-center md:justify-start shadow-light dark:shadow-none text-center md:text-right gap-y-2 gap-x-4 bg-white dark:bg-gray-800 py-4 px-5 w-full rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" style="">
            <path
              d="M9.63,34C3.869,34,0,29.959,0,23.943V10.057C0,4.041,3.869,0,9.63,0H24.369C30.129,0,34,4.041,34,10.057V23.943C34,29.959,30.129,34,24.367,34ZM2.551,10.057V23.943c0,4.561,2.779,7.508,7.079,7.508H24.367c4.3,0,7.084-2.947,7.084-7.508V10.057c0-4.559-2.78-7.506-7.082-7.506H9.63C5.329,2.551,2.551,5.5,2.551,10.057ZM22.11,21.527l-5.765-3.439a1.283,1.283,0,0,1-.621-1.1V9.578a1.275,1.275,0,1,1,2.549,0v6.691l5.145,3.065a1.276,1.276,0,0,1-.655,2.372A1.3,1.3,0,0,1,22.11,21.527Z"
              fill="#2ed573"></path>
          </svg>
          <div class="flex flex-col">
            <span class="text-lg/10 font-DanaDemiBold dark:text-white">مدت زمان دوره</span>
            <span class="course__time text-xs text-slate-500 dark:text-slate-400">0 ساعت</span>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row items-center justify-center md:justify-start shadow-light dark:shadow-none text-center md:text-right gap-y-2 gap-x-4 bg-white dark:bg-gray-800 py-4 px-5 w-full rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.891" height="35.833" viewBox="0 0 30.891 35.833">
            <path
              d="M8.745,35.833C3.35,35.833,0,32.335,0,26.7V11.622c0-5.237,2.989-8.6,7.866-8.958V1.25a1.19,1.19,0,1,1,2.377,0V2.633h10.42V1.25a1.189,1.189,0,1,1,2.375,0V2.664A8.319,8.319,0,0,1,28.632,5.1a9.239,9.239,0,0,1,2.258,6.53v15.2c0,5.553-3.352,9-8.747,9ZM2.377,26.7c0,4.275,2.261,6.63,6.369,6.63h13.4c4.107,0,6.37-2.31,6.37-6.5V14.841H2.377ZM28.514,12.34v-.718A6.641,6.641,0,0,0,26.95,6.864a5.976,5.976,0,0,0-3.912-1.693V6.735a1.189,1.189,0,1,1-2.375,0v-1.6H10.242v1.6a1.19,1.19,0,1,1-2.377,0V5.171c-3.549.313-5.489,2.575-5.489,6.451v.718ZM21.3,26.577a1.214,1.214,0,0,1,1.18-1.249H22.5A1.251,1.251,0,1,1,21.3,26.577Zm-7.029,0a1.214,1.214,0,0,1,1.18-1.249h.014a1.251,1.251,0,1,1-1.195,1.249Zm-7.046,0a1.215,1.215,0,0,1,1.182-1.249h.014a1.251,1.251,0,1,1-1.2,1.249ZM21.3,20.1a1.215,1.215,0,0,1,1.18-1.251H22.5A1.252,1.252,0,1,1,21.3,20.1Zm-7.029,0a1.215,1.215,0,0,1,1.18-1.251h.014A1.252,1.252,0,1,1,14.273,20.1Zm-7.046,0a1.217,1.217,0,0,1,1.182-1.251h.014a1.251,1.251,0,1,1-1.2,1.251Z"
              fill="#2ed573"></path>
          </svg>
          <div class="flex flex-col">
            <span class="text-lg/10 font-DanaDemiBold dark:text-white">آخرین بروزرسانی</span>
            <span class="course__update text-xs text-slate-500 dark:text-slate-400">${new Date(
              targetCourse.updatedAt
            ).getDay()} / ${new Date(targetCourse.updatedAt).getMonth()} / ${new Date(
      targetCourse.updatedAt
    ).getFullYear()} </span>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row items-center justify-center md:justify-start shadow-light dark:shadow-none text-center md:text-right gap-y-2 gap-x-4 bg-white dark:bg-gray-800 py-4 px-5 w-full rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
            <path
              d="M0,27.688c0-6.355,9.724-6.355,12.92-6.355,5.546,0,12.918.655,12.918,6.32C25.838,34,16.115,34,12.92,34,9.387,34,0,34,0,27.688Zm2.553,0c0,2.412,3.487,3.635,10.367,3.635s10.365-1.236,10.365-3.671c0-2.418-3.487-3.643-10.365-3.643C8.191,24.01,2.553,24.647,2.553,27.688ZM29.26,28.5A1.358,1.358,0,0,1,30,26.779c1.446-.575,1.446-1.277,1.446-1.575,0-1.012-1.143-1.705-3.394-2.055a1.334,1.334,0,0,1-1.075-1.522A1.306,1.306,0,0,1,28.43,20.5c4.605.723,5.57,2.958,5.57,4.7,0,1.3-.536,3.06-3.094,4.075a1.218,1.218,0,0,1-.453.088A1.28,1.28,0,0,1,29.26,28.5ZM12.92,18.322a8.968,8.968,0,0,1-8.74-9.16A8.969,8.969,0,0,1,12.92,0a8.967,8.967,0,0,1,8.737,9.162,9.279,9.279,0,0,1-2.53,6.461,8.445,8.445,0,0,1-6.151,2.7ZM6.733,9.162a6.347,6.347,0,0,0,6.187,6.484h.052a5.977,5.977,0,0,0,4.345-1.908,6.567,6.567,0,0,0,1.789-4.571,6.351,6.351,0,0,0-6.186-6.49A6.349,6.349,0,0,0,6.733,9.162ZM23.382,15.14a1.329,1.329,0,0,1,1.086-1.511,4.5,4.5,0,0,0,3.731-4.5,4.471,4.471,0,0,0-3.63-4.486,1.333,1.333,0,0,1-1.054-1.538,1.286,1.286,0,0,1,1.466-1.1A7.1,7.1,0,0,1,30.75,9.135a7.155,7.155,0,0,1-5.927,7.145,1.278,1.278,0,0,1-1.441-1.14Z"
              fill="#2ed573"></path>
          </svg>
          <div class="flex flex-col">
            <span class="text-lg/10 font-DanaDemiBold dark:text-white">روش پشتیبانی</span>
            <span class="course__support text-xs text-slate-500 dark:text-slate-400"> ${targetCourse.support} </span>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row items-center justify-center md:justify-start shadow-light dark:shadow-none text-center md:text-right gap-y-2 gap-x-4 bg-white dark:bg-gray-800 py-4 px-5 w-full rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
            <path
              d="M7.135,34A6.852,6.852,0,0,1,.367,27.643l-.323-4.32A1.289,1.289,0,0,1,1.22,21.935a1.3,1.3,0,0,1,1.37,1.192l.321,4.32a4.28,4.28,0,0,0,4.223,3.97h19.73a4.278,4.278,0,0,0,4.223-3.97l.323-4.32a1.307,1.307,0,0,1,1.369-1.192,1.289,1.289,0,0,1,1.176,1.387l-.323,4.32A6.854,6.854,0,0,1,26.865,34Zm8.589-8.721v-3.1A32.082,32.082,0,0,1,.631,18.046,1.3,1.3,0,0,1,0,16.933V10.991A6.52,6.52,0,0,1,6.48,4.444H9.812A5.066,5.066,0,0,1,14.806,0h4.389a5.066,5.066,0,0,1,4.993,4.444h3.349A6.521,6.521,0,0,1,34,11.008v5.925a1.3,1.3,0,0,1-.631,1.113,32.1,32.1,0,0,1-15.093,4.137v3.1a1.276,1.276,0,1,1-2.552,0ZM2.552,10.991v5.188A30.422,30.422,0,0,0,16.914,19.62l.086,0,.085,0a30.471,30.471,0,0,0,14.364-3.441V11.008a3.949,3.949,0,0,0-3.911-3.979H6.48A3.949,3.949,0,0,0,2.552,10.991Zm19.04-6.546a2.493,2.493,0,0,0-2.4-1.86H14.806a2.493,2.493,0,0,0-2.4,1.86Z"
              fill="#2ed573"></path>
          </svg>
          <div class="flex flex-col">
            <span class="text-lg/10 font-DanaDemiBold dark:text-white">پیش نیاز</span>
            <span class="course__requirements text-xs text-slate-500 dark:text-slate-400">CSS&JS</span>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row items-center justify-center md:justify-start shadow-light dark:shadow-none text-center md:text-right gap-y-2 gap-x-4 bg-white dark:bg-gray-800 py-4 px-5 w-full rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="35.475" height="27.774" viewBox="0 0 35.475 27.774">
            <path
              d="M7.057,27.774A7.191,7.191,0,0,1,.024,21.066C.018,20.99,0,20.788.007,7.564a7.254,7.254,0,0,1,1.8-5.108A7.047,7.047,0,0,1,6.846.008C6.907,0,7.529,0,8.693,0c2.011,0,5.245.006,7.842.011l2.241,0C18.941,0,19.11,0,19.277,0a7.237,7.237,0,0,1,7.1,6.742c0,.041.005.273.008.7L29.916,4.4a3.243,3.243,0,0,1,3.614-.464,3.57,3.57,0,0,1,1.945,3.238l-.02,13.166a3.568,3.568,0,0,1-1.948,3.233A3.247,3.247,0,0,1,29.9,23.1L26.39,20.07q0,.063,0,.126a7.337,7.337,0,0,1-1.805,5.129,7.042,7.042,0,0,1-5.042,2.438c-.058,0-.622.006-1.677.006-2.156,0-5.911-.01-8.653-.016l-1.611,0c-.189.015-.366.023-.541.023Zm4.492-2.7h.014c2.556,0,5.085.008,6.57.008.812,0,1.244,0,1.32,0A4.531,4.531,0,0,0,22.7,23.507a4.583,4.583,0,0,0,1.134-3.225c0-.019,0-.039,0-.06,0-3,0-12.844-.009-13.314a4.606,4.606,0,0,0-4.578-4.222c-.126,0-.254.006-.38.016l-2.636,0c-2.995,0-6.221-.01-7.977-.01-.742,0-1.231,0-1.313,0A4.545,4.545,0,0,0,3.689,4.27,4.607,4.607,0,0,0,2.559,7.5c0,8.566,0,13.071.014,13.389a4.583,4.583,0,0,0,4.561,4.189c.124,0,.25,0,.374-.015Zm19.965-4.051a.785.785,0,0,0,.9.114.863.863,0,0,0,.486-.8l.02-13.168a.869.869,0,0,0-.484-.806.8.8,0,0,0-.9.118l-5.146,4.43q0,2.234,0,5.685Z"
              fill="#2ed573"></path>
          </svg>
          <div class="flex flex-col">
            <span class="text-lg/10 font-DanaDemiBold dark:text-white">نوع مشاهده</span>
            <span class="course__view text-xs text-slate-500 dark:text-slate-400">بصورت آنلاین</span>
          </div>
        </div>
      </div>
      <!-- Side Top ( Mobile ) -->
      <div class="lg:hidden p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-light">
        <div class="flex gap-5">
          <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 py-4 px-5 w-full rounded-2xl">
            <svg class="w-8 h-8 text-primary">
              <use href="#users-fill"></use>
            </svg>
            <div class="flex flex-col">
              <span class="text-2xl/8 font-DanaDemiBold dark:text-white"> ${targetCourse.registers} </span>
              <span class="text-sm text-slate-500 dark:text-slate-400">دانشجو</span>
            </div>
          </div>
          <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 py-4 px-5 w-full rounded-2xl">
            <svg class="w-8 h-8 text-amber-400 dark:text-yellow-400">
              <use href="#star-fill"></use>
            </svg>
            <div class="flex flex-col">
              <span class="text-2xl/8 font-DanaDemiBold dark:text-white"> ${targetCourse.courseAverageScore}.0</span>
              <span class="text-sm text-slate-500 dark:text-slate-400">رضایت</span>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center text-xl dark:text-white mt-5 mb-4">
            <span class="">درصد تکمیل دوره</span>
            <span>${targetCourse.isComplete ? 100 : 0}%</span>
          </div>
          <progress value=${
            targetCourse.isComplete ? 100 : 0
          } max="100" class="w-full h-2.5 rounded-full overflow-hidden !bg-gray-200"></progress>
        </div>
      </div>
      <!-- Side Main ( Mobile ) -->
      <div
        class="lg:hidden bg-white dark:bg-gray-800 pt-5 pb-3.5 px-3.5 xs:px-5 shadow-light dark:shadow-none rounded-2xl mt-4">
        <div class="flex items-center justify-center gap-x-2.5 pb-5 border-b border-b-gray-100 dark:border-b-slate mb-3.5">
          <img
            class="block w-15 h-15 object-cover rounded-full"
            src="https://secure.gravatar.com/avatar/627b244a18ff36c0944ceab2e214211d?s=96&amp;d=mm&amp;r=g"
            alt="مهرشاد براتی" />
          <div>
            <h4 class="text-zinc-700 dark:text-white text-2xl mb-1 font-DanaDemiBold">مهرشاد براتی</h4>
            <p class="text-slate-500 dark:text-gray-500 text-sm mt-1.5">برنامه نویس و توسعه دهنده فول استک وب</p>
          </div>
        </div>
        <a
          href="https://sabzlearn.ir/teacher/mehrshad_b"
          class="flex items-center justify-center gap-x-1.5 text-slate-500 dark:text-gray-500 text-sm">
          <svg class="w-5 h-5">
            <use xlink:href="#logout"></use>
          </svg>
          مشاهده پروفایل
        </a>
      </div>
      <!-- Course Description -->
      <div class="course-description bg-white dark:bg-gray-800 shadow-light dark:shadow-none rounded-2xl py-7 px-5">
        <div class="flex justify-between items-center mb-5">
          <h3
            class="relative font-MorabbaBold text-2xl lg:text-3xl dark:text-white pr-6 before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:bg-amber-400 dark:before:bg-yellow-400 before:rounded-sm before:w-2.5 before:h-10 before:m-auto">
            توضیحات
          </h3>
        </div>
        <div
          class="course-description__content relative overflow-hidden text-lg/8 xl:text-xl/10 text-zinc-700/80 dark:text-white max-h-[800px] pt-5 transition-all">
              ${targetCourse.description}
              <br/>
              <br/>
              <br/>
              <br/>
          <!-- Overlay -->
          <div
            class="course-description__overlay absolute bottom-0 left-0 right-0 w-full h-[190px] bg-gradient-to-t from-white dark:from-gray-800"></div>
        </div>
        <button
          class="course-description__btn flex justify-center items-center gap-x-2 text-xl text-white rounded-full bg-primary hover:bg-green-500 px-7 h-14 mx-auto mt-10 transition-colors">
          <span class="course-description__btn-dont-show-text">مشاهده بیشتر</span>
          <span class="course-description__btn-show-text hidden">مشاهده کمتر</span>
          <svg class="w-5 h-5">
            <use href="#chevron-down"></use>
          </svg>
        </button>
      </div>
      <!-- Course Topics -->
      <div class="bg-white dark:bg-gray-800 shadow-light dark:shadow-none rounded-2xl py-7 px-5">
        <div class="flex justify-between items-center mb-5">
          <h3
            class="relative font-MorabbaBold text-2xl lg:text-3xl dark:text-white pr-6 before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:bg-sky-500 dark:before:bg-secondary before:rounded-sm before:w-2.5 before:h-10 before:m-auto">
            سرفصل های دوره
          </h3>
          <span class="mt-1 dark:text-white">06:06</span>
        </div>
        <div class="space-y-2.5">
          <!-- Topic -->
          <div class="course-topic rounded-xl overflow-hidden transition-all">
            <!-- Topic header -->
            <div
              class="topic__header flex justify-between items-center w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-slate dark:text-white h-12 md:h-[75px] px-5 transition-colors cursor-pointer">
              <h4 class="font-DanaMedium text-sm md:text-xl">فصل اول - مباحث TailwindCss</h4>
              <svg class="w-5 sm:w-6 h-5 sm:h-6 text-zinc-700 dark:text-white transition-transform">
                <use href="#chevron-down"></use>
              </svg>
            </div>
            <!-- Topic Body -->
            <div class="topic__body h-0 bg-gray-100 dark:bg-gray-700 divide-y dark:divide-slate transition-all">
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="course-topic rounded-xl overflow-hidden transition-all">
            <!-- Topic header -->
            <div
              class="topic__header flex justify-between items-center w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-slate dark:text-white h-12 md:h-[75px] px-5 transition-colors cursor-pointer">
              <h4 class="font-DanaMedium text-sm md:text-xl">فصل اول - مباحث TailwindCss</h4>
              <svg class="w-5 sm:w-6 h-5 sm:h-6 text-zinc-700 dark:text-white transition-transform">
                <use href="#chevron-down"></use>
              </svg>
            </div>
            <!-- Topic Body -->
            <div class="topic__body h-0 bg-gray-100 dark:bg-gray-700 divide-y dark:divide-slate transition-all">
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="course-topic rounded-xl overflow-hidden transition-all">
            <!-- Topic header -->
            <div
              class="topic__header flex justify-between items-center w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-slate dark:text-white h-12 md:h-[75px] px-5 transition-colors cursor-pointer">
              <h4 class="font-DanaMedium text-sm md:text-xl">فصل اول - مباحث TailwindCss</h4>
              <svg class="w-5 sm:w-6 h-5 sm:h-6 text-zinc-700 dark:text-white transition-transform">
                <use href="#chevron-down"></use>
              </svg>
            </div>
            <!-- Topic Body -->
            <div class="topic__body h-0 bg-gray-100 dark:bg-gray-700 divide-y dark:divide-slate transition-all">
              <div
                class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                <a
                  href="https://sabzlearn.ir/lesson/48-23816"
                  class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                  <span
                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                    >1</span
                  >
                  <h4
                    class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                    معرفی دوره + نگاه کلی به پروژه دوره
                  </h4>
                </a>
                <div class="flex items-center w-full justify-between">
                  <span
                    class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                    >جلسه رایگان</span
                  >
                  <div class="flex items-center gap-x-1.5 md:gap-x-2">
                    <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> 20:27 </span>
                    <svg
                      class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                      <use xlink:href="#play-circle"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Course Comments -->
      <div class="course-comments bg-white dark:bg-gray-800 shadow-light dark:shadow-none rounded-2xl py-7 px-5">
        <!-- Comments Header -->
        <div class="flex justify-between items-center mb-5">
          <h3
            class="relative font-MorabbaBold text-2xl lg:text-3xl dark:text-white pr-6 before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:bg-pink-500 dark:before:bg-rose-500 before:rounded-sm before:w-2.5 before:h-10 before:m-auto">
            نظرات
          </h3>
          <button
            class="open-new-comment-btn bg-primary hover:bg-green-500 h-10 rounded-xl text-white px-[18px]"
            type="button">
            ایجاد نظر جدید
          </button>
        </div>
        <!-- New Comment -->
        <div class="new-comment-form hidden mb-5">
          <div class="flex gap-x-2 mb-3">
            <img class="block w-10 h-10 md:w-14 md:h-14 object-cover rounded-full shrink-0" src="images/user-profile.png" />
            <div class="flex flex-col">
              <span class="text-zinc-700 dark:text-white font-danaMedium text-base md:text-xl">Darcy</span>
              <span class="comment-to text-slate-500 dark:text-gray-500 text-sm">ثبت نظر جدید</span>
            </div>
          </div>
          <textarea
            rows="6"
            id="comment-textarea"
            class="block w-full p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-gray-200 dark:focus:border-slate rounded-2xl placeholder:font-danaLight transition-colors"
            placeholder="نظر خود را بنویسید ..."></textarea>
          <div class="flex gap-x-2 justify-end mt-2.5">
            <button
              class="cancel-new-comment bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-slate dark:text-white h-10 px-[18px] rounded-xl transition-colors">
              لغو
            </button>
            <button
              class="bg-sky-500 hover:bg-sky-600 dark:bg-secondary dark:hover:bg-sky-700 text-white h-10 px-[18px] rounded-xl transition-colors"
              id="comment-submit-btn">
              ثبت
            </button>
          </div>
        </div>
        <!-- Comments Container -->
        <div class="comments__container space-y-5">
          
        </div>
        <!-- More Btn -->
        <button
          class="flex justify-center items-center gap-x-2 text-xl text-zinc-700 dark:text-white rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-slate px-7 h-14 mx-auto mt-7 transition-colors">
          <span>مشاهده بیشتر</span>
          <svg class="w-5 h-5">
            <use href="#chevron-down"></use>
          </svg>
        </button>
      </div>
    </div>
    <!-- Aside -->
    <aside class="hidden lg:block sticky top-5 w-80 xl:w-96 shrink-0 space-y-5">
      <!-- Side Top -->
      <div class="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-light">
        <div class="flex gap-5">
          <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 py-4 px-5 w-full rounded-2xl">
            <svg class="w-8 h-8 text-primary">
              <use href="#users-fill"></use>
            </svg>
            <div class="flex flex-col">
              <span class="course__registers text-2xl/8 font-DanaDemiBold dark:text-white"> ${targetCourse.registers} </span>
              <span class="text-sm text-slate-500 dark:text-slate-400">دانشجو</span>
            </div>
          </div>
          <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 py-4 px-5 w-full rounded-2xl">
            <svg class="w-8 h-8 text-amber-400 dark:text-yellow-400">
              <use href="#star-fill"></use>
            </svg>
            <div class="flex flex-col">
              <span class="course__star text-2xl/8 font-DanaDemiBold dark:text-white"> ${
                targetCourse.courseAverageScore
              }.0 </span>
              <span class="text-sm text-slate-500 dark:text-slate-400">رضایت</span>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center text-xl dark:text-white mt-5 mb-4">
            <span class="">درصد تکمیل دوره</span>
            <span class="course__complete-percent">${targetCourse.discount ? "100%" : "0%"}</span>
          </div>
          <progress
            value=${targetCourse.discount ? 100 : 0}
            max="100"
            class="course__complete-prog w-full h-2.5 rounded-full overflow-hidden !bg-gray-200"></progress>
        </div>
      </div>
      <!-- Side Main -->
      <div class="flex flex-col items-center text-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-light">
        <div class="rounded-full w-[90px] h-[90px] overflow-hidden mb-1.5">
          <img src="images/user-profile.png" class="" alt="" />
        </div>
        <h4 class="course__creator text-2xl dark:text-white"></h4>
        <a href="#" class="flex items-center gap-x-1 text-sm text-slate-500 dark:text-slate-400 mb-1.5 mt-1">
          <span> ${targetCourse.creator} </span>
          <svg class="w-5 h-5">
            <use href="#logout"></use>
          </svg>
        </a>
        <p class="text-zinc-700/80 dark:text-white">
          مهرشاد براتی هستم برنامه نویس و توسعه دهنده فول استک وب و دانشجوی ارشد رشته کامپیوتر گرایش نرم افزار
        </p>
      </div>
      <!-- Side Footer -->
      <div class="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-light overflow-hidden">
        <span
          class="relative font-DanaDemiBold text-2xl pr-5 dark:text-white before:content-[''] before:absolute before:bg-sky-500 dark:before:bg-secondary before:w-8 before:h-2 before:rounded-sm before:top-0 before:bottom-0 before:right-4 before:my-auto"
          >لینک کوتاه:</span
        >
        <div
          class="flex justify-between gap-x-2 h-[65px] px-4 mt-4 text-slate-500 dark:text-slate-400 bg-gray-100 dark:bg-gray-700 border border-dashed rounded-xl border-gray-600/30 dark:border-gray-600/80">
          <svg class="copy-link-btn w-6 h-6 my-auto cursor-pointer">
            <use href="#clipboard-document"></use>
          </svg>
          <span class="truncate text-xl leading-[65px] mt-0.5" dir="ltr">https://sabzlearn.ir/?p=3018</span>
        </div>
      </div>
    </aside>
  </section>
  `
  );

  // Create Timer

  const offerDay = $.querySelector(".offer__day");
  const offerHur = $.querySelector(".offer__hur");
  const offerMin = $.querySelector(".offer__min");
  const offerSec = $.querySelector(".offer__sec");
  if (targetCourse.discount) createTimer(offerDay, offerHur, offerMin, offerSec, "0:24:0:0", false);

  await getAndShowComments(targetCourse);

  console.log(targetCourse.categoryID.name);
};

// Get Reply Comments

const getAndShowReplyComments = (answerContent) => {
  return `
  <div class="mt-7 space-y-3.5 md:space-y-5">
    <div id="comment-47416" class="mt-7 p-3.5 md:p-5 bg-gray-200 dark:bg-slate rounded-2xl">
      <div class="flex gap-x-5 items-start">
        <!-- Comment Right User Picture & flag (desktop version) -->
        <div class="hidden md:flex flex-col shrink-0 gap-y-2">
          <img
            class="block w-10 h-10 md:w-15 md:h-15 object-cover rounded-full"
            src="https://secure.gravatar.com/avatar/213e0cf344b8c216b7048477622c195a?s=96&amp;d=mm&amp;r=g" />
            ${
              !answerContent.creator.role == "ADMIN"
                ? `
                <div
                class="text-xs w-full rounded-md text-white dark:text-primary text-center py-0.5 bg-primary dark:bg-primary/10">
                دانشجو
              </div>
            `
                : `
            <div
              class="text-xs w-full rounded-md text-white dark:text-sky-500 text-center py-0.5 bg-sky-500 dark:bg-sky-500/10">
              مدیریت
            </div>
                `
            }
        </div>
        <!-- Comment Left Text, author, data, flag, reply btn -->
        <div class="w-full">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-2">
              <img
                class="block md:hidden w-10 h-10 object-cover rounded-full shrink-0"
                src="https://secure.gravatar.com/avatar/213e0cf344b8c216b7048477622c195a?s=96&amp;d=mm&amp;r=g" />
              <div class="shrink-0">
                <span class="text-zinc-700 dark:text-white font-danaMedium text-base md:text-xl"
                  > ${answerContent.creator.name} </span
                >
                <div class="flex items-center gap-x-1.5 mt-1">
                ${
                  !answerContent.creator.role == "ADMIN"
                    ? `
                <div
                  class="md:hidden text-xs w-full px-3 rounded-md text-white dark:text-primary text-center py-0.5 bg-primary dark:bg-primary/10">
                  دانشجو
                </div> 
                `
                    : `
                <div
                  class="md:hidden text-xs w-full px-3 rounded-md text-white dark:text-sky-500 text-center py-0.5 bg-sky-500 dark:bg-sky-500/10">
                  مدیریت
                </div>
                    `
                }
                  <span class="font-danaLight text-slate-500 dark:text-white text-xs">1402/09/04</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Comment Text -->
          <div class="text-zinc-700 dark:text-white font-danaLight leading-7 mt-3.5">
            ${answerContent.body}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};
// Get Comments

const getAndShowComments = async (targetCourse) => {
  const commentsContainer = $.querySelector(".comments__container");

  const res = await fetch(`${BackendApi}/comments`);
  const comments = await res.json();

  const targetComments = comments.filter((e) => {
    return e.course == targetCourse.name;
  });

  targetComments.forEach((comment) => {
    console.log(comment);
    commentsContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="p-3.5 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl">
        <!-- Comment Body -->
        <div class="flex gap-x-5 items-start">
          <!-- Comment Right User Picture & flag (desktop version) -->
          <div class="hidden md:flex flex-col gap-y-2 shrink-0">
            <img class="block w-10 h-10 md:w-15 md:h-15 object-cover rounded-full" src="images/user-profile.png" />
            ${
              !comment.creator.role == "ADMIN"
                ? `
                <div
                class="text-xs w-full rounded-md text-white dark:text-primary text-center py-0.5 bg-primary dark:bg-primary/10">
                دانشجو
              </div>
            `
                : `
            <div
              class="text-xs w-full rounded-md text-white dark:text-sky-500 text-center py-0.5 bg-sky-500 dark:bg-sky-500/10">
              مدیریت
            </div>
                `
            }
          </div>
          <!-- Comment Left Reply comment, text, author, data, flag, reply btn -->
          <div class="w-full">
            <!-- Comment Head -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-2">
                <img
                  class="block md:hidden w-10 h-10 object-cover rounded-full shrink-0"
                  src="https://secure.gravatar.com/avatar/0370e6d965555e9194c47fdb9be67d76?s=96&amp;d=mm&amp;r=g" />
                <div class="shrink-0">
                  <span class="text-zinc-700 dark:text-white font-danaMedium text-base md:text-xl"> ${
                    comment.creator.name
                  } </span>
                  <div class="flex items-center gap-x-1.5 mt-1">
                  ${
                    !comment.creator.role == "ADMIN"
                      ? `
                  <div
                    class="md:hidden text-xs w-full px-3 rounded-md text-white dark:text-primary text-center py-0.5 bg-primary dark:bg-primary/10">
                    دانشجو
                  </div> 
                  `
                      : `
                  <div
                    class="md:hidden text-xs w-full px-3 rounded-md text-white dark:text-sky-500 text-center py-0.5 bg-sky-500 dark:bg-sky-500/10">
                    مدیریت
                  </div>
                      `
                  }
                    
                    <span class="font-danaLight text-slate-500 dark:text-white text-xs">1402/09/04</span>
                  </div>
                </div>
              </div>
              <button class="comment-reply-btn w-6 h-5 text-slate-500 dark:text-gray-500" type="button">
                <svg class="w-6 h-5">
                  <use xlink:href="#reply"></use>
                </svg>
              </button>
            </div>
            <!-- Comment Text -->
            <div class="text-zinc-700 dark:text-white font-danaLight leading-7 mt-3.5">
              ${comment.body} <br />
              <br />
            </div>
            <!-- Comment Replies -->
            ${comment.answerContent ? getAndShowReplyComments(comment.answerContent) : ""}
          </div>
        </div>
      </div>
    `
    );
  });
};

window.addEventListener("load", async () => {
  await getAndShowCourse();

  // Description Elements

  const courseDescription = $.querySelector(".course-description");
  const courseDescriptionBtn = $.querySelector(".course-description__btn");

  // Copy Link Element

  const copyLinkBtn = $.querySelector(".copy-link-btn");

  // Topics Elements

  const topicsHeader = $.querySelectorAll(".topic__header");

  // New Comment Elements

  const courseComments = $.querySelector(".course-comments");
  const openNewCommentBtn = $.querySelector(".open-new-comment-btn");
  const cancelNewCommentBtn = $.querySelector(".cancel-new-comment");
  const replayCommentBtn = $.querySelectorAll(".comment-reply-btn");
  const commentTo = $.querySelector(".comment-to");

  // Course Description - show & hide

  courseDescriptionBtn.addEventListener("click", () => {
    _changeClasses("toggle", courseDescription, ["show"]);
  });

  // Copy Link Btn

  copyLinkBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(copyLinkBtn.nextElementSibling.innerText);
  });

  // Course Topic - open & close

  topicsHeader.forEach((topicHeader) => {
    topicHeader.addEventListener("click", () => {
      _changeClasses("toggle", topicHeader.parentElement, ["open"]);
    });
  });

  // New Comment - open

  openNewCommentBtn.addEventListener("click", () => {
    _changeClasses("add", courseComments, ["show-new-comment-form"]);
    commentTo.innerText = `ثبت نظر جدید`;
  });

  // New Comment - close

  cancelNewCommentBtn.addEventListener("click", () => {
    _changeClasses("remove", courseComments, ["show-new-comment-form"]);
  });

  // Replay Comment - open

  replayCommentBtn.forEach((replayBtn) => {
    replayBtn.addEventListener("click", () => {
      let commentToName =
        replayBtn.parentElement.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText;
      commentTo.innerText = `در پاسخ به ${commentToName}`;
      _changeClasses("add", courseComments, ["show-new-comment-form"]);
    });
  });
});
