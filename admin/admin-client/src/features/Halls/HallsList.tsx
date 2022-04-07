import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Table from "../../Components/CustomTable";

export const HallsList = () => {
const [roll,setRoll] = useState("")
const navigate = useNavigate()
    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-arma-title mb-5 text-4xl">Halls</p>
                        </div>
                        <div>
                            <button 
                            className="btn  bg-arma-title rounded-[8px] px-6 py-2 ml-auto flex" 
                            onClick = {() => navigate('/Halls/AddHall')}>
                            Add Hall
                            </button>
                        </div>
                    </div>

                    {/* <button className="btn" onClick = {() => navigate('/Halls/EditHall')}>EDIT</button> */}
                    

                    <Table
                        api={`${process.env.REACT_APP_SERVER_URL + "halls/getHalls"}`}
                        rowsPerPage={3}
                        buttonsCount={4}
                        transformer={(item) => {
                            let newItem = item;
                            newItem.actions = (
                            <span
                                className="text-red-500"
                                onClick={() => {
                                //code to delete this item goes here.
                                console.log("delete me");
                                }}
                            >
                                delete
                            </span>
                            );
                        return newItem;
                      }}
                      headers={[
                        { displayName: "HALL NAME", dataPath: "name", sortable: false },
                        { displayName: "CAPACITY", dataPath: "capacity", sortable: false },
                        { displayName: "ACTIONS", dataPath: "actions", sortable: false },
                      ]}
                    />

                </div>
            </div>
        </div>    
    )
}