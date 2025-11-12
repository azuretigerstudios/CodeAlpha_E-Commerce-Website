import { loginUser, registerUser } from "./api.js";

const form = document.querySelector("form");

if (window.location.pathname.includes("login")) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await loginUser({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Login successful!");
      window.location.href = "index.html";
    } else alert(res.message || "Login failed");
  });
}

if (window.location.pathname.includes("register")) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await registerUser({ name, email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Registered successfully!");
      window.location.href = "index.html";
    } else alert(res.message || "Registration failed");
  });
}
