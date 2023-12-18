// XỬ LÝ CÁC CÂU LỆNH QUERY TRONG MYSQL
const db = require("../config/database.config");

async function getWorks() {
  try {
    const [works] = await db.execute("SELECT * FROM works");
    return works;
  } catch (error) {
    console.log(error);
  }
}
async function getOneWork(nameWork) {
  try {
    const [work] = await db.execute(`SELECT * FROM works WHERE work = ?`, [
      nameWork,
    ]);
    return work[0];
  } catch (error) {
    console.log(error);
  }
}
async function getOneWorkById(id) {
  try {
    const [work] = await db.execute("SELECT status FROM works WHERE id = ?", [
      id,
    ]);
    return work[0];
  } catch (error) {
    console.log(error);
  }
}
async function addOneWork(work) {
  try {
    const result = await db.execute(
      "INSERT INTO works (work,status) VALUES (? , 0)",
      [work]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function updateStatus(id, status) {
  try {
    const [result] = await db.execute(
      "UPDATE works SET status = ? WHERE id = ?",
      [status, id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function deleteWorkById(id) {
  try {
    await db.execute("DELETE FROM works WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getWorks,
  getOneWork,
  getOneWorkById,
  addOneWork,
  updateStatus,
  deleteWorkById,
};
