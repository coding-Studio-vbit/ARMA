import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputField } from "../../Components/InputField/InputField";
import Table from "../../Components/CustomTable";
import validator from "validator";

export const AdminList = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const [nameError, setNameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [name, setName] = useState(location.state?.name ?? "");
  const [email, setEmail] = useState(location.state?.email ?? "");

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  };
  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (email.length === 0) {
      setEmailError("email field is empty");
    } else if (validator.isEmail(email)) {
    } else {
      setEmailError("");
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
          <div className="grid grid-cols-2">
            <div>
              <p className="text-arma-title mb-5 text-4xl">Admins</p>
              <div className="flex space-x-3">
                <InputField
                  name="Search by admin name"
                  type="text"
                  error={nameError}
                  onChange={(e) => {
                    validateName(e);
                  }}
                />
                <InputField
                  name="Search by admin email"
                  type="text"
                  error={nameError}
                  onChange={(e) => {
                    validateEmail(e);
                  }}
                />
              </div>
            </div>

            <div>
              <button
                className="btn  bg-arma-title rounded-[8px] px-6 py-2 ml-auto flex"
                onClick={() => navigate("/Admins/AddAdmin")}
              >
                Add Admin
              </button>
            </div>
          </div>

          {/* <button className="btn" onClick = {() => navigate('/Admins/EditAdmin')}>EDIT</button> */}

          <Table
            api={`${process.env.REACT_APP_SERVER_URL + "admin"}`}
            rowsPerPage={5}
            buttonsCount={3}
            filter={{name:name, email:email}}
            headers={[
              { displayName: "E-Mail", dataPath: "email", sortable: true },
              { displayName: "Name", dataPath: "name", sortable: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
