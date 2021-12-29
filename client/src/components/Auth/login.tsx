import React from "react";

function Login() {
  return (
    <div className="mt-24 flex flex-col w-screen items-center">
      <p className="text-arma-title text-5xl font-medium mb-2">A.R.M.A</p>
      <p className="text-[#263238] mb-12">
        Automating and Digitalizing Event Organization
      </p>
      <div className="bg-[#F5F5F5] flex w-max rounded-[24px] relative z-[-2] mb-12">
        <div className="absolute bg-arma-blue rounded-[24px] w-6/12 h-full z-[-1]"></div>
        <div className="py-1 pl-8 pr-8 shrink">
          <span className=" text-white font-medium ">Faculty</span>
        </div>
        <div className="py-1 pr-8 pl-8">
          <span className="mr-2 font-medium">Forum</span>
        </div>
      </div>
      <div>
        <input
          className="py-2 px-6 border-[1px] border-[#263238]/[0.4] rounded-[8px] mb-[16px]"
          type="text"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          className="py-2 px-6 border-[1px] border-[#263238]/[0.4] rounded-[8px] mb-12"
          type="text"
          placeholder="Password"
        />
      </div>
      <button className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mb-2">Login</button>
      <p className="text-arma-title font-medium">Forgot Password?</p>
    </div>
  );
}

export { Login };
