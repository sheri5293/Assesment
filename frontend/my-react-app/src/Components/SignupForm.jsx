import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css";
import Cookies from "js-cookie";

const SignupForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});

  const toggleForm = (mode) => {
    setIsSignup(mode === "signup");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (isSignup) {
      if (!formData.name) {
        errors.name = "Name is required";
      }

      if (!formData.confirmpassword) {
        errors.confirmpassword = "Confirm Password is required";
      } else if (formData.confirmpassword !== formData.password) {
        errors.confirmpassword = "Passwords do not match";
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const endpoint = isSignup
        ? "http://localhost:5000/api/signup"
        : "http://localhost:5000/api/login";

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Store token in cookie
          Cookies.set("jwt", data.token, { expires: 1, path: "/" }); // Token expires in 1 day

          if (isSignup) {
            toast.success("Registered successfully!", {
              position: "top-center",
              autoClose: 3000,
              onClose: () => toggleForm("login"),
            });
          } else {
            toast.success("Login successful!", {
              position: "top-center",
              autoClose: 3000,
              onClose: () => {
                window.location.href = "/userlist"; // Replace with your actual route
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error submitting the form", {
            position: "top-center",
            autoClose: 3000,
          });
        });
    }
  };

  return (
    <div className="card">
      <h2>{isSignup ? "Signup Form" : "Login Form"}</h2>
      <div className="login_register">
        <a
          href="#"
          className={`login ${!isSignup ? "active" : ""}`}
          onClick={() => toggleForm("login")}
        >
          Login
        </a>
        <a
          href="#"
          className={`register ${isSignup ? "active" : ""}`}
          onClick={() => toggleForm("signup")}
        >
          Signup
        </a>
      </div>
      <ToastContainer position="top-center" />
      <form className="form" onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="pass"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        {isSignup && (
          <>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              className="confirm_pass"
              value={formData.confirmpassword}
              onChange={handleChange}
            />
            {errors.confirmpassword && (
              <p className="error">{errors.confirmpassword}</p>
            )}
          </>
        )}
        <a href="#" className="fp">
          Forgot password?
        </a>
        <button type="submit" className="login_btn">
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
