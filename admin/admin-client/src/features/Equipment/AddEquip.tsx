import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";
import axios from "../../utils/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface AddEquipProps {
  isEdit: boolean;
}

export const AddEquip = ({ isEdit }: AddEquipProps) => {
  const nav = useNavigate();
  const location: any = useLocation();
  let { id } = useParams();
  useEffect(() => {
    const student = async () => {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "equipment/viewEquipment",
        { id: id }
      );
      const data = res.data.response;
      console.log(data);
      setName(data?.name);
      setQuantity(data?.totalCount);
      setActualName(data?.facultyIncharge.name);
      setSelectIncharge(data?.facultyIncharge.name);
    };
    if (isEdit) {
      student();
    }
  }, []);

  const [equipname, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nameError, setNameError] = useState<string>("");
  const [quantityError, setQuantityError] = useState<string>("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [showError1, setShowError1] = useState<String>("");
  const [name, setSelectIncharge] = useState("");
  const [actualName, setActualName] = useState("");
  const [myfac, setMyFac] = useState<{ value: string; label: string }[]>();
  const [response, setResponse] = useState("");

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const equipname = e.target.value;
    setName(equipname);
    if (equipname.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  };

  const validateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = e.target.value;
    setQuantity(quantity);
    if (quantity.length === 0) {
      setQuantityError("Quantity field is empty");
    } else {
      setQuantityError("");
    }
  };
  const deleteItem = async () => {
    setShowError("");
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "equipment/deleteEquipment",
      { id: id }
    );
    const data = res.data;
    if (data.status === 1) {
      setResponse("Deleted");
      setShow(true);
      nav("/Facilities/");
    } else {
      setResponse(data.response.message);
      setShow(true);
    }
  };
  const loginValidate = () => {
    console.log("name is ", name);
    if (
      equipname.length === 0 ||
      quantity.length === 0 ||
      name.length === 0 ||
      (nameError?.length !== 0 && quantityError?.length !== 0)
    ) {
      setShowError("Fill details appropriately");
    } else {
      if (!isEdit) {
        setShowError("");
        axios
          .post(process.env.REACT_APP_SERVER_URL + "equipment/addEquipment", {
            name: equipname,
            totalCount: quantity,
            facultyIncharge: name,
          })
          .then((res) => {
            const data = res.data;
            if (data.status === 1) {
              setResponse("New Equipment Added");
              setShow(true);
            } else {
              setResponse(data.response.message);
              setShow(true);
            }
          });
      } else {
        setShowError("");
        axios
          .put(process.env.REACT_APP_SERVER_URL + "equipment/editEquipment", {
            id: id,
            name: equipname,
            totalCount: quantity,
            facultyIncharge: name,
          })
          .then((res) => {
            const data = res.data;
            if (data.status === 1) {
              setResponse("Equipment Details Edited");
              setShow(true);
            } else {
              setResponse(data.response.message);
              setShow(true);
            }
          });
      }
    }
  };

  const faculty = async () => {
    console.log("name is now", name);
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "faculty/fetchFaculty",
      { name: name }
    );
    const data = res.data.response;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push({ value: data[i]._id, label: data[i].name });
    }
    setMyFac(arr);
  };
  useEffect(() => {
    if (name.length !== 0) {
      faculty();
    } else {
      setMyFac([]);
    }
  }, [name]);
  const handleInputChange = (characterEntered: SetStateAction<string>) => {
    setSelectIncharge(characterEntered);
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
        <div className="flex flex-row justify-between">
          <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
            {isEdit ? "EDIT EQUIPMENT" : "ADD EQUIPMENT"}
          </p>
          {isEdit && (
            <button
              className="btn  bg-arma-red hover:bg-arma-red rounded-[8px] px-2 py-1 mb-12 flex"
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
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Name"
            value={equipname}
            type="text"
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
          <InputField
            name="Total Quantity"
            value={quantity}
            type="text"
            error={quantityError}
            onChange={(e) => {
              validateQuantity(e);
            }}
          />
        </div>

        <div className=" w-full sm:w-[270px] ">
          <Select
            name="Faculty Coordintator"
            options={myfac}
            placeholder="faculty coordinator"
            onInputChange={(e) => {
              if (e !== "") handleInputChange(e);
            }}
            value={
              isEdit
                ? { value: name, label: actualName }
                : { value: name, label: actualName}
            }
            noOptionsMessage={() => null}
            onChange={(e: any) => {
              setSelectIncharge(e.value);
              setActualName(e.label);
            }}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 270,
                borderRadius: "0.5rem",
                border: "2px solid rgb(200, 200, 200)",
              }),

              placeholder: (base) => ({
                ...base,
              }),

              valueContainer: (base) => ({
                ...base,
                paddingLeft: "16px",
              }),
            }}
            className="basic-multi-select "
          />
        </div>

        <Dialog show={show} setShow={setShow} title={response}>
          {" "}
        </Dialog>

        <button
          className="btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center"
          onClick={loginValidate}
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
