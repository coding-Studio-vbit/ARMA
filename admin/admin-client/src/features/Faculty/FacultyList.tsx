import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/CustomTable";
import { InputField } from "../../Components/InputField/InputField";
import { useLocation } from "react-router-dom";

interface SearchStudentsProps {
  isEdit: boolean;
}

export const FacultyList = ({ isEdit }: SearchStudentsProps) => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const [uniqueid, setuniqueid] = useState(location.state?.rollNumber ?? "");
  const [name, setName] = useState(location.state?.name ?? "");
  const [uniqueidError, setUniqueidError] = useState<string>();
  const [nameError, setNameError] = useState<string>();

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  };

  return (
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
                onClick={() => navigate("/Faculty/AddFaculty")}
              >
                Add Faculty
              </button>
            </div>
          </div>

          {/* <button className="btn" onClick = {() => navigate('/Faculty/EditFaculty')}>EDIT</button> */}

          <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
            <InputField
              name="Search by name"
              type="text"
              error={nameError}
              onChange={(e) => {
                validateName(e);
              }}
            />

            <InputField
              name="Search by roll number"
              type="text"
              error={uniqueidError}
              onChange={(e) => {
                setuniqueid(e.target.value.trim());
              }}
            />
          </div>

          <Table
            api={`${process.env.REACT_APP_SERVER_URL + "faculty/getFaculty"}`}
            rowsPerPage={5}
            buttonsCount={3}
            onTableRowClick={(id) => navigate(`/Faculty/EditFaculty/${id}`)}
            filter={{ rollNumber: uniqueid, name: name }}
            headers={[
              {
                displayName: "UNIQUE ID",
                dataPath: "rollNumber",
                sortable: true,
              },
              { displayName: "NAME", dataPath: "name", sortable: true },
              {
                displayName: "DESIGNATION",
                dataPath: "designation",
                sortable: false,
              },
              {
                displayName: "email",
                dataPath: "email",
                sortable: false,
              },
              {
                displayName: "phone",
                dataPath: "phone",
                sortable: false,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
