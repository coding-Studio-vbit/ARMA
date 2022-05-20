import Table from "../../../components/CustomTable";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestsList = () => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState<any>({
    label: "ALL",
    value: null,
  });

  const headers = [
    { displayName: "Forum Name", dataPath: "forumID.name", sortable: true },
    {
      displayName: "Faculty Coordinator",
      dataPath: "forumID.facultyCoordinatorID.name",
      sortable: false,
    },
    { displayName: "Event Name", dataPath: "name", sortable: false },
    { displayName: "Status", dataPath: "eventStatus", sortable: false },
  ];
  return (
    <div id="requestsTable" className="mx-32 mt-16">
      <div className="flex justify-between mb-4 items-center">
        <p className="text-arma-title text-2xl ">REQUESTS</p>
        {/* Drop down for filtering based on request status*/}
        <Select
          options={[
            { value: null, label: "ALL" },
            {
              value: "AWAITING FO APPROVAL",
              label: "AWAITING FO APPROVAL",
            },

            {
              value: "BUDGET REJECTED BY SAC",
              label: "BUDGET REJECTED BY SAC",
            },
            { value: "BUDGET REJECTED BY FO", label: "BUDGET REJECTED BY FO" },
            { value: "AWAITING SAC APPROVAL", label: "AWAITING SAC APPROVAL" },
            {
              value: "CHANGES REQUESTED BY SAC",
              label: "CHANGES REQUESTED BY SAC",
            },
            { value: "APPROVED", label: "APPROVED" },
            { value: "REJECTED", label: "REJECTED" },
            { value: "COMPLETED", label: "COMPLETED" },
            { value: "CANCELLED", label: "CANCELLED" },
          ]}
          value={requestStatus}
          onChange={(value) => {
            setRequestStatus(value);
          }}
          className="w-60"
        />
      </div>
      {/* Table */}

      <Table
        api={`${process.env.REACT_APP_SERVER_URL}events/`}
        filter={{ eventStatus: requestStatus.value }}
        headers={headers}
        rowsPerPage={10}
        transformer={(obj) => {
          obj.forumID.name = (
            <div className="flex">
              <img
                className="w-10 h-10 -mt-1 mr-2"
                src={`data:image/png;base64, ${obj.logo}`}
              />
              {obj.forumID.name}
            </div>
          );
          return obj;
        }}
        buttonsCount={4}
        onTableRowClick={(id) => {
          navigate(`/faculty/requests/${id}`);
        }}
      />
    </div>
  );
};

export default RequestsList;
