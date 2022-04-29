import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import Table from "../../Components/CustomTable";
import { InputField } from "../../Components/InputField/InputField";

interface SearchStudentsProps {
  isEdit: boolean;
}

export const EquipList = ({ isEdit }: SearchStudentsProps) => {
  const nav = useNavigate()
  const location: any = useLocation();
  const [nameError, setNameError] = useState<string>();
  const [name, setName] = useState(location.state?.name ?? "");

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  };
const navigate = useNavigate()
    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-arma-title mb-5 text-4xl">Facilities</p>
                            <InputField
                name="Search by equipment name"
                type="text"
                error={nameError}
                onChange={(e) => {
                  validateName(e);
                }}
              />
                        </div>
                        <div>
                            <button 
                            className="btn  bg-arma-title rounded-[8px] px-6 py-2 ml-auto flex" 
                            onClick = {() => navigate('/Facilities/AddEquip')}>
                            Add Facilities
                            </button>
                        </div>
                    </div>

                    {/* <button className="btn" onClick = {() => navigate('/Facilities/EditEquip')}>EDIT</button> */}
                    
                    <Table
                        api={`${process.env.REACT_APP_SERVER_URL + "equipment/getEquipment"}`}
                        rowsPerPage={5}
                        filter={{name:name}}
                        onTableRowClick={(id) => nav(`/Facilities/EditEquip/${id}`)}
                        buttonsCount={3}
                        headers={[
                            { displayName: "EQUIPMENT", dataPath: "name", sortable: false },
                            { displayName: "TOTAL", dataPath: "totalCount", sortable: false },
                        ]}
                        />
                </div>
            </div>
        </div>    
    )
}