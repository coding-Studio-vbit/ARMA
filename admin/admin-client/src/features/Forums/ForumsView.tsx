import { useState } from "react";
import Table from "../../Components/CustomTable";

export const ForumsView = () => {
  const [roll,setRoll] = useState("")
  return (
    <div className="flex flex-col grow overflow-x-auto">
        <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
            {/* View Forum Title */}
            <div>
                <p className="text-arma-title mb-5 text-4xl">View Forum</p>
            </div>

            {/* Forum Details */}
            <div>
                <p className="text mb-1 text-2xl">Forum Details</p>
            </div>
            <div>
                <div className="w-full min-w-max rounded-[8px]">
                    <div className="w-full border-2 shadow-md rounded-[16px] overflow-x-auto">
                        <div className="m-8">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="text-arma-gray text-xl">Forum:</div>
                                <div className="text-xl">coding.Studio();</div>
                                <div className="text-arma-gray text-xl">Founded:</div>
                                <div className="text-xl">2018</div>
                                <div className="text-arma-gray text-xl">Faculty Coordinator:</div>
                                <div className="text-xl">Dr. V. Sridhar Reddy</div>
                                <div className="text-arma-gray text-xl">Point Of Contact:</div>
                                <div className="text-xl">Sai Kiran</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Members */}
            <div>
                <div>
                    <p className="text mb-5 mt-5 text-2xl">Members</p>
                </div>
                <div className="w-full min-w-max rounded-[8px] ">
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "SNO", dataPath: "sno", sortable: false,},
                        { displayName: "NAME", dataPath: "name", sortable: false },
                        { displayName: "ROLL NUMBER", dataPath: "rollno", sortable: false },
                        { displayName: "DEPARTMENT", dataPath: "department", sortable: false },
                        { displayName: "YEAR", dataPath: "year", sortable: false },
                        { displayName: "SECTION", dataPath: "section", sortable: false },
                        { displayName: "ROLE", dataPath: "role", sortable: false },
                        { displayName: "JOINING DATE", dataPath: "joiningdate", sortable: false },
                    ]}
                    />
                </div>
            </div>

            {/* Events Conducted */}
            <div>
                <div>
                    <p className="text mb-5 mt-5 text-2xl">Events Conducted</p>
                </div>
                <div className="w-full min-w-max rounded-[8px] ">
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "SNO", dataPath: "sno", sortable: false,},
                        { displayName: "EVENT NAME", dataPath: "eventname", sortable: false },
                        { displayName: "NO. OF PARTICIPANTS", dataPath: "participantsno", sortable: false },
                        { displayName: "DURATION", dataPath: "duration", sortable: false },
                        { displayName: "ATTENDANCE", dataPath: "attendance", sortable: false },
                    ]}
                    />
                </div>
            </div>

        </div>
    </div>
  );
}