import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Table from "../../Components/CustomTable";
import { InputField } from "../../Components/InputField/InputField";
import { useLocation, useParams } from "react-router-dom";


export const ForumsList = () => {
const [roll,setRoll] = useState("")
const navigate = useNavigate()
const location:any = useLocation()
const [nameError, setNameError] = useState<string>();
const [name, setName] = useState(location.state?.name ?? "");

const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } 
    else {
        setNameError("");
      }
    
  };


    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-arma-title mb-5 text-4xl">Forums</p>
                        </div>
                        <div>
                            <button 
                            className="btn  bg-arma-title rounded-[8px] px-6 py-2 ml-auto flex" 
                            onClick = {() => navigate('/Forums/AddForums')}>
                            Add Forum
                            </button>
                        </div>
                    </div>

                    <InputField
                        name="Search by forum name"
                        type="text"
                        error={nameError}
                        onChange={(e) => {
                        validateName(e);
                        }}
                        />

                    {/* <button className="btn" onClick = {() => navigate('/Forums/EditForums')}>EDIT</button> */}

                    <Table
                        api={`${process.env.REACT_APP_SERVER_URL + "..."}`}
                        rowsPerPage={5}
                        buttonsCount={3}
                        filter={{rollNumber:roll}}
                        headers={[
                            { displayName: "S.NO", dataPath: "forum", sortable: false },
                            { displayName: "FORUM NAME", dataPath: "eventname", sortable: false },
                            { displayName: "FACULTY COORDINATOR", dataPath: "duration", sortable: false },
                            { displayName: "POINT OF CONTACT", dataPath: "duration", sortable: false },
                            { displayName: "ACTIONS", dataPath: "duration", sortable: false },
                        ]}
                        />
                </div>
            </div>
        </div>    
    )
}