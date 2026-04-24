import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err)
      alert("Login failed ", err);
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col h-10 p-4 b-2 space-y-4">
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-purple-800 p-4 text-white font-bold rounded-sm" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;