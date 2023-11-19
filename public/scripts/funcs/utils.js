const _changeClasses = (action, element, className) => {
  if (element) {
    if (action == "add") {
      element.classList.add(...className);
    } else if (action == "remove") {
      element.classList.remove(...className);
    } else if (action == "toggle") {
      element.classList.toggle(...className);
    } else {
      console.log("somthing wrong");
    }
  }
};
export { _changeClasses };
