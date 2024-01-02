import { getToken, api, getMe } from "./utils.js";

// Redirect Login & Register

const redirectWhenHaveToken = async redirectLink => {
  const user = await getMe();
  if (user.status == 200) {
    location.href = redirectLink;
  }
};

// Get After Query String

const getAfterPageLink = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if (params.after) {
    return params.after;
  } else return "./index.html";
};

// Create Course Card

const createCourseCard = (
  course,
  props = {
    hasDescription: true,
    hasCategory: true,
    hasBorderOnLightMode: false,
    hasShadowOnLightMode: true,
    fixHeight: false,
  }
) => {
  return `
      <div data-course-id=${course.id} class="course-card flex flex-col bg-white dark:bg-gray-800 ${
    props.hasShadowOnLightMode ? "shadow-light" : ""
  }  dark:shadow-none ${props.hasBorderOnLightMode ? `border-gray-200/80 border` : "dark:border"} dark:border dark:border-gray-700 ${
    props.fixHeight ? "h-[417px]" : ""
  } overflow-hidden rounded-2xl">
        <!-- Course Head -->
        <a href=./course.html class="relative block h-42 w-full overflow-hidden">
        ${
          course.discount
            ? `
              <span class=" flex items-center justify-center w-12 h-6 absolute top-2 right-2 text-sm text-white bg-primary rounded-full">
                ${course.discount}%
              </span>
              `
            : ""
        }
          <img
            src=http://localhost:3000/${course.image}
            class="w-full h-full object-cover rounded-2xl"
            alt="" />
        </a>
        <!-- Course Body -->
        <div class="px-5 pt-2.5 ${props.hasCategory ? "pb-3.5" : ""} flex-grow">
        ${
          props.hasCategory
            ? `
          <div class="flex justify-start items-center gap-1">
            <a
              href="#"
              class="inline-flex items-center justify-center text-xs py-1 px-1.5 text-sky-500 dark:text-yellow-400 bg-sky-500/10 dark:bg-yellow-400/10 rounded"> ${
                course.category == "frontend"
                  ? "فرانت اند"
                  : course.category == "python"
                  ? "پایتون"
                  : course.category == "softskills"
                  ? "مهارت های نرم"
                  : course.category == "security"
                  ? "امنیت"
                  : "غیره..."
              } </a>
          </div>
        `
            : ""
        }
          <a href=./course.html class="font-DanaMedium dark:text-white text-lg line-clamp-2 ${props.hasDescription ? "my-2.5" : "my-1"} ">
            ${course.title}
          </a>
          ${
            props.hasDescription
              ? `
            <p
              class="line-clamp-2 font-light text-sm text-slate-500 dark:text-slate-400">
              ${course.description}
            </p>
          `
              : ""
          }
        </div>
        <!-- Course Footer -->
        <div class="px-5 pb-2">
          <!-- Course Info -->
          <div
            class="flex justify-between text-xs pb-3 border-b border-b-gray-100 dark:border-b-gray-700">
            <div class="flex gap-x-2 text-slate-500 dark:text-slate-400">
              <a
                href="#"
                class="flex items-center gap-x-1 hover:text-primary transition-colors">
                <svg class="w-4 h-4">
                  <use href="#user"></use>
                </svg>
                <span> ${
                  course.teacher == "SaeidiRad"
                    ? "محمد امین سعیدی راد"
                    : course.teacher == "barati"
                    ? "مهرشاد براتی"
                    : course.teacher == "ebadi"
                    ? "حمیدرضا عبادی"
                    : course.teacher == "rezaDolati"
                    ? "رضا دولتی"
                    : "غیره..."
                } </span>
              </a>
              <span class="flex items-center gap-x-1">
                <svg class="w-4 h-4">
                  <use href="#clock"></use>
                </svg>
                <span>00:00</span>
              </span>
            </div>
            <div class="flex items-center gap-x-1 text-amber-400">
              <span class="leading-[1px] mt-1">5.0</span>
              <svg class="w-4 h-4">
                <use href="#star"></use>
              </svg>
            </div>
          </div>
          <!-- Course Bottom -->
          <div class="flex justify-between items-end mt-1.5">
            <div class="dark:text-white flex gap-x-1 items-center">
              <svg class="w-5 h-5">
                <use href="#users"></use>
              </svg>
              <span> ${course.studentsCount} </span>
            </div>
            <!-- Course Price -->
            <div class="text-primary">
            ${
              course.isFree
                ? `
              <!-- Free Price -->
              <div class="">
                <del
                  class="block text-zinc-700/70 dark:text-slate-400/70 text-sm/4 -mb-1">
                    ${course.price}
                  </del>
                <span class="font-DanaMedium text-xl">رایگان!</span>
              </div>
            `
                : course.discount
                ? `
              <!-- Offer Price -->
              <div class="">
                <del
                  class="block text-zinc-700/70 dark:text-slate-400/70 text-sm/4 -mb-1">
                    ${course.price}
                  </del>
                <span
                  class="flex items-center gap-x-1 font-DanaMedium text-xl">
                    ${course.discountPrice}
                  <svg class="w-4 h-4">
                    <use href="#toman"></use>
                  </svg>
                </span>
              </div>
            `
                : `
              <!-- Normal Price -->
              <div class="flex gap-x-1 items-center">
                <span class="text-xl"> ${course.price} </span>
                <svg class="w-4 h-4">
                  <use href="#toman"></use>
                </svg>
              </div>
            `
            }
            </div>
          </div>
        </div>
      </div>
    `;
};

// Set Event For Course Cards

const setEventForCourseCards = () => {
  const courseCards = document.querySelectorAll(".course-card");

  courseCards.forEach(course => {
    course.addEventListener("click", () => {
      localStorage.setItem("course", course.dataset.courseId);
    });
  });
};

export { redirectWhenHaveToken, getAfterPageLink, createCourseCard, setEventForCourseCards };
