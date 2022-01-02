import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../InputField/InputField";
import { Spinner } from "../Spinner/Spinner";
import { login } from "./authService";
import { VisibilityOff, Visibility } from "@material-ui/icons";

function Login() {
  let navigate = useNavigate();
  const [isFaculty, setIsFaculty] = useState<boolean | undefined>(undefined);
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [error, setError] = useState<String>("")
  const[showPassword, setShowPassword] = useState(false)

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (email.length === 0) {
      setEmailError("Email field is empty");
    } else {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validRegex.test(email)) {
        setEmailError("Enter valid Email!");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    var password = e.target.value;
    setPassword(password);
    if (password.length === 0) {
      setPasswordError("Password field is empty");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="mt-20 flex flex-col w-full overflow-hidden items-center">
      <p className="text-arma-title text-5xl font-medium mb-2">A.R.M.A</p>
      <p className="text-[#263238] mb-12 text-center">
        Automating and Digitalizing Event Organization
      </p>
      <div
        className="bg-[#F5F5F5] cursor-pointer pointer-events-auto flex w-max rounded-[24px] relative  mb-12 "
        onClick={() => {
          setIsFaculty(!isFaculty);
          setEmail("");
          setEmailError("");
          setPassword("");
          setPasswordError("");
        }}
      >
        <div
          className={` absolute ${isFaculty && "userdiv"} ${(isFaculty === false) && "userdivback"}  bg-arma-blue rounded-[24px] w-6/12 h-full  cursor-pointer`}
        ></div>
        <div className="py-1 pl-8 pr-8 shrink z-10 ">
          <span
            className={`${
              !isFaculty && "text-white"
            }  font-medium pointer-events-auto cursor-pointer`}
          >
            Faculty
          </span>
        </div>
        <div
          className={`rounded-[24px] py-1 pr-8 pl-8 pointer-events-auto cursor-pointer z-10`}
        >
          <span
            className={` ${
              isFaculty && "text-white"
            } font-medium cursor-pointer`}
          >
            Forum
          </span>
        </div>
      </div>

      <InputField
        className="mb-5"
        name="Email"
        error={emailError}
        onChange={(e) => {
          validateEmail(e);
        }}
      />
    <div className="relative">
      <InputField
        className="mb-12"
        name="Password"
        type ={`${!showPassword && "password" }`}
        error={passwordError}
        onChange={(e) => {
          validatePass(e);
        }}
      />
      {
        showPassword? <Visibility className="absolute top-[0.85rem] right-3 text-arma-title cursor-pointer" onClick = {() => setShowPassword(false)}/> : 
        <VisibilityOff className="absolute top-[0.85rem] right-3 text-arma-title cursor-pointer" onClick = {() => setShowPassword(true)}/> 

      }
      </div>
      {error && <span className="text-arma-red">{error}</span>}
      <LoginButton
        onClick={async () => {
          const res = await login(
            email,
            password,
      (isFaculty || isFaculty === undefined)? "FACULTY" : "FORUM"
          );
          console.log(res);
          
          
          if (res.status === 1) {
            navigate((isFaculty || isFaculty === undefined) ? "/faculty" : "/forum");
          }else{
            setError(res.response)
          }
        }}
      />
      <p className="text-arma-title font-medium">Forgot Password?</p>
    </div>
  );
}
const LoginButton = (props: { onClick: () => Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Spinner className = 'mt-4 mb-2'/>
  ) : (
    <button
      className="outlineBtn text-arma-blue border-[1px] mt-4 rounded-[8px] mb-2"
      onClick={async () => {
        setLoading(true);
        await props.onClick();
        setLoading(false);
      }}
    >
      Login{" "}
    </button>
  );
};


export { Login };
