import{A as t,g as a}from"./utils-UJ-EUY8v.js";const l=(e,s={hasDescription:!0,hasCategory:!0,hasBorderOnLightMode:!1,hasShadowOnLightMode:!0,fixHeight:!1})=>`
      <div onclick="courseClickHandler('${e.id}')" class="course-card flex flex-col bg-white dark:bg-gray-800 ${s.hasShadowOnLightMode?"shadow-light":""}  dark:shadow-none ${s.hasBorderOnLightMode?"border-gray-200/80 border":"dark:border"} dark:border dark:border-gray-700 ${s.fixHeight?"h-[417px]":""} overflow-hidden rounded-2xl">
        <!-- Course Head -->
        <a href="../course.html" class="relative block h-42 w-full overflow-hidden">
        ${e.discount?`
              <span class=" flex items-center justify-center w-12 h-6 absolute top-2 right-2 text-sm text-white bg-primary rounded-full">
                ${e.discount}%
              </span>
              `:""}
          <img
            src=${t}/${e.image}
            onerror="this.src = '/images/image-404.png'"
            class="w-full h-full object-cover rounded-2xl"
            alt="" />
        </a>
        <!-- Course Body -->
        <div class="px-5 pt-2.5 ${s.hasCategory?"pb-3.5":""} flex-grow">
        ${s.hasCategory?`
          <div class="flex justify-start items-center gap-1">
            <a
              onclick="categoryClickHandler('${e.categoryId}')"
              href=./categories.html?category=${e.categoryId}
              class="inline-flex items-center justify-center text-xs py-1 px-1.5 text-sky-500 dark:text-yellow-400 bg-sky-500/10 dark:bg-yellow-400/10 rounded"> ${e.category?.name} </a>
          </div>
        `:""}
          <a href="../course.html" class="font-DanaMedium dark:text-white text-lg line-clamp-2 ${s.hasDescription?"my-2.5":"my-1"} ">
            ${e.title}
          </a>
          ${s.hasDescription?`
            <p
              class="line-clamp-2 font-light text-sm text-slate-500 dark:text-slate-400">
              ${e.caption}
            </p>
          `:""}
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
                <span> ${a(e.teacher)} </span>
              </a>
              <span class="flex items-center gap-x-1">
                <svg class="w-4 h-4">
                  <use href="#clock"></use>
                </svg>
                <span> ${e.timeForShow?e.timeForShow:"00:00"} </span>
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
              <span> ${e.studentsCount} </span>
            </div>
            <!-- Course Price -->
            <div class="text-primary">
            ${e.isFree?`
              <!-- Free Price -->
              <div class="">
                <del
                  class="block text-zinc-700/70 dark:text-slate-400/70 text-sm/4 -mb-1">
                    ${e.price}
                  </del>
                <span class="font-DanaMedium text-xl">رایگان!</span>
              </div>
            `:e.discount?`
              <!-- Offer Price -->
              <div class="">
                <del
                  class="block text-zinc-700/70 dark:text-slate-400/70 text-sm/4 -mb-1">
                    ${e.price}
                  </del>
                <span
                  class="flex items-center gap-x-1 font-DanaMedium text-xl">
                    ${e.discountPrice}
                  <svg class="w-4 h-4">
                    <use href="#toman"></use>
                  </svg>
                </span>
              </div>
            `:`
              <!-- Normal Price -->
              <div class="flex gap-x-1 items-center">
                <span class="text-xl"> ${e.price.toLocaleString()} </span>
                <svg class="w-4 h-4">
                  <use href="#toman"></use>
                </svg>
              </div>
            `}
            </div>
          </div>
        </div>
      </div>
    `,i=e=>{console.log(e),localStorage.setItem("course",e)},d=e=>{localStorage.setItem("category",e)};export{i as a,l as b,d as c};
