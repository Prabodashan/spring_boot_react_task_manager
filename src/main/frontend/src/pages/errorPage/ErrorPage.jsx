import React from "react";
import NotFoundImage from "../../assets/svg/writer.svg";
import "./errorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img src={NotFoundImage} alt="Page not found" />
      <p className="error-msg">
        Something went wrong. Try clicking the refresh page button to reload the
        application.{" "}
        <Link to="/" className="btn">
          Refresh page
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
