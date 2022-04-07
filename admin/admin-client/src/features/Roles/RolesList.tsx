import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Table from "../../Components/CustomTable";

export const RolesList = () => {
const [roll,setRoll] = useState("")
const navigate = useNavigate()
    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-arma-title mb-5 text-4xl">Roles</p>
                        </div>
                        <div>
                            <button 
                            className="btn  bg-arma-title rounded-[8px] px-6 py-2 ml-auto flex" 
                            onClick = {() => navigate('/Roles/AddRoles')}>
                            Add Role
                            </button>
                        </div>
                    </div>

                    {/* <button className="btn" onClick = {() => navigate('/Admins/EditRoles')}>EDIT</button> */}
                    
                    {/* Need more datapath for roles */}

                    <Table
                        api={`${process.env.REACT_APP_SERVER_URL + "roles/getRoles"}`}
                        rowsPerPage={5}
                        buttonsCount={3}
                        filter={{rollNumber:roll}}
                        headers={[
                            { displayName: "NAME", dataPath: "name", sortable: false },
                            // { displayName: "ROLE", dataPath: "role", sortable: false },
                            // { displayName: "PERMISSIONS", dataPath: "permissions", sortable: false },
                            // { displayName: "ACTIONS", dataPath: "actions", sortable: false },
                        ]}
                        />
                </div>
            </div>
        </div>    
    )
}