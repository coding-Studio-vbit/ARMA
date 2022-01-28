import { useState } from "react";
import Table from "../../../components/CustomTable";


export const Forum_View = () => {
  const [roll,setRoll] = useState("")
  return (
    <div className="flex flex-col sm:mx-6 mb-4">
        <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
            {/* View Forum Title */}
                <p className="text-arma-title mb-5 text-4xl">View Forum</p>

            {/* Forum Details */}
                <p className="text mb-1 text-2xl">Forum Details</p>
                            <div className="grid grid-cols-2 md:grid-cols-4  gap-5 border-2 shadow-md rounded-[16px] p-6">
                                <div className="text-arma-gray text-xl">Forum:</div>
                                <div className="text-xl">coding.Studio();</div>
                                <div className="text-arma-gray text-xl">Founded:</div>
                                <div className="text-xl">2018</div>
                                <div className="text-arma-gray text-xl">Faculty Coordinator:</div>
                                <div className="text-xl">Dr. V. Sridhar Reddy</div>
                                <div className="text-arma-gray text-xl">Point Of Contact:</div>
                                <div className="text-xl">Sai Kiran</div>
                            </div>
            
            {/* Core Team */}
            <p className="text mb-5 mt-5 text-2xl">Core Team</p>
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "NAME", dataPath: "name", sortable: false },
                        { displayName: "ROLL NUMBER", dataPath: "rollNumber", sortable: false },
                        { displayName: "DEPARTMENT", dataPath: "branch", sortable: false },
                        { displayName: "YEAR", dataPath: "year", sortable: false },
                        { displayName: "SECTION", dataPath: "section", sortable: false },
                        { displayName: "ROLE", dataPath: "designation", sortable: false },
                    ]}
                    />
            {/* Members */}
                    <p className="text mb-5 mt-5 text-2xl">Members</p>
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "NAME", dataPath: "name", sortable: false },
                        { displayName: "ROLL NUMBER", dataPath: "rollno", sortable: false },
                        { displayName: "DEPARTMENT", dataPath: "department", sortable: false },
                        { displayName: "YEAR", dataPath: "year", sortable: false },
                        { displayName: "SECTION", dataPath: "section", sortable: false },
                        { displayName: "ROLE", dataPath: "role", sortable: false },
                    ]}
                    />

            {/* Events Conducted */}
                    <p className="text mb-5 mt-5 text-2xl">Events Conducted</p>
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "EVENT NAME", dataPath: "eventname", sortable: false },
                        { displayName: "NO. OF PARTICIPANTS", dataPath: "participantsno", sortable: false },
                        { displayName: "DURATION", dataPath: "duration", sortable: false },
                        { displayName: "ATTENDANCE", dataPath: "attendance", sortable: false },
                    ]}
                    />
                </div>
            </div>
  );
}