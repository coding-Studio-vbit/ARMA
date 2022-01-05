import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../InputField/InputField";
import { Spinner } from "../Spinner/Spinner";
import { login } from "./authService";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { useUser } from "../../providers/user/UserProvider";

function Login() {
  let navigate = useNavigate();
  const { forum, faculty, setFaculty, setForum } = useUser();
  const [isFaculty, setIsFaculty] = useState<boolean | undefined>(true);
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [error, setError] = useState<String>("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (forum) {
      navigate("/forum", { replace: true });
    } else if (faculty) {
      navigate("/faculty", { replace: true });
    }
  }, [forum, faculty, navigate]);

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
      <p className="text-[#263238] mb-8 text-center">
        Automating and Digitalizing Event Organization
      </p>
      <div
        className="bg-[#F5F5F5] cursor-pointer flex w-max rounded-[24px] relative  mb-8 "
        
      >
        <div
          className={` absolute ${!isFaculty && "userdiv"} ${
            isFaculty === true && "userdivback"
          }  bg-arma-blue rounded-[24px] w-6/12 h-full `}
        ></div>
        <div className="py-1 pl-8 pr-8 shrink z-10 " onClick={() => {
          setIsFaculty(true);
          setEmailError("");
          setPasswordError("");
        }}>
          <span
            className={`${
              isFaculty && "text-white"
            }  font-medium`}
          >
            Faculty
          </span>
        </div>
        <div
          className={`rounded-[24px] py-1 pr-8 pl-8 z-10`}
          onClick={() => {
            setIsFaculty(false);
            setEmailError("");
            setPasswordError("");
          }}
        >
          <span
            className={` ${
              !isFaculty && "text-white"
            } font-medium`}
          >
            Forum
          </span>
        </div>
      </div>
      <form className="flex flex-col items-center" >
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
          className="mb-3"
          name="Password"
          type={`${!showPassword && "password"}`}
          error={passwordError}
          onChange={(e) => {
            validatePass(e);
          }}
        />
        {showPassword ? (
          <Visibility
            className="absolute top-[0.85rem] right-3 text-arma-title cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <VisibilityOff
            className="absolute top-[0.85rem] right-3 text-arma-title cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
      {error && <span className="text-arma-red mb-3">{error}</span>}
      <LoginButton
        onClick={async () => {

          if(!email || !password || emailError || passwordError ){
            setError('Fill the details !')
            return
          }
          const userType =
            isFaculty === true || isFaculty === undefined ? "FACULTY" : "FORUM";

          const res = await login(email, password, userType);
          console.log(res);

          if (res.status === 1) {
            if (userType === "FACULTY") {
              setFaculty(res.response.user);
            } else {
              setForum(res.response.user);
            }
          } else {
            setError(res.response);
          }
        }}
      />
        </form>
      <p className="text-arma-title font-medium">Forgot Password?</p>
    </div>
  );
}
const LoginButton = (props: { onClick: () => Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Spinner className="mt-4 mb-2" />
  ) : (
    <button
      className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mb-2"
      type="submit"
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
