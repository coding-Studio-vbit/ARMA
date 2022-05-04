import { ChangeEvent, useEffect, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";
import axios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

interface AddRolesProps {
  isEdit: boolean;
}

export const AddRoles = ({ isEdit }: AddRolesProps) => {
  useEffect(() => {
    const role = async () => {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "roles/viewRoles",
        { id: id }
      );
      const data = res.data.response;
      console.log(data);
      setName(data?.name);
    };
    if (isEdit) {
      role();
    }
  }, []);
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string>("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showError, setShowError] = useState<string>("");
  const [response, setResponse] = useState("");
  let { id } = useParams();
  console.log(id);

  const [selectRoles, setSelectRoles] = useState<(string | undefined)[]>([]);

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  };

  const deleteItem = async () => {
    setShowError("");
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "roles/deleteRole",
      { id: id }
    );
    const data = res.data;
    if (data.status === 1) {
      setResponse("Deleted");
      setShow(true);
      nav("/Students/");
    } else {
      setResponse(data.response.message);
      setShow(true);
    }
  };

  const loginValidate = async () => {
    if (name.length === 0 || nameError?.length !== 0) {
      setShowError("Fill details appropriately");
    } else {
      if (!isEdit) {
        setShowError("");
        const res = await axios.post(
          process.env.REACT_APP_SERVER_URL + "roles/addRoles",
          { name: name }
        );
        const data = res.data;
        if (data.status === 1) {
          setResponse("New Role Added");
          setShow(true);
        } else {
          setResponse(data.response);
          setShow(true);
        }
      } else {
        setShowError("");
        const res = await axios.put(
          process.env.REACT_APP_SERVER_URL + "roles/editRoles",
          { id: id, name: name }
        );
        const data = res.data;
        if (data.status === 1) {
          setResponse("Role Details Edited");
          setShow(true);
        } else {
          setResponse(data.response.message);
          setShow(true);
        }
      }
    }
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
        <p className="text-center  text-arma-title text-2xl font-medium mb-4 ml-2 ">
          {isEdit ? "EDIT ROLES" : "ADD ROLES"}
        </p>
        {isEdit && (
          <button
            className="btn flex justify-center ml-auto mr-auto bg-arma-red hover:bg-arma-red rounded-[8px] px-2 py-1 mb-16"
            onClick={() => {
              setShow1(true);
            }}
          >
            Delete
          </button>
        )}
        <Dialog
          show={show1}
          setShow={setShow1}
          title="Are you sure you want to proceed?"
        >
          <button className="outlineBtn" onClick={() => setShow1(false)}>
            Cancel
          </button>
          <button
            className="btn"
            onClick={() => {
              deleteItem();
            }}
          >
            Proceed
          </button>
        </Dialog>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Name"
            type="text"
            value={name}
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
        </div>
        <Dialog show={show} setShow={setShow} title={response}>
          {" "}
        </Dialog>

        <button
          className="btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center"
          onClick={() => {
            loginValidate();
          }}
        >
          {isEdit ? "SAVE" : "ADD"}
        </button>
        {showError.length !== 0 && (
          <span className="text-red-500 text-sm flex justify-center mt-2">
            {showError}
          </span>
        )}
      </div>
    </div>
  );
};
