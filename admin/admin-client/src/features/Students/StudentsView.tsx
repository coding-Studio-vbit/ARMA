import { useState } from "react";
import Table from "../../Components/CustomTable";

export const StudentView = () => {
  const [roll,setRoll] = useState("")
  return (
    <div className="flex flex-col grow">
        <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
            {/* View Students Title */}
            <div>
                <p className="text-arma-title mb-5 text-4xl">View Student</p>
            </div>

            {/* Personal Details */}
            <div>
                <p className="text mb-1 text-2xl">Personal Details</p>
            </div>
            <div>
                <div className="w-full min-w-max rounded-[8px]">
                    <div className="w-full border-2 shadow-md rounded-[16px] overflow-clip">
                        <div className="m-8">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="text-arma-gray text-xl">First Name:</div>
                                <div className="text-xl">Michael</div>
                                <div className="text-arma-gray text-xl">Last Name:</div>
                                <div className="text-xl">Schumacher</div>
                                <div className="text-arma-gray text-xl">Year:</div>
                                <div className="text-xl">IV</div>
                                <div className="text-arma-gray text-xl">Department:</div>
                                <div className="text-xl">CSE</div>
                                <div className="text-arma-gray text-xl">Section:</div>
                                <div className="text-xl">C</div>
                                <div className="text-arma-gray text-xl">Contact:</div>
                                <div className="text-xl">6969420420</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Memberships */}
            <div>
                <div>
                    <p className="text mb-5 mt-5 text-2xl">Memberships</p>
                </div>
                <div className="w-full min-w-max rounded-[8px] ">
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "SNO", dataPath: "sno", sortable: false,},
                        { displayName: "FORUM", dataPath: "forum", sortable: false },
                        { displayName: "ROLE", dataPath: "role", sortable: false },
                        { displayName: "ACADEMIC YEAR", dataPath: "academicyear", sortable: false },
                    ]}
                    />
                </div>
            </div>

            {/* Events Organized */}
            <div>
                <div>
                    <p className="text mb-5 mt-5 text-2xl">Events Organized</p>
                </div>
                <div className="w-full min-w-max rounded-[8px] ">
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "SNO", dataPath: "sno", sortable: false,},
                        { displayName: "FORUM", dataPath: "forum", sortable: false },
                        { displayName: "ROLE", dataPath: "role", sortable: false },
                        { displayName: "EVENT NAME", dataPath: "eventname", sortable: false },
                        { displayName: "DURATION", dataPath: "duration", sortable: false },
                    ]}
                    />
                </div>
            </div>

            {/* Events Participated */}
            <div>
                <div>
                    <p className="text mb-5 mt-5 text-2xl">Events Participated</p>
                </div>
                <div className="w-full min-w-max rounded-[8px] ">
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "SNO", dataPath: "sno", sortable: false,},
                        { displayName: "FORUM", dataPath: "forum", sortable: false },
                        { displayName: "EVENT NAME", dataPath: "eventname", sortable: false },
                        { displayName: "DURATION", dataPath: "duration", sortable: false },
                        { displayName: "OTHER REMARKS", dataPath: "otherRemarks", sortable: false },
                    ]}
                    />
                </div>
            </div>

            <div className="ml-auto mt-8">
                <button className="btn mb-8 ml-auto mt-8">GENERATE</button>
            </div>

        </div>
    </div>
  );
}