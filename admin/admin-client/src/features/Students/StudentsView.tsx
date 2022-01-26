import { useState } from "react";
import Table from "../../Components/CustomTable";

export const StudentView = () => {
  const [roll,setRoll] = useState("")
  return (
    <div className="flex flex-col">
        <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
            {/* View Students Title */}
                <p className="text-arma-title mb-5 text-4xl">View Student</p>
            {/* Personal Details */}
                <p className="text mb-1 text-2xl">Personal Details</p>
               
                            <div className="grid grid-cols-2 md:grid-cols-4  gap-5 border-2 shadow-md rounded-[16px] p-6">
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
               

                    <p className="text mb-5 mt-5 text-2xl">Core Team Member</p>
                    <div  className="flex flex-wrap gap-4 w-[95%]">
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    <span>Designation: SDE</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    <span>Designation: SDE</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    <span>Designation: SDE</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    <span>Designation: SDE</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    <span>Designation: SDE</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    <span>Designation: SDE</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    <span>Designation: SDE</span>
                    </div>
                    </div>
                    <p className="text mb-5 mt-5 text-2xl">Memberships</p>
                    <div className="flex flex-wrap gap-4 w-[95%]">
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    </div>
                    <div className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                    <span>Forum Name: coding.Studio();</span>
                    </div>
                    </div>

    
                        

            {/* Events Organized */}

                    <p className="text mb-5 mt-5 text-2xl">Events Organized</p>
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "FORUM", dataPath: "forum", sortable: false },
                        { displayName: "ROLE", dataPath: "role", sortable: false },
                        { displayName: "EVENT NAME", dataPath: "eventname", sortable: false },
                        { displayName: "DURATION", dataPath: "duration", sortable: false },
                    ]}
                    />


            {/* Events Participated */}

                    <p className="text mb-5 mt-5 text-2xl">Events Participated</p>
                    <Table
                    api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                    rowsPerPage={5}
                    buttonsCount={3}
                    filter={{rollNumber:roll}}
                    headers={[
                        { displayName: "FORUM", dataPath: "forum", sortable: false },
                        { displayName: "EVENT NAME", dataPath: "eventname", sortable: false },
                        { displayName: "DURATION", dataPath: "duration", sortable: false },
                    ]}
                    />

            <div className="ml-auto mt-8">
                <button className="btn mb-8 ml-auto mt-8">GENERATE</button>
            </div>

        </div>
    </div>
  );
}