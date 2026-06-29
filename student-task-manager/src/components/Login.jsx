import { useState } from "react";
import "./Login.css";
function Login({ login, goToRegister }) {
  const [email, setEmail] = useState("");
  function submit(e) {
    e.preventDefault();
    if (!email) {
      alert("Enter your email");
      return;
    }
    const storedUsers =
      JSON.parse(localStorage.getItem("users"));
    const users = Array.isArray(storedUsers)
      ? storedUsers
      : [];
    const user = users.find(
      (u) => u.email === email
    );
    if (!user) {
      alert(
        "Account not found. Please create an account."
      );
 return;
    }
    login(
      user.name,
      user.email
    );
  }
  return (
    <div className="loginPage">
      <form
        className="loginCard"
        onSubmit={submit}
      >
        <h2>
          Student Task Manager
        </h2>
        <input
          type="email"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />
        <button type="submit">
          Login
        </button>
        <p>Don't have an account?{" "}
          <span
            className="link"
            onClick={goToRegister}
          >
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
}
export default Login;