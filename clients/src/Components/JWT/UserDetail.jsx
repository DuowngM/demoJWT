import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicAxios from "../../config/publicAxios";
import privateAxios from "../../config/pritvateAxios";

function UserDetail() {
  const { id } = useParams();
  const [detailUser, setDetailUser] = useState({});
  const handleGetDetail = async () => {
    try {
      const response = await publicAxios.get(`/api/v1/users/${id}`);
      setDetailUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetDetail();
  }, []);
  const handleGetValue = (e) => {
    setDetailUser({
      ...detailUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
    try {
      const response = await privateAxios.put(
        `/api/v1/users/${detailUser.id}`,
        detailUser
      );
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <>
      <h1>UserDetail</h1>
      <div>Thong tin User</div>
      <div>
        <label htmlFor="">Email: </label>
        <input
          type="text"
          className="border border-sky-500"
          name="email"
          onChange={handleGetValue}
          value={detailUser.email}
        />
        <br />
        <label htmlFor="">Address: </label>
        <input
          type="text"
          className="border border-sky-500"
          name="address"
          onChange={handleGetValue}
          value={detailUser.address}
        />
        <br />
      </div>
      <div>
        <button className="border border-sky-500" onClick={handleSave}>
          Save
        </button>
      </div>
      <div>
        <button className="border border-sky-500" onClick={handleLogOut}>
          Dang Xuat
        </button>
      </div>
    </>
  );
}

export default UserDetail;
