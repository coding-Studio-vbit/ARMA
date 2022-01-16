import Table from "../../../components/CustomTable";
import Select from "react-select";
import { useState } from "react";
import { RemoveRedEye } from "@material-ui/icons";
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
    { displayName: "Actions", dataPath: "actions", sortable: false },
  ];
  return (
    <div id="requestsTable">
      <div className="flex mt-4 ml-2 mb-4 justify-around sm:justify-between sm:mx-16">
        <p className="text-arma-title text-2xl text-arma-dark-blue">REQUESTS</p>
        {/* Drop down for filtering based on request status*/}
        <Select
          options={[
            { value: null, label: "ALL" },
            { value: "APPROVAL PENDING", label: "PENDING" },
            { value: "REQUESTED CHANGES", label: "REQUESTED CHANGES" },
            { value: "APPROVED", label: "APPROVED" },
            { value: "REJECTED", label: "REJECTED" },
            { value: "COMPLETED", label: "COMPLETED" },
          ]}
          value={requestStatus}
          onChange={(value) => {
            setRequestStatus(value);
          }}
          className="w-40"
        />
      </div>
      {/* Table */}
      <div className="sm:w-max mx-auto overflow-auto">
        <Table
          api={`${process.env.REACT_APP_SERVER_URL}events`}
          filter={{ eventStatus: requestStatus.value }}
          headers={headers}
          rowsPerPage={10}
          buttonsCount={4}
          transformer={(row) => {
            row.actions = (
              <div>
                <span
                  className="text-arma-dark-blue"
                  onClick={() => {
                    navigate(`/faculty/requests/${row._id}`);
                  }}
                >
                  <RemoveRedEye />
                </span>
              </div>
            );
            return row;
          }}
        />
      </div>
    </div>
  );
};

export default RequestsList;
