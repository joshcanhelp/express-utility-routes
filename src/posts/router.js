const passThrough = (req, res, next) => next();

module.exports = ({
  express,
  posts,
  requiresAuth = passThrough,
  stylesheet = "",
  views = {},
}) => {
  const router = express.Router();

  router.get("/list", requiresAuth, (req, res, next) => {
    const viewPath = views.list || `${__dirname}/views/list`;
    const localVars = { stylesheet, posts };
    res.render(viewPath, localVars);
  });

  router.get("/create", requiresAuth, (req, res, next) => {
    const viewPath = views.list || `${__dirname}/views/create`;
    const localVars = { stylesheet };
    res.render(viewPath, localVars);
  });

  router.post(
    "/create",
    express.urlencoded({ extended: true }),
    requiresAuth,
    (req, res, next) => {
      posts.unshift({
        title: req.body.title,
        content: req.body.content,
        published: new Date().toISOString(),
        author: req.session.user?.id,
      });
      res.redirect("list");
    }
  );

  return router;
};
