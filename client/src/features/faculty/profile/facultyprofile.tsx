import { Edit } from "@material-ui/icons";
import React from "react";
import { InputField } from "../../../components/InputField/InputField";
function FacultyProfile() {
  return (
    <div className="bg-arma-page-background h-screen">
      <div className=" grid justify-end pt-20 mb-20 mr-3">
        <button className="outlineBtn">LOGOUT</button>
      </div>
      <div className="flex flex-col items-center m-auto">
        <p className="text-center item-center text-3xl text-arma-blue">
          Siddharth Malladi
          <Edit className="ml-3" />
        </p>
        <p className="text-black mt-4 mb-10 text-lg">Faculty</p>
        <div>
          <div className="flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
            <InputField
              className="mb-5"
              name="RollNumber"
              onChange={(e) => {}}
            />

            <InputField className="mb-5" name="Email" onChange={(e) => {}} />
          </div>
          <div className="flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
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
          <div className="mx-auto">
            <InputField
              className="mb-5"
              name="Phone Number"
              onChange={(e) => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { FacultyProfile };
