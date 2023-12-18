const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { worksRouter } = require("./routes/works.route");
const { usersRouter } = require("./routes/users.route");

// Cau hinh
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
// Su dung Router
worksRouter(app);
usersRouter(app);
// Tao cong chay server
app.listen(process.env.HOST, () => {
  console.log(`Server is running on port ${process.env.HOST}`);
});
