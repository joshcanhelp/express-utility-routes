module.exports = {
  postsRouter: require("./posts/router"),
  usersRouter: require("./users/router"),
  ...require("./users/data"),
  ...require("./posts/data"),
};
