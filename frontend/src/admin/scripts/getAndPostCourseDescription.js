import { courseDescriptionApi } from "../../../services/coursesAPIs";
import { fullScreenLoader } from "../../scripts/funcs/utils";

const getAndPostCourseDescription = async (data, courseId) => {
  fullScreenLoader("loading");
  await courseDescriptionApi(courseId, data);
  fullScreenLoader("loaded");
};

export default getAndPostCourseDescription;
