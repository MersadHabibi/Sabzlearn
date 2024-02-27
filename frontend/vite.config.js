import { defineConfig } from "vite";
import { resolve } from "path";
import path from "path";

export default defineConfig(() => {
  return {
    root: "src",
    publicDir: '../public',
    resolve: {
      alias: {
        $fonts: resolve("./public/fonts"),
      },
    },
    build: {
      target: "esnext",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "./src/index.html"),
          login: resolve(__dirname, "./src/login.html"),
          register: resolve(__dirname, "./src/register.html"),
          OTP: resolve(__dirname, "./src/submit_otp_page.html"),
          course: resolve(__dirname, "./src/course.html"),
          categories: resolve(__dirname, "./src/categories.html"),
          panel: resolve(__dirname, "./src/panel.html"),
          order: resolve(__dirname, "./src/order.html"),
          successOrder: resolve(__dirname, "./src/success_buy_course.html"),
          lesson: resolve(__dirname, "./src/lesson.html"),
          admin: resolve(__dirname, "./src/admin/index.html"),
        },
      },
    },
  };
});
