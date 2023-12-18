const db = require("../config/database.config");

async function getUserById(id) {
  try {
    const [result] = await db.execute("select * from users where id = ?", [id]);
    return result[0];
  } catch (error) {
    console.log(error);
  }
}
async function getUserByEmail(email) {
  try {
    const [result] = await db.execute("select * from users where email = ?", [
      email,
    ]);
    return result[0];
  } catch (error) {
    console.log(error);
  }
}
async function addUser(email, password, address) {
  try {
    const [result] = await db.execute(
      "insert into users (email,password,address) values (?,?,?)",
      [email, password, address]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function updateUser(id, email, address) {
  try {
    const [result] = await db.execute(
      "UPDATE users SET email = ?, address = ? WHERE id = ?",
      [email, address, id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getUserByEmail,
  getUserById,
  addUser,
  updateUser,
};
