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
    <div className="mt-8 overflow-x-auto">
      <div className="flex flex-col items-center m-auto sm:w-[80%] md:w-max w-[90%] ">
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
              className="mb-5"
              name="Forum Description"
              value={description}
              disabled={!isEdit}
              onChange={(e) => {setDescription(e.target.value)}}
            />
          </div>
          <div className="flex flex-col w-full md:flex-row sm:gap-x-8">
            <InputField
              className="mb-5"
              name="Faculty Coordinator" 
              disabled={!isEdit}
              value={facultycoordinator}
              onChange={(e) => {setFacultycoordinator(e.target.value)}}
            />
            <InputField
              className="mb-5"
              name="Forum Email"
              value={forumEmail}
              disabled={!isEdit}
              onChange={(e) =>{setForumEmail(e.target.value)}}
            />
          </div>
          {isEdit && (
          <button
            className="btn  bg-arma-title rounded-[8px] px-6 py-2 m-auto"
            onClick={() => setIsEdit(false)}
          >
            SAVE
          </button>
        )}
      </div>
          <div className="md:mx-[5rem] lg:mx-[8rem] xl:mx-[12rem] sm:mx-[2rem] mx-4  mt-4">
          <div className="flex flex-col  gap-2 sm:flex-row  mb-4">
              <span className="text-arma-gray font-semibold text-lg">Forum Core Team</span>
              <button className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1 ">ADD</button>
              <button className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1">GENERATE CERTIFICATE</button>
          </div>
          <div className="l">
          <Table
          api={`${process.env.REACT_APP_SERVER_URL + "forum/getCoreForumMembers"}`}
          rowsPerPage={2}
          buttonsCount={1}
          filter={{name:forum?.name}}
          headers={[
            {
              displayName: "Roll Number",
              dataPath: "studentID.rollNumber",
              sortable: true,
            },
            { displayName: "Name", dataPath: "studentID.name", sortable: false },
            { displayName: "Department", dataPath: "studentID.branch", sortable: true },
            { displayName: "Year", dataPath: "studentID.year", sortable: true },
            { displayName: "Section", dataPath: "studentID.section", sortable: false },
          ]}
        />
        </div>
        <div className="flex flex-col  gap-2 sm:flex-row  mb-4">
              <span className="text-arma-gray font-semibold text-lg">Forum Members</span>
              <button className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1 ">ADD</button>
              <button className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1">GENERATE CERTIFICATE</button>
          </div>
          <div className="">
          <Table
          api={`${process.env.REACT_APP_SERVER_URL + "forum/getForumMembers"}`}
          rowsPerPage={2}
          buttonsCount={1}
          filter={{name:forum?.name}}
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
