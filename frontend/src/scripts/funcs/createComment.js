import { api, getToken } from "./utils";

const preparationNewComment = async (user, course) => {
  console.log(user, course);
  const form = document.querySelector(".new-comment-form");
  const formTextarea = document.querySelector("#comment-textarea");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    await createNewComment(user, course, formTextarea.value);
  });
};
const createNewComment = async (user, course, commentText) => {
  console.log(course.id, user.id, commentText);
  await api
    .post(
      "comments",
      {
        userId: user.id,
        courseId: course.id,
        body: commentText,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export default preparationNewComment;
