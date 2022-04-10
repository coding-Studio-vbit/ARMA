import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/CustomTable";
import Select from "react-select";
import { InputField } from "../../Components/InputField/InputField";
import axiosInstance from "../../utils/axios";
import { useLocation, useParams } from "react-router-dom";

interface SearchStudentsProps {
  isEdit: boolean;
}

export const FacultyList = ({ isEdit }: SearchStudentsProps) => {
  const [roll, setRoll] = useState("");
  const navigate = useNavigate();
  const location: any = useLocation();
  const [uniqueid, setuniqueid] = useState(location.state?.rollNumber ?? "");
  const [email, setEmail] = useState(location.state?.email ?? "");
  const [name, setName] = useState(location.state?.name ?? "");
  const [phone, setPhone] = useState(location.state?.phone ?? "");
  const [uniqueidError, setUniqueidError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [selectYear, setSelectYear] = useState(location.state?.year ?? null);
  const [selectDepartment, setSelectDepartment] = useState(
    location.state?.branch ?? ""
  );
  const [selectSection, setSelectSection] = useState(
    location.state?.section ?? ""
  );
  let { id } = useParams();

  const department = [
    { value: "CSE ", label: "CSE" },
    { value: "ECE ", label: "ECE" },
    { value: "IT", label: "IT" },
  ];

  const year = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const sections = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  const validateUniqueid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueid = e.target.value;
    setuniqueid(uniqueid);
    var rollNumber = uniqueid.toUpperCase();
    let rollRegex = new RegExp(
      /^(18|19|20|21)(p6|p5)(1|5)(a|A)(01|02|03|04|05|12|56|62|66|67|69|70)[(a-z)|(0-9)][0-9]$/i
    );
    if (rollNumber.length === 0) {
      setUniqueidError("roll number cannot be empty");
    } else if (rollNumber.length < 10) {
      setUniqueidError("roll number cannot be less than 10 characters");
    } else if (rollNumber.length > 10) {
      setUniqueidError("roll number cannot exceed 10 characters");
    } else if (!rollRegex.test(rollNumber)) {
      setUniqueidError("roll number invalid");
    } else {
      setUniqueidError("");
    }
  };

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  
};

    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-arma-title mb-5 text-4xl">Faculty</p>
                        </div>
                        <div>
                            <button 
                            className="btn  bg-arma-title rounded-[8px] px-6 py-2 ml-auto flex" 
                            onClick = {() => navigate('/Faculty/AddFaculty')}>
                            Add Faculty
                            </button>
                        </div>
                    </div>

                    {/* <button className="btn" onClick = {() => navigate('/Faculty/EditFaculty')}>EDIT</button> */}

                    <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
                        
                        <InputField
                            name="Search by Unique ID"
                            type="text"
                            error={uniqueidError}
                            onChange={(e) => {
                              setRoll(e.target.value);
                              validateUniqueid(e);
                            }}
                        />
                        
                        <InputField
                          name="Search by name"
                          type="text"
                          error={nameError}
                          onChange={(e) => {
                          validateName(e);
                          }}
                        />
                        
                    </div>
                    
                    <Table
                      api={`${process.env.REACT_APP_SERVER_URL + "faculty/getFaculty"}`}
                      rowsPerPage={5}
                      buttonsCount={3}
                      filter={{ rollNumber: roll, name: name }}
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
                        { displayName: "UNIQUE ID", dataPath: "rollNumber", sortable: true },
                        { displayName: "NAME", dataPath: "name", sortable: true },
                        { displayName: "DESIGNATION", dataPath: "designation", sortable: true },
                        // { displayName: "ROLES", dataPath: "", sortable: false },
                        { displayName: "ACTIONS", dataPath: "actions", sortable: false },
                      ]}
                    />

                </div>
            </div>
            <div>
              <button
                className="btn  bg-arma-title rounded-[8px] px-6 py-2 ml-auto flex"
                onClick={() => navigate("/Faculty/AddFaculty")}
              >
                Add Faculty
              </button>
            </div>
          </div>
  );
};
