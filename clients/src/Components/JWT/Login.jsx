import React, { useState } from "react";
import publicAxios from "../../config/publicAxios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleGetValue = (e) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    try {
      const response = await publicAxios.post("/api/v1/auth/login", auth);
      localStorage.setItem("token", response.data.token);
      navigate(`/userDetail/${response.data.user.id}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <h1>Login</h1>
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
      </div>
      <div>
        <button className="border border-sky-500" onClick={handleLogin}>
          Dang nhap
        </button>
      </div>
    </>
  );
}

export default Login;
