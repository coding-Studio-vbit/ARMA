import React, { useEffect, useState } from "react";
import { InputField } from "../../../components/InputField/InputField";

interface forgotPasswordProps {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }
const EventVenue = () => {
  const [email, setEmail] = useState<String>("");
  const [emailError, setEmailError] = useState<string>();

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

  return (
    <div className="flex flex-col h-100 justify-center items-center">
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="text-arma-title text-2xl font-medium mx-5 text-justify mb-3" style={{color:"rgb(19,155,235)"}}>Did someone forget their password?</div>
            <div className="text-gray-500 font-light mx-5 text-justify mb-6">It is alright, enter your registered email ID and we will send you a reset mail.</div>
            <InputField
                className="mb-[35px]"
                name="Email"
                error={emailError}
                onChange={(e) => {
                validateEmail(e);
                }}
            />
            <button
            className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mb-2 px-[110px] py-[0.5rem]"
            >
            Submit{" "}
            </button>
        </div>
    </div>
  );
}

export { EventVenue };
