import React, { useEffect, useState } from "react";
import { InputField } from "../InputField/InputField";
import lottie from "lottie-web";
import animation from "../animations/emailVerfication.json";

interface forgotPasswordProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPassword = () => {
  const [email, setEmail] = useState<String>("");
  const [emailError, setEmailError] = useState<string>();
  const [Submitted, setSubmitted] = useState<boolean>(false);

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
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: document.getElementById(
        "animationEmailContainer"
      ) as HTMLInputElement,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: animation,
    });
    return () => anim.destroy();
  }, []);
  const onSubmit = async () => {
    await setSubmitted(true);
    const anim = lottie.loadAnimation({
      container: document.getElementById(
        "animationEmailContainer"
      ) as HTMLInputElement,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: animation,
    });
    await lottie.play();
  };
  if (Submitted)
    return (
      <div className="flex flex-col h-screen justify-center items-center svg-background">
        <div className="flex flex-col h-screen justify-center items-center">
          <div
            className="text-arma-title text-2xl font-medium mx-5 text-justify mb-3"
            style={{ color: "rgb(19,155,235)" }}
          >
            Reset password link was sent
          </div>
          <div className="text-gray-500 font-light mx-5 text-justify">
            Check your email for a link to reset your password.
          </div>
          <div className="w-50 md:w-1/3" id="animationEmailContainer"></div>
          <div className="text-gray-500 font-light mx-5 text-justify">
            Did not receive the email?{" "}
            <button style={{ color: "rgb(19,155,235)" }}>
              click here to resend it.
            </button>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col h-screen justify-center items-center svg-background">
        <div className="flex flex-col h-screen justify-center items-center">
          <div
            className="text-arma-title text-2xl font-medium mx-5 text-justify mb-3"
            style={{ color: "rgb(19,155,235)" }}
          >
            Did someone forget their password?
          </div>
          <div className="text-gray-500 font-light mx-5 text-justify mb-6">
            It is alright, enter your registered email ID and we will send you a
            reset mail.
          </div>
          <InputField
            className="mb-[38px]"
            name="Email"
            error={emailError}
            onChange={(e) => {
              validateEmail(e);
            }}
          />
          <button
            className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mb-2 px-[110px] py-[0.5rem]"
            onClick={onSubmit}
          >
            Submit{" "}
          </button>
        </div>
      </div>
    );
};

export { ForgotPassword };
