import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/CustomTable";

export const AdminList = () => {
  const [roll, setRoll] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
          <div className="grid grid-cols-2">
            <div>
              <p className="text-arma-title mb-5 text-4xl">Admins</p>
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
            headers={[
              { displayName: "E-Mail", dataPath: "email", sortable: false },
              { displayName: "Name", dataPath: "name", sortable: false },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
