import { api, fullScreenLoader } from "../../scripts/funcs/utils";
import changeContent from "./changeContents";
import ckEditor from "./ckEditorConfig";
import getAndPostCourseDescription from "./getAndPostCourseDescription";

const preparationEditDescription = async courseId => {
  fullScreenLoader("loading");

  const editor = await ckEditor();
  const course = await getCourse(courseId);

  editor.setData(course.description);
  fullScreenLoader("loaded");

  document.querySelector("#submit").addEventListener("click", () => {
    const newDescription = editor.getData();

    if (!newDescription) return false;
    getAndPostCourseDescription(editor.getData(), courseId);
  });
  document.querySelector("#back-btn").addEventListener("click", () => {
    changeContent("courses");
  });

  document.querySelector("#course-name").innerHTML = ` اسم دوره : ${course.title} `;
};

const getCourse = async id => {
  try {
    const res = await api.get(`courses/${id}`);
    const course = res.data;

    console.log(course);

    return course;
  } catch (err) {
    changeContent("courses");

    return null;
  }
};

export default preparationEditDescription;
