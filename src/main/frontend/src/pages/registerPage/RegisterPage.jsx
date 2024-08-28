// Inbuilt components and modules
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Third-party components and modules
import { toast } from "sonner";

// Styles
import "./registerPage.scss";

// Custom components and modules
import UseAuth from "../../hooks/UseAuth";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../hooks/axios";

const RegisterPage = () => {
  //Auth context
  const { setAuth } = UseAuth();

  //Navigate and Location hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // User register data state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // User register error state
  const [err, setError] = useState(null);

  //Axios instance
  const { loading, fetchData } = useAxios();

  //Register user data change handler
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Register user data validate function
  const validate = (values) => {
    const errors = {};
    setError(null);
    const regexp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{4,12}$/;
    const regexe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexe.test(values.email)) {
      errors.email = "This is not Valid email format!";
    }

    if (!values.name) {
      errors.name = "Full Name is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  // Register user submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorVal = validate(inputs);
    if (Object.keys(errorVal).length !== 0) {
      setError(errorVal);
      return;
    }

    const response = await fetchData({
      url: API_URLS.REGISTER_URL,
      method: "POST",
      data: inputs,
    });

    if (!response.status) {
      setError(response.data);
      return toast.error(response.message);
    }
    const { token, name, userId } = response.data;
    toast.success(response.message);

    setAuth({ userId, name, token });
    navigate(from, { replace: true });
  };

  return (
    <div className="register">
      <form>
        <h1>Register</h1>
        <label htmlFor="">Full Name</label>
        <input
          name="name"
          type="text"
          placeholder="johndoe"
          onChange={handleChange}
        />
        {err?.name ? (
          <span data-testid="nameError" className="errorSpan">
            {err.name}
          </span>
        ) : (
          <p>
            <br />
          </p>
        )}
        <label htmlFor="">Email Address</label>
        <input
          name="email"
          type="text"
          placeholder="janedoe@domain.com"
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
        <button onClick={handleSubmit} disabled={loading}>
          Register
        </button>
        <Link to="/login">Already you have an account?</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
