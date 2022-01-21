import { Card, CardContent } from "@material-ui/core";
import React from "react";
import Table from "../../../components/CustomTable";

function Students_View() {
  return (
    <div>
      <div className="text-arma-dark-blue pt-16 px-14 text-lg">
        Personal Details
      </div>
      <div className="w-4/5 px-14 rounded-[8px]">
        <div className="w-full border-2 shadow-md  rounded-[16px] overflow-clip">
          <div className="grid grid-cols-4 gap-4 m-8">
            <div>
              <div className="flex space-x-4">
                <p className="text-arma-grey mb-5 text-xl">First Name:</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma mb-5 text-xl">Siddharth</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma-grey mb-5 text-xl">Last Name:</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma mb-5 text-xl">Malladi</p>
              </div>
            </div>

            <div>
              <div className="flex space-x-4">
                <p className="text-arma-grey mb-5 text-xl">Year:</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma mb-5 text-xl">4</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma-grey mb-5 text-xl">Department:</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma mb-5 text-xl">CSE</p>
              </div>
            </div>

            <div>
              <div className="flex space-x-4">
                <p className="text-arma-grey mb-5 text-xl">Section:</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma mb-5 text-xl">C</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma-grey mb-5 text-xl">Contact:</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-4">
                <p className="text-arma mb-5 text-xl">9902917558</p>
              </div>
            </div>
            

          

          </div>
        </div>
      </div>

      <div className="text-arma-dark-blue pt-16 px-14 text-lg ">Memberships</div>
      <div className=" px-14">
        <Table
          api="http://localhost:5000/students"
          rowsPerPage={3}
          buttonsCount={1}
          headers={[
            { displayName: "SNo", dataPath: "sno", sortable: true },
            {
              displayName: "Forum",
              dataPath: "forum",
              sortable: false,
            },
            {
              displayName: "Role",
              dataPath: "role",
              sortable: false,
            },
            {
              displayName: "Academic Year",
              dataPath: "academicyear",
              sortable: true,
            },
          ]}
        />
      </div>

      <div className="text-arma-dark-blue pt-16 px-14 text-lg ">
        Events Organised
      </div>
      <div className=" px-14 ">
        <Table
          api="http://localhost:5000/students"
          rowsPerPage={3}
          buttonsCount={1}
          headers={[
            { displayName: "SNo", dataPath: "sno", sortable: true },
            {
              displayName: "Forum",
              dataPath: "forum",
              sortable: false,
            },
            {
              displayName: "Role",
              dataPath: "role",
              sortable: false,
            },
            {
              displayName: "Event Name",
              dataPath: "eventname",
              sortable: false,
            },
            {
              displayName: "Duration",
              dataPath: "forum",
              sortable: true,
            },
          ]}
        />
      </div>
      <div className="text-arma-dark-blue pt-16 px-14">Events Participated</div>
      <div className="px-14 ">
        <Table
          api="http://localhost:5000/students"
          rowsPerPage={3}
          buttonsCount={1}
          headers={[
            { displayName: "SNo", dataPath: "sno", sortable: true },
            {
              displayName: "Forum",
              dataPath: "forum",
              sortable: false,
            },
            {
              displayName: "Event Name",
              dataPath: "forum",
              sortable: false,
            },
            {
              displayName: "Duration",
              dataPath: "forum",
              sortable: true,
            },
            {
              displayName: "Other Remarks",
              dataPath: "other remarks",
              sortable: false,
            },
          ]}
        />
      </div>
      <div className="grid justify-items-end my-32">
        <button className="outlineBtn">GENERATE</button>
      </div>
    </div>
  );
}

export { Students_View };
