// XỬ LÝ CÁC LOGIC VÀ GỬI VỀ CLIENT
const {
  getWorks,
  addOneWork,
  updateStatus,
  getOneWorkById,
  deleteWorkById,
} = require("../repository/works.repository");

async function getAllWorks(req, res) {
  const works = await getWorks();
  res.status(200).json(works);
}

async function addWork(req, res) {
  const { nameWork } = req.body;
  await addOneWork(nameWork);
  res.status(201).json({
    message: "Thêm thành công",
  });
}
async function updateStatusWork(req, res) {
  const { id } = req.params;
  const findWork = await getOneWorkById(id);
  if (!findWork) {
    return res.status(404).json({
      message: "Không tìm thấy",
    });
  }
  // Nếu status là 1 thì sẽ update thành 0 và ngược lại
  const newStatusValue = findWork.status === 1 ? 0 : 1;
  await updateStatus(id, newStatusValue);
  res.status(201).json({
    message: "Cap nhap trang thai thanh cong",
  });
}
async function deleteWork(req, res) {
  const { id } = req.params;
  const findWork = await getOneWorkById(id);
  if (!findWork) {
    return res.status(404).json({
      message: "Không tìm thấy",
    });
  }
  await deleteWorkById(id);
  res.status(200).json({
    message: "Xoa thanh cong",
  });
}
module.exports = { getAllWorks, addWork, updateStatusWork, deleteWork };
