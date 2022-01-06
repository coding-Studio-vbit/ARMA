import React from "react";
import { InputField } from "../../../components/InputField/InputField";

function FacultyProfile() {
  return (
    <body className="min-h-screen">
      <div>
        <div className="flex justify-end mt-14 pr-10 mb-20">
          <button className="outlineBtn">LOGOUT</button>
        </div>
        <div className="flex flex-col w-[542px] items-center m-auto">
          <p className="text-center item-center text-3xl text-arma-blue">
            Siddharth Malladi

          </p>

          <p className="text-black mt-4 mb-10 text-lg">Faculty</p>
          <div className="flex gap-x-10 mb-10 w-full">
            <InputField className="mb-5" name="Email" onChange={(e) => {}} />
            <InputField className="mb-5" name="Name" onChange={(e) => {}} />
          </div>
          <div className="flex gap-x-10 mb-10 w-full">
            <InputField
              className="mb-5"
              name="Designation"
              onChange={(e) => {}}
            />
            <InputField
              className="mb-5"
              name="Department"
              onChange={(e) => {}}
            />
          </div>
          <div className="w-full	">
            <InputField
              className="mb-5"
              name="Phone Number"
              onChange={(e) => {}}
            />
          </div>
        </div>
      </div>
    </body>
  );
}

export { FacultyProfile };
