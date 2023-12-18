import React, { useState } from "react";
import publicAxios from "../../config/publicAxios";
import { Link } from "react-router-dom";

function Register() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    address: "",
  });
  const handleGetValue = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async () => {
    try {
      const response = await publicAxios.post("/api/v1/auth/register", newUser);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Register</h1>
      <div>
        <label htmlFor="">Email: </label>
        <input
          type="text"
          className="border border-sky-500"
          name="email"
          onChange={handleGetValue}
        />
        <br />
        <label htmlFor="">Password: </label>
        <input
          type="text"
          name="password"
          className="border border-sky-500"
          onChange={handleGetValue}
        />
        <br />
        <label htmlFor="">Address: </label>
        <input
          type="text"
          name="address"
          className="border border-sky-500"
          onChange={handleGetValue}
        />
      </div>
      <div>
        <button className="border border-sky-500" onClick={handleRegister}>
          Dang ky
        </button>
      </div>
      <div>
        <Link to="/login">Dang nhap</Link>
      </div>
    </>
  );
}

export default Register;
