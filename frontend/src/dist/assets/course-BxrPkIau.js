import"./app-ukoE8fgy.js";import"./share-zDZSOXv8.js";import{h as j}from"./header-vDKGLy6I.js";import{s as h,f as k,_ as n,c as A,A as E,g as v}from"./utils-UJ-EUY8v.js";import{c as N,a as I}from"./commentsAPIs-KNPcQf1x.js";import{a as R}from"./coursesAPIs-1jxUDFuP.js";import{g as z}from"./usersAPIs-AQb3Emfp.js";import"./categoriesAPIs-G_R3qbDg.js";const F=async(o,e,s)=>{if(!s){h("متن کامنت را وارد کنید!");return}return console.log("loader"),(await N(o,e,s)).status},P=async(o,e,s)=>{if(!s){h("متن کامنت را وارد کنید!");return}return(await I(o,e,s)).status};k("loading");const t=document;j(t);let r=null,i=null,m="new",c=0,u=!1;window.addEventListener("load",async()=>{await f(),i=await z(),u=i?.courses.some(({id:o})=>o==r.id),console.log(u),re(),se(),oe(),p(),O(),ee(),k("loaded")});const O=()=>{const o=document.querySelector(".new-comment-form"),e=document.querySelector("#comment-textarea");console.log("prepare"),o.addEventListener("submit",async s=>{s.preventDefault(),n("add",document.querySelector("#comment-submit-btn"),["load"]),m=="new"?i!==null?await F(i.id,r.id,e.value)==!0&&(n("remove",l,["show-new-comment-form"]),e.value="",c=0,x.innerHTML="",await f(),p()):h("وارد شوید"):await P(i.id,m,e.value)==!0&&(n("remove",l,["show-new-comment-form"]),e.value="",c=0,x.innerHTML="",await f(),p()),n("remove",document.querySelector("#comment-submit-btn"),["load"])})},W=t.querySelector(".course-description"),G=t.querySelector(".course-description__btn"),w=t.querySelector(".copy-link-btn");t.querySelectorAll(".topic__header");const x=t.querySelector(".comments__container"),l=t.querySelector(".course-comments"),J=t.querySelector(".open-new-comment-btn"),K=t.querySelector(".cancel-new-comment"),_=t.querySelector(".comment-to"),g=t.querySelector(".comments__more-btn"),S=t.querySelector(".comments__all-showed"),Q=t.querySelector(".offer__day"),V=t.querySelector(".offer__hur"),X=t.querySelector(".offer__min"),Y=t.querySelector(".offer__sec");G.addEventListener("click",()=>{n("toggle",W,["show"])});w.addEventListener("click",()=>{navigator.clipboard.writeText(w.nextElementSibling.innerText)});function Z(o){n("toggle",o.parentElement,["open"])}window.openCloseTopicHandler=Z;K.addEventListener("click",()=>{n("remove",l,["show-new-comment-form"])});const ee=()=>{J.addEventListener("click",async()=>{n("add",l,["show-new-comment-form"]),_.innerText="ثبت نظر جدید",m="new"})},te=()=>{t.querySelectorAll(".comment-reply-btn").forEach(e=>{e.addEventListener("click",s=>{let a=e.dataset.creator;_.innerText=`در پاسخ به ${a}`,n("add",l,["show-new-comment-form"]),m=e.dataset.commentId})})};A(Q,V,X,Y,"0:14:10:3",!1);const f=async()=>{const o=localStorage.getItem("course");r=await R(o),console.log("course => ",r)},re=()=>{const o=t.querySelector("#breadCrumb__category"),e=t.querySelector("#breadCrumb__name");o.innerHTML=`<a href=./categories.html?category=${r.categoryId}> ${r.category.name} </a>`,e.innerHTML=r.title},se=()=>{const o=t.querySelector(".course__image"),e=t.querySelector(".course__title"),s=t.querySelector(".course__caption"),a=t.querySelector(".course__price"),d=t.querySelector(".course__offer"),b=t.querySelector(".course__offer-percent"),C=t.querySelector(".course__studentsCount"),T=t.querySelector(".mobile-course__studentsCount"),L=t.querySelector(".course__status"),$=t.querySelector(".course__time"),q=t.querySelector(".topics__all-time"),U=t.querySelector(".course__teacher"),M=t.querySelector(".mobile-course__teacher"),H=t.querySelector(".course__description"),y=t.querySelector("#buy-btn"),D=t.querySelector(".new-comment-form__name"),B=t.querySelector(".buy-btn__wrapper");u?(n("add",y,["!hidden"]),B.insertAdjacentHTML("afterbegin",`
    <span
      id="buy-btn"
      class="flex items-center justify-center sm:justify-start gap-x-2 h-[62px] w-full sm:w-auto px-5 rounded-xl bg-secondary hover:bg-sky-500 text-white font-DanaDemiBold text-2xl transition-colors">
      <svg class="size-9">
        <use href="#play-circle"></use>
      </svg>
      <span> مشترک هستید </span>
    </span>
    `)):i&&(y.href=`./order.html?courseId=${r.id}`),H.innerHTML=r.description,o.src=`${E}/${r.image}`,o.alt=r.title,n("remove",o,["hidden"]),e.innerHTML=r.title,s.innerHTML=r.caption,r.discount?(n("remove",d,["!hidden"]),b.innerHTML=`${r.discount}%`):r.isFree&&(n("remove",d,["!hidden"]),b.innerHTML="100%"),a.innerHTML=r.isFree?`
    <div class="flex items-center gap-x-2">
      <span
        class="relative block text-slate-500 dark:text-slate-400 text-2xl -mb-1 pt-1.5 before:content-[''] before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-slate-500 dark:before:bg-slate-400">
          ${r.price}
        </span>
      <span
        class="font-DanaDemiBold mt-2 text-3xl dark:text-white">
        رایگان!
      </span>
    </div>
    `:r.discount?`
    <div class="flex items-center gap-x-2">
      <span
        class="relative block text-slate-500 dark:text-slate-400 text-2xl -mb-1 pt-1.5 before:content-[''] before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-slate-500 dark:before:bg-slate-400">
          ${r.price}
        </span>
      <span
        class="flex items-center gap-x-1 font-DanaDemiBold mt-1 text-3xl dark:text-white">
        <span class="mt-2"> ${r.discountPrice} </span>
        <svg class="w-6 h-6">
          <use href="#toman"></use>
        </svg>
      </span>
    </div>
    `:`
    <div
      class="flex gap-x-1 items-center font-DanaDemiBold dark:text-white">
      <span class="text-3xl mt-1"> ${r.price} </span>
      <svg class="w-6 h-6">
        <use href="#toman"></use>
      </svg>
    </div>
    `,U.innerHTML=v(r.teacher),M.innerHTML=v(r.teacher),C.innerHTML=r.studentsCount,T.innerHTML=r.studentsCount,L.innerHTML=r.status=="presell"?"پیش فروش":r.status=="completing"?"در حال تکمیل":"تکمیل شده",$.innerHTML=`${r.timeForShow} ساعت`,q.innerText=r.timeForShow,D.innerText=i?.username?i.username:"کاربر"},oe=()=>{const o=[...r.subjects],e=document.querySelector(".topic__container");o.length>0&&(e.innerHTML="",o.forEach(s=>{console.log(s),e.insertAdjacentHTML("beforeend",`
      <div class="course-topic rounded-xl overflow-hidden transition-all">
        <!-- Topic header -->
        <div
          onclick="openCloseTopicHandler(this)"
          class="topic__header flex justify-between items-center w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-slate dark:text-white h-12 md:h-[75px] px-5 transition-colors cursor-pointer">
          <h4 class="font-DanaMedium text-sm md:text-xl"> ${s.title} </h4>
          <svg class="w-5 sm:w-6 h-5 sm:h-6 text-zinc-700 dark:text-white transition-transform">
            <use href="#chevron-down"></use>
          </svg>
        </div>
        <!-- Topic Body -->
        <div class="topic__body h-0 bg-gray-100 dark:bg-gray-700 divide-y dark:divide-slate transition-all">
          ${s.episodes==0?' <p class="text-center dark:text-white text-md py-4">قسمتی وجود ندارد</p> ':s.episodes.map((a,d)=>`
                  <div class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                    <a href="${a.isFree||u?`./lesson.html?episodeId=${a.id}&courseId=${r.id}`:i?"":"./login.html"}" class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%]">
                      <span
                        class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-danaDemiBold text-xs md:text-base text-zinc-700 dark:text-white dark:bg-gray-800 group-hover:bg-primary group-hover:text-white rounded-md transition-colors mt-0.5"
                        >${d}</span
                      >
                      <h4 class="text-zinc-700 dark:text-white group-hover:text-primary text-sm md:text-lg transition-colors pt-1">
                        ${a.title}
                      </h4>
                    </a>
                    <div class="flex items-center w-full justify-between">
                      <span
                        class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 dark:bg-slate text-zinc-700 dark:text-white group-hover:bg-primary/10 group-hover:text-primary text-xs rounded transition-colors"
                        >${a.isFree?"جلسه رایگان":"نقدی"}</span
                      >
                      <div class="flex items-center gap-x-1.5 md:gap-x-2">
                        <span class="text-slate-500 dark:text-slate-400 text-sm md:text-lg mt-1"> ${a.timeForShow} </span>
                        <svg class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 dark:text-white group-hover:text-primary transition-colors">
                          <use xlink:href="#play-circle"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  `).join("")}
        </div>
      </div>
    `)}))},p=()=>{const o=r.comments.sort((e,s)=>new Date(s.createdAt)-new Date(e.createdAt));o.length<=5&&(n("add",g,["hidden"]),n("remove",S,["hidden"])),ne(o.slice(c,c+5)),te()},ne=o=>{o.forEach(e=>{x.insertAdjacentHTML("beforeend",`
      <div class="p-3.5 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl">
        <!-- Comment Body -->
        <div class="flex gap-x-5 items-start">
          <!-- Comment Right User Picture & flag (desktop version) -->
          <div class="hidden md:flex flex-col gap-y-2 shrink-0">
            <img class="block w-10 h-10 md:w-15 md:h-15 object-cover rounded-full" onerror="this.src = '/images/user-profile.png'" src="${e.Users.imageProfile?e.Users.imageProfile:"/images/user-profile.png"}" />
            <div class="text-xs w-full rounded-md text-center py-0.5 ${e.Users.role=="admin"?"text-white bg-sky-500 dark:text-sky-500 dark:bg-sky-500/10":e.Users.role=="user"?"bg-slate-500 text-white dark:text-slate-400 dark:bg-slate-400/10":e.Users.role=="student"?"text-white bg-primary dark:text-primary dark:bg-primary/10":""}"> 
            ${e.Users.role=="admin"?"مدیریت":e.Users.role=="user"?"کاربر":e.Users.role=="student"?"دانشجو":""}
           </div>
          </div>
          <!-- Comment Left Reply comment, text, author, data, flag, reply btn -->
          <div class="w-full">
            <!-- Comment Head -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-2">
                <img class="block md:hidden w-10 h-10 object-cover rounded-full shrink-0" src="/images/user-profile.png" />
                <div class="shrink-0">
                  <span class="text-zinc-700 dark:text-white font-danaMedium text-base md:text-xl"> ${e.Users.username} </span>
                  <div class="flex items-center gap-x-1.5 mt-1">
                    <div
                      class="md:hidden text-xs w-full px-3 rounded-md text-center py-0.5 ${e.Users.role=="admin"?"text-white dark:text-sky-500 bg-sky-500 dark:bg-sky-500/10":e.Users.role=="user"?"bg-slate-500 text-white dark:bg-slate-400 dark:text-slate-400/10":e.Users.role=="student"?"text-white dark:text-primary bg-primary dark:bg-primary/10":""}">
                      ${e.Users.role=="admin"?"ادمین":e.Users.role=="user"?"کاربر":e.Users.role=="student"?"دانشجو":""}
                    </div>
                    <span class="font-danaLight text-slate-500 dark:text-white text-xs">${new Date(e.createdAt).toLocaleDateString("fa-IR")}</span>
                  </div>
                </div>
              </div>
              <button class="comment-reply-btn w-6 h-5 text-slate-500 dark:text-gray-500" type="button" data-comment-id=${e.id} data-creator=" ${e.Users.username}">
                <svg class="w-6 h-5">
                  <use xlink:href="#reply"></use>
                </svg>
              </button>
            </div>
            <!-- Comment Text -->
            <div class="text-zinc-700 dark:text-white font-danaLight leading-7 mt-3.5">
              ${e.body} 
            </div>
            <!-- Comment Replies -->
            ${e.replies?`
              <div class="mt-7 space-y-3.5 md:space-y-5">
                ${e.replies.map(s=>`
                  <div class="mt-7 p-3.5 md:p-5 bg-gray-200 dark:bg-slate rounded-2xl">
                    <div class="flex gap-x-5 items-start">
                      <!-- Comment Right User Picture & flag (desktop version) -->
                      <div class="hidden md:flex flex-col shrink-0 gap-y-2">
                        <img class="block w-10 h-10 md:w-15 md:h-15 object-cover rounded-full" src="/images/user-profile.png" />
                        <div class="text-xs w-full rounded-md text-center py-0.5 ${s.Users.role=="admin"?"text-white dark:text-sky-500 bg-sky-500 dark:bg-sky-500/10":s.Users.role=="user"?"bg-slate-500 text-white dark:text-slate-400 dark:bg-slate-400/10":s.Users.role=="student"?"text-white dark:text-primary bg-primary dark:bg-primary/10":""}">${s.Users.role=="admin"?"ادمین":s.Users.role=="user"?"کاربر":e.Users.role=="student"?"دانشجو":""}</div>
                      </div>
                      <!-- Comment Left Text, author, data, flag -->
                      <div class="w-full">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-x-2">
                            <img class="block md:hidden w-10 h-10 object-cover rounded-full shrink-0" src="/images/user-profile.png" />
                            <div class="shrink-0">
                              <span class="text-zinc-700 dark:text-white font-danaMedium text-base md:text-xl"> ${s.Users.username} </span>
                              <div class="flex items-center gap-x-1.5 mt-1">
                                <div
                                  class="md:hidden text-xs w-full px-3 rounded-md text-center py-0.5 ${s.Users.role=="admin"?"text-white dark:text-sky-500 bg-sky-500 dark:bg-sky-500/10":s.Users.role=="user"?"bg-slate-500 text-white dark:bg-slate-400 dark:text-slate-400/10":s.Users.role=="student"?"text-white dark:text-primary bg-primary dark:bg-primary/10":""}">
                                  ${s.Users.role=="admin"?"ادمین":s.Users.role=="user"?"کاربر":s.Users.role=="student"?"دانشجو":""}
                                </div>
                                <span class="font-danaLight text-slate-500 dark:text-white text-xs">${new Date(s.createdAt).toLocaleDateString("fa-IR")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Comment Text -->
                        <div class="text-zinc-700 dark:text-white font-danaLight leading-7 mt-3.5"> ${s.body} </div>
                      </div>
                    </div>
                  </div>
                  `).join("")}
              </div>
            `:""}
          </div>
        </div>
      </div>
    `)})};g.addEventListener("click",()=>{c=c+5,r.comments.length<=c+5&&(n("add",g,["hidden"]),n("remove",S,["hidden"])),p()});
