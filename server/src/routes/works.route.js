// CẤU HÌNH ĐỊNH TUYẾN CÁC ROUTERS
const {
  getAllWorks,
  addWork,
  updateStatusWork,
  deleteWork,
} = require("../controllers/works.controller");
const { checkWorkExists } = require("../middlewares/middlewares");

const worksRouter = (app) => {
  app.get("/api/v1/works", getAllWorks);
  app.post("/api/v1/works", checkWorkExists, addWork);
  app.put("/api/v1/works/:id", updateStatusWork);
  app.delete("/api/v1/works/:id", deleteWork);
};

module.exports = { worksRouter };
