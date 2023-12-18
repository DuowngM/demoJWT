const jwt = require("jsonwebtoken");
const { getOneWork } = require("../repository/works.repository");
const validation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      message: "Todo is required",
    });
  } else {
    next();
  }
};

const verifyToken = (req, res, next) => {
  try {
    // Lấy token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const checkWorkExists = async (req, res, next) => {
  const { nameWork } = req.body;
  const result = await getOneWork(nameWork);
  if (result) {
    return res.status(400).json({
      message: "Đã có công việc",
    });
  }
  next();
};
module.exports = {
  validation,
  verifyToken,
  checkWorkExists,
};
