import { api } from "../../scripts/funcs/utils";
import changeContent from "./changeContents";
import ckEditor from "./ckEditorConfig";
import getAndPostCourseDescription from "./getAndPostCourseDescription";

const preparationEditDescription = async courseId => {
  const editor = await ckEditor();
  const course = await getCourse(courseId);

  document.querySelector("#submit").addEventListener("click", () => {
    getAndPostCourseDescription(editor.getData(), courseId);
  });
  document.querySelector("#back-btn").addEventListener("click", () => {
    changeContent("courses");
  });

  document.querySelector("#course-name").innerHTML = ` اسم دوره : ${course.title} `;
};

const getCourse = async id => {
  return (await api.get(`courses/${id}`)).data;
};

export default preparationEditDescription;
