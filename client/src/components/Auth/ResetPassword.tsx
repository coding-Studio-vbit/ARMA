import React, { useEffect, useState } from "react";
import { InputField } from "../InputField/InputField";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState<string>();
  const [Password, setPassword] = useState<String>("");
  const [ConfirmPassword, setConfirmPassword] = useState<String>("");
  const [showPassword, setShowPassword] = useState(false);
  const { email, token } = useParams();
  console.log({ email, token });
  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    var password = e.target.value;
    setPassword(password);
    if (password.length === 0) {
      setPasswordError("Password field is empty");
    } else {
      setPasswordError("");
    }
  };
  const onSubmit = () => {
    if (passwordError.length === 0) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}resetPassword`, {
          email: email,
          password: Password,
          token: token,
        })
        .then(async (response) => {
          console.log(response);
          navigate("/");
        })
        .catch(() => {
          setPasswordError("Error");
        });
    }
  };
  const validateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    var p = e.target.value;
    setConfirmPassword(p);
    if (Password.length === 0) {
      setPasswordError("Password field is empty");
    } else if (p.length === 0) {
      setPasswordError("Confirm Password field is empty");
    } else if (p !== Password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center svg-background">
      <div className="flex flex-col h-screen justify-center items-center">
        <div
          className="text-arma-title text-2xl font-medium mx-5 text-justify mb-3"
          style={{ color: "rgb(19,155,235)" }}
        >
          Create password
        </div>
        <div className="text-gray-500 font-light mx-5 text-justify mb-[35px]">
          Enter your new password below :)
        </div>
        <div className="flex flex-col items-center">
          <InputField
            className="mb-5"
            name="Password"
            type={`${!showPassword && "password"}`}
            onChange={(e) => {
              validatePassword(e);
            }}
          />
          <InputField
            className="mb-5"
            name="Confirm Password"
            type={`${!showPassword && "password"}`}
            onChange={(e) => {
              validateConfirmPassword(e);
            }}
          />
          <span className="text-arma-red h-8">{passwordError}</span>
          <button
            className="outlineBtn text-arma-blue border-[1px] rounded-[8px] py-[0.5rem]"
            type="submit"
            onClick={onSubmit}
          >
            Submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ResetPassword };
