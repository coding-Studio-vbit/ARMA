import Table from "../../../components/CustomTable";
import Select from "react-select";
import { useState } from "react";

const RequestsPage = () => {

  const [requestStatus, setRequestStatus] = useState<any>({label:"ALL"});

  return (
    <h1>requests</h1>
    <div>
      <p className="text-3xl text-arma-dark-blue">Requests</p>
      <div id="requestsTable">
        <Select
          options={[
            { value:null, label:"ALL"},
            { value: "APPROVAL PENDING", label: "PENDING" },
            { value: "REQUESTED CHANGES", label: "REQUESTED CHANGES" },
            { value: "APPROVED", label: "APPROVED" },
            { value: "REJECTED", label: "REJECTED" },
            { value: "COMPLETED", label: "COMPLETED"},
          ]}
          value={requestStatus}
          onChange={(value)=>{
            setRequestStatus(value);
          }}
          className="w-40"
        />
        {/* <Table
        api=""
        /> */}
      </div>
    </div>
  );
};

export default RequestsPage;
