const {
  addUser,
  getUserByEmail,
  getUserById,
  updateUser,
} = require("../repository/users.repository");
const jwt = require("jsonwebtoken");
async function getDetailUser(req, res) {
  const { id } = req.params;
  try {
    const result = await getUserById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
async function register(req, res) {
  try {
    const { email, password, address } = req.body;
    await addUser(email, password, address);
    res.status(201).json({
      message: "Dang ky thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (user.password !== password) {
      return res.status(400).json({
        message: "Sai mat khau",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    delete user.password;
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateInfoUser(req, res) {
  const { email, address } = req.body;
  const { id } = req.params;
  try {
    await updateUser(id, email, address);
    res.status(200).json({
      message: "Update thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getDetailUser,
  login,
  register,
  updateInfoUser,
};
