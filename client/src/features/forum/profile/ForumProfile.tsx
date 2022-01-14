import { AccountCircle, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import Table from "../../../components/CustomTable";
import { InputField } from "../../../components/InputField/InputField";
import { useUser } from "../../../providers/user/UserProvider";

export default function ForumProfile() {
  const { forum } = useUser();
  const [isEdit, setIsEdit] = useState(false);
  const [forumName, setForumName] = useState<string>(forum?.name ?? " ")
  const [description, setDescription] = useState<string>(forum?.description ?? " ")
  const [facultycoordinator, setFacultycoordinator] = useState<string>(forum?.facultyCoordinator ?? " ")
  const [forumEmail, setForumEmail] = useState<string>(forum?.email ?? " ")
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center m-auto w-max">
        <AccountCircle className="!text-7xl text-arma-title"/>
        <p className="text-center item-center text-2xl font-semibold text-arma-blue">
          {forum?.name}
          {!isEdit && (
            <Edit
              className="ml-3 text-black !text-xl cursor-pointer"
              onClick={() => {
                setIsEdit(true);
              }}
            />
          )}
        </p>
        <p className="text-black mb-10 text-lg">Forum</p>
        <div className="mx-auto w-full">
            <InputField
              className="mb-5 !h-max"
              name="Forum Description"
              value={description}
              onChange={(e) => {setDescription(e.target.value)}}
            />
          </div>
          <div className="flex flex-col  md:flex-row sm:gap-x-8">
            <InputField
              className="mb-5"
              name="Faculty Coordinator" 
              value={facultycoordinator}
              onChange={(e) => {setFacultycoordinator(e.target.value)}}
            />
            <InputField
              className="mb-5"
              name="Forum Email"
              value={forumEmail}
              onChange={(e) =>{setForumEmail(e.target.value)}}
            />
          </div>
      </div>
          <div className="ml-[10rem] mt-4">
          <div className="flex gap-x-2 mb-4">
              <span className="text-arma-gray font-semibold text-lg">Forum Core Team</span>
              <button className="btn  bg-arma-blue rounded-[8px] px-6 py-1 ">ADD</button>
              <button className="btn  bg-arma-blue rounded-[8px] px-6 py-1">GENERATE FORUM CERTIFICATE</button>
          </div>
          <div className="w-[90%] min-w-max rounded-[8px] mb-8 ">
          <Table
          api={`${process.env.REACT_APP_SERVER_URL + "students"}`}
          rowsPerPage={2}
          buttonsCount={3}
          filter={{}}
          headers={[
            {
              displayName: "Roll Number",
              dataPath: "rollNumber",
              sortable: true,
            },
            { displayName: "Name", dataPath: "name", sortable: false },
            { displayName: "Department", dataPath: "branch", sortable: true },
            { displayName: "Year", dataPath: "year", sortable: true },
            { displayName: "Section", dataPath: "section", sortable: false },
          ]}
        />
        </div>
        <div className="flex gap-x-2 mb-4">
              <span className="text-arma-gray font-semibold text-lg">Forum Members</span>
              <button className="btn  bg-arma-blue rounded-[8px] px-6 py-1 ">ADD</button>
              <button className="btn  bg-arma-blue rounded-[8px] px-6 py-1">GENERATE FORUM CERTIFICATE</button>
          </div>
          <div className="w-[90%] min-w-max rounded-[8px] mb-8 ">
          <Table
          api={`${process.env.REACT_APP_SERVER_URL + "students"}`}
          rowsPerPage={2}
          buttonsCount={3}
          filter={{}}
          headers={[
            {
              displayName: "Roll Number",
              dataPath: "rollNumber",
              sortable: true,
            },
            { displayName: "Name", dataPath: "name", sortable: false },
            { displayName: "Department", dataPath: "branch", sortable: true },
            { displayName: "Year", dataPath: "year", sortable: true },
            { displayName: "Section", dataPath: "section", sortable: false },
          ]}
        />
        </div>
    </div>
    </div>
  );
}
