import { defineConfig } from "vite";
import { resolve } from "path";
import path from "path";

export default defineConfig(() => {
  return {
    build: {
      target: "esnext",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "./src/index.html"),
          login: resolve(__dirname, "./src/login.html"),
          register: resolve(__dirname, "./src/register.html"),
          course: resolve(__dirname, "./src/course.html"),
          categories: resolve(__dirname, "./src/categories.html"),
          panel: resolve(__dirname, "./src/panel.html"),
          admin: resolve(__dirname, "./src/admin/index.html"),
        },
      },
    },
  };
});
