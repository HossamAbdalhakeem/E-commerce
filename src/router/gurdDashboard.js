
export default (to, from, next) => {
  var u = localStorage.getItem("user");
  var parsing = JSON.parse(u);
  if (parsing.email === "jdlfdmkfdfj@gmail.com") {
    next();
  } else {
    next("/");
  }
};
