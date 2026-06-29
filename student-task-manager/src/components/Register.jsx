import { useState } from "react";
import "./Login.css";
function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function register(e) {
    e.preventDefault();
    if (!name || !email) {
      alert("Fill all fields");
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const users = Array.isArray(storedUsers)
      ? storedUsers
      : [];
    const exists = users.find(
      (u) => u.email === email
    );
    if (exists) {
      alert("Email already registered");
      return;
    }
    const updatedUsers = [
      ...users,
      {
        name,
        email
      }
    ];
    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
    alert("Account Created Successfully!");
    setName("");
    setEmail("");
    goToLogin();
  }
  return (
    <div className="loginPage">
      <form
        className="loginCard"
        onSubmit={register}
      >
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />
        <button type="submit">
          Create Account
        </button>
        <p>
          Already have an account?{" "}
          <span
            className="link"
            onClick={goToLogin}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
export default Register;