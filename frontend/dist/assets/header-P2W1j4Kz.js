import{d as x,g as q}from"./usersAPIs-f3Y-Bvie.js";import{a as E}from"./categoriesAPIs-GHuyfHKv.js";import{s as L,_ as n}from"./utils-PZo8WXxC.js";const w=async()=>{const e=await E();let t=null;if(!e.status)return L("اینترنت خود را بررسی کنید"),!1;t=e.data,console.log(t);const l=document.querySelector(".menus__wrapper"),m=document.querySelector(".mobile-menus-wrapper");t.forEach(r=>{l.insertAdjacentHTML("beforeend",`
    <li class="group relative">
      <a
        href="./categories.html?category=${r.id}"
        class="flex items-center gap-x-1 text-base xl:text-lg">
        ${r.name}
        <svg class="h-4 w-4">
          <use href="#chevron-down"></use>
        </svg>
      </a>
      <!-- SubMenu -->
      <ul
        class="absolute right-0 top-8 -z-10 w-64 space-y-5 rounded-2xl bg-white p-5 text-zinc-700 opacity-0 shadow-light transition-all group-hover:z-20 group-hover:opacity-100 child:line-clamp-1 child:cursor-pointer child:transition-colors child-hover:text-primary dark:bg-[#32334D] dark:text-white">
        ${r.Course.map(i=>`
          <li>
            <a href="./course.html" onclick=courseClickHandler('${i.id}')>${i.title}</a>
          </li>
          `).join("")}
      </ul>
    </li>
    `),m.insertAdjacentHTML("beforeend",`
      <li class="menu__item w-full">
        <div class="flex h-7 w-full items-center justify-between">
          <a href="./categories.html?category=${r.id}">  ${r.name} </a>
          <svg onclick="mobileMenuItemsClickHandler(this)" class="mobile__submenu-btn h-4 w-4 rotate-0 transition-all">
            <use href="#chevron-down"></use>
          </svg>
        </div>
        <ul
          class="submenu flex-col space-y-3 pr-2 pt-3 text-sm font-extralight child:inline-block child-hover:text-primary">
          
          ${r.Course.map(i=>`
            <a href="./course.html" onclick=courseClickHandler('${i.id}')> ${i.title} </a>
            `).join("")}
        </ul>
      </li>
    `)}),window.mobileMenuItemsClickHandler=B};function B(e){let t=e.parentElement.parentElement;if(t.classList.contains("menu__item--active"))n("remove",t,["menu__item--active"]);else{const l=document.querySelector(".menu__item--active");n("remove",l,["menu__item--active"]),n("add",t,["menu__item--active"])}}const P=async e=>{let t={};w();const l=e.querySelector(".search-btn"),m=e.querySelector(".search-box"),r=e.querySelector(".search-box-form"),i=e.querySelector(".search-box-input"),v=e.querySelector(".mobile-search-box-form"),p=e.querySelector(".mobile-search-box-input"),f=e.querySelector(".overlay"),c=e.querySelector(".profile");e.querySelectorAll(".mobile__submenu-btn");const d=e.querySelector(".mobile-menu"),y=e.querySelector(".mobile__close-btn"),_=e.querySelector(".mobile-menu__open-btn"),u=()=>{n("toggle",f,["show"])},g=()=>{n("toggle",l,["search-btn--active"]),u(),t=t==l?null:l},b=()=>{n("toggle",c,["profile--active"]),u(),t=t==c?null:c},h=o=>{o=="open"?(n("add",d,["mobile-menu--open"]),u(),t=d):(n("remove",d,["mobile-menu--open"]),u(),t=null)};l.addEventListener("click",g),c.addEventListener("click",b),f.addEventListener("click",()=>{t==l?g():t==c?b():h("close"),n("remove",document.documentElement,["overflow-hidden"])}),y.addEventListener("click",()=>{h("close")}),_.addEventListener("click",()=>{h("open")}),(()=>{const o=e.querySelector(".register-btn"),a=e.querySelector(".login-btn"),k=e.querySelector(".mobile-login-btn");o.addEventListener("click",()=>{location.href=`./register.html?after=${location.pathname}`}),a.addEventListener("click",()=>{location.href=`./login.html?after=${location.pathname}`}),k.addEventListener("click",()=>{location.href=`./login.html?after=${location.pathname}`})})();let s=null;await(async()=>{const o=e.querySelector(".profile__container"),a=e.querySelector(".login-register__container");s=await q(),console.log(s),s!==null&&(n("add",a,["hidden"]),n("remove",o,["hidden"]),S(s))})();function S(o){const a=e.querySelector(".profile__name");a.innerHTML=o.username}m.addEventListener("click",o=>{o.stopPropagation()}),r.addEventListener("submit",o=>{o.preventDefault(),location.href=i.value?`./categories.html?s=${i.value}`:location.href}),v.addEventListener("submit",o=>{o.preventDefault(),location.href=p.value?`./categories.html?s=${p.value}`:location.href}),e.querySelector(".logout-btn").addEventListener("click",async()=>{(await x()).status&&(localStorage.removeItem("token"),location.reload())}),document.querySelectorAll(".header__profile").forEach(o=>{o.src=s?.imageProfile})};export{P as h};
