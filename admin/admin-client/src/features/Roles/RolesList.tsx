import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "../../Components/CustomTable";
import { InputField } from "../../Components/InputField/InputField";

export const RolesList = () => {
  const navigate = useNavigate();
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

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
          <div className="grid grid-cols-2">
            <div>
              <p className="text-arma-title mb-5 text-4xl">Roles</p>
              <InputField
                name="Search by role name"
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
                onClick={() => navigate("/Roles/AddRoles")}
              >
                Add Role
              </button>
            </div>
          </div>

          {/* <button className="btn" onClick = {() => navigate('/Admins/EditRoles')}>EDIT</button> */}

          <Table
            api={`${process.env.REACT_APP_SERVER_URL + "roles/getRoles"}`}
            filter={{ name: name }}
            rowsPerPage={5}
            buttonsCount={3}
            headers={[
              { displayName: "S.NO", dataPath: "name", sortable: false },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
