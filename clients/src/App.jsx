import { Route, Routes } from "react-router-dom";
import Register from "./Components/JWT/Register";
import Login from "./Components/JWT/Login";
import UserDetail from "./Components/JWT/UserDetail";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userDetail/:id" element={<UserDetail />} />
    </Routes>
  );
}

export default App;
