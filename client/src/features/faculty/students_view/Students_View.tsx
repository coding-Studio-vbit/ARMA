import { Card, CardContent } from "@material-ui/core";
import React from "react";
import Table from "../../../components/CustomTable";

function Students_View() {
  return (
    <div>
      <div className="text-arma-dark-blue pt-16 px-14">Personal Details</div>
      <div className="grid-cols-3 divide-2">
        <div className="grid grid-cols-3 divide-2">1st</div>
        <div>2nd</div>
      </div>

      <div className="text-arma-dark-blue pt-16 px-14">Memberships</div>
      <div className="w-fit">
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

      <div className="text-arma-dark-blue pt-16 px-14 ">Events Organised</div>
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
      <div className="text-arma-dark-blue pt-16 px-14">Events Participated</div>
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
      <div className="grid justify-items-end my-32">
        <button className="outlineBtn">GENERATE</button>
      </div>
    </div>
  );
}

export { Students_View };
