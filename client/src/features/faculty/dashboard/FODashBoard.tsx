import { useNavigate } from "react-router-dom";
import Table from "../../../components/CustomTable";
import Select from "react-select";
import { InputField } from "../../../components/InputField/InputField";
import { useState } from "react";
import Navbar from "../../../components/CustomNavbar";
function FODashBoard() {
  const navigate = useNavigate();
  const [status ,setStatus] = useState("")
  const [forumName,setForumName] = useState('')
  const [eventName,setEventName] = useState('')

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
      
   

        <div className="flex flex-col mx-auto w-[90%] md:w-[85%]  xl:w-[70%] mt-8">
          <div className="flex gap-4 mb-6 mx-1 flex-col xl:flex-row justify-between ">
            <h1 className="text-4xl  text-arma-title   my-auto ">Requests</h1>
            <div className="flex gap-4  flex-col sm:flex-row" >
            <InputField name="Forum Name"  onChange={(e)=>setForumName(e.target.value)} />
            <InputField name="Event Name" onChange={(e)=>setEventName(e.target.value)} />
            <Select
            onChange={(e:any)=>setStatus(e?.value)}
            styles={{
        
                control:(base)=>({
                    ...base,
                    height:'100%',
                    width:'236px',
                    minHeight:52,
                    border:'2px solid rgb(200, 200, 200)',
                    borderRadius:'0.5rem'
                })
            }} placeholder="Status"
        
            options={[
                { value: "", label: "ALL" },
                { value: "AWAITING BUDGET APPROVAL", label: "AWAITING BUDGET APPROVAL" },
                { value: "REQUESTED BUDGET CHANGES", label: "REQUESTED BUDGET CHANGES" },
                { value: "REQUESTED BUDGET UPDATED", label: "REQUESTED BUDGET UPDATED" },
                { value: "BUDGET REJECTED", label: "BUDGET REJECTED" },
                { value: "COMPLETED", label: "COMPLETED" },
              ]}
            />
            </div>
          </div>
          <Table
            api={`${process.env.REACT_APP_SERVER_URL}events/`}
            filter={{eventStatus:status, hasBudget:true,forumName:forumName,name:eventName}}
        
            headers={headers}
            rowsPerPage={10}
            buttonsCount={5}
        
          />
        </div>
  );
}

export default FODashBoard;
