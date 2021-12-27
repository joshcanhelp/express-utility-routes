const faker = require("faker");

const passThrough = (req, res, next) => next();

const { addUser } = require("./data");

module.exports = ({
  express,
  users,
  requiresAuth = passThrough,
  stylesheet = "",
  views = {},
}) => {
  const router = express.Router();

  router.get("/list", requiresAuth, (req, res, next) => {
    const viewPath = views.list || `${__dirname}/views/list`;
    const localVars = { stylesheet, users };
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
      addUser({
        name: req.body.name.trim(),
        username: req.body.username.trim(),
        email: req.body.email.trim(),
        roles: req.body.roles.trim().toLowerCase().split(" "),
        id: faker.datatype.uuid(),
      });
      res.redirect("list");
    }
  );

  return router;
};
