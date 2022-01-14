import { Edit } from "@material-ui/icons";
import { userInfo } from "os";
import React, { useState } from "react";
import { InputField } from "../../../components/InputField/InputField";
import { useUser } from "../../../providers/user/UserProvider";

function FacultyProfile() {
  const [isEdit, setIsedit] = useState(false);
  const { faculty } = useUser();
  const [rollNumber, setrollNumber] = useState<string>(faculty?.rollNumber ?? " ");
  const [email, setEmail] = useState<string>(faculty?.email ?? " ");
  const [designation, setDesignation] = useState<string>(faculty?.designation ?? " ");
  const [department, setDepartment] = useState<string>(faculty?.department ?? " ");
  const [phone, setPhone] = useState<string>(faculty?.phone ?? " ");

  return (
    <div className="bg-arma-page-background h-screen mt-24">
      <div className="flex flex-col items-center m-auto">
        <p className="text-center item-center text-2xl font-semibold text-arma-blue">
          {faculty?.name}
          {!isEdit && (
            <Edit
              className="ml-3 text-black !text-xl cursor-pointer"
              onClick={() => {
                setIsedit(true);
              }}
            />
          )}
        </p>
        <p className="text-black mt-4 mb-10 text-lg">Faculty</p>
        <div>
          <div className="flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
            <InputField
              className="mb-5"
              name="RollNumber"
              value={rollNumber}
              onChange={(e) => {setrollNumber(e.target.value)}} 
              disabled={!isEdit} 
            />

            <InputField
              className="mb-5"
              name="Email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}} 
              disabled={!isEdit}
            />
          </div>
          <div className="flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
            <InputField
              className="mb-5"
              name="Designation"
              value={designation} 
              onChange={(e) => {setDesignation(e.target.value)}}
              disabled={!isEdit}
            />
            <InputField
              className="mb-5"
              name="Department"
              value={department}
              onChange={(e) => {setDepartment(e.target.value)}}
              disabled={!isEdit}
            />
          </div>
          <div className="mx-auto">
            <InputField
              className="mb-5"
              name="Phone Number"
              value={phone}
              onChange={(e) => {setPhone(e.target.value)}}
              disabled={!isEdit}
            />
          </div>
        </div>
        {isEdit && (
          <button
            className="btn  bg-arma-title rounded-[8px] px-6 py-2 m-auto"
            onClick={() => setIsedit(false)}
          >
            SAVE
          </button>
        )}
      </div>
    </div>
  );
}

export { FacultyProfile };
