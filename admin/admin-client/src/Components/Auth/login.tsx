import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../InputField/InputField";
import { login } from "./authService";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { useUser } from "../../Provider/userProvider";
import Spinner  from "../Spinner/Spinner";

function Login() {
  let navigate = useNavigate();
  const { user,setUser } = useUser();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [error, setError] = useState<String>("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/Admins", { replace: true });
    } 
  }, [user]);

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
    <div className="mt-32 flex flex-col w-full overflow-hidden items-center">
      <p className="text-arma-title text-5xl font-medium mb-2">A.R.M.A</p>
      <p className="text-[#263238] mb-8 text-xl text-center">
        Automating and Digitalizing Event Organization
      </p>
     
       
      <p className="text-4xl mb-8 text-[#6FB4DC]" >Admin Portal</p>
      <form className="flex flex-col items-center" >
      <InputField
        className="mb-5"
        name="Email"
        error={emailError}
        onChange={(e) => {
          validateEmail(e);
        }}
      />
      <div className="relative mb-8">
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
  

          const res = await login(email, password);

          if (res.status === 1) {
            setUser(res.response.user)
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
      Login
    </button>
  );
};

export { Login };
