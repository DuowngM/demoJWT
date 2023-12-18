const {
  register,
  login,
  getDetailUser,
  updateInfoUser,
} = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/middlewares");

const usersRouter = (app) => {
  app.get("/api/v1/users/:id", getDetailUser);
  app.post("/api/v1/auth/register", register);
  app.post("/api/v1/auth/login", login);
  app.put("/api/v1/users/:id", verifyToken, updateInfoUser);
};

module.exports = {
  usersRouter,
};
