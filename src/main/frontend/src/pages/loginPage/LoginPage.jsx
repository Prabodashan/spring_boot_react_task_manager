// Inbuilt components and modules
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Third-party components and modules
import { toast } from "sonner";

// Styles
import "./loginPage.scss";

// Custom components and modules
import UseAuth from "./../../hooks/UseAuth";
import useAxios from "./../../hooks/axios";
import { API_URLS } from "./../../configs/api.urls";

const LoginPage = () => {
  //Auth context
  const { setAuth } = UseAuth();

  //Navigate and Location hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // User login data state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // User login error state
  const [err, setError] = useState(null);

  //Axios instance
  const { loading, fetchData } = useAxios();

  //Login user data change handler
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Login user data validate function
  const validate = (values) => {
    const errors = {};
    setError(null);

    const regexe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexe.test(values.email)) {
      errors.email = "This is not Valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  // Login user submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorVal = validate(inputs);
    if (Object.keys(errorVal).length !== 0) {
      setError(errorVal);
      return;
    }

    const response = await fetchData({
      url: API_URLS.LOGIN_URL,
      method: "POST",
      data: inputs,
    });

    if (!response.status) {
      return toast.error(response.message);
    }
    const { token, name, userId } = response.data;
    toast.success(response.message);

    setAuth({ userId, name, token });
    navigate(from, { replace: true });
  };

  return (
    <div className="login">
      <form>
        <h1>Sign in</h1>
        <label htmlFor="">Email Address</label>
        <input
          name="email"
          type="text"
          placeholder="test@domain.com"
          onChange={handleChange}
        />
        {err?.email ? (
          <span data-testid="emailError" className="errorSpan">
            {err.email}
          </span>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="password"
        />
        {err?.password ? (
          <span data-testid="passwordError" className="errorSpan">
            {err.password}
          </span>
        ) : (
          <p>
            <br />
          </p>
        )}
        <button className="btn" onClick={handleSubmit} disabled={loading}>
          Login
        </button>
        <Link to="/register">{"Don't"} you have an account?</Link>
      </form>
    </div>
  );
};

export default LoginPage;
