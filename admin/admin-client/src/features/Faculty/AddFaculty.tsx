import { ChangeEvent, useEffect, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { Close } from "@material-ui/icons";
import axiosInstance from "../../utils/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface AddStudentsProps {
  isEdit: boolean;
}

export const AddFaculty = ({ isEdit }: AddStudentsProps) => {
  const nav = useNavigate();
  const location: any = useLocation();
  let { id } = useParams();
  useEffect(() => {
    const student = async () => {
      const res = await axiosInstance.post(
        process.env.REACT_APP_SERVER_URL + "faculty/viewFaculty",
        { id: id }
      );
      const data = res.data.response;
      setName(data?.name);
      setuniqueid(data?.rollNumber);
      setDesignation(data?.designation);
      setSelectRolesL(data?.role);
      setSelectRoles(data.role.map((i:any)=>i._id))
      setEmail(data?.email);
      setPassword(data?.password);
      setPhone(data?.phone);
    };
    if (isEdit) {
      student();
    }
  }, []);
  const [uniqueid, setuniqueid] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [span, setSpan] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueidError, setUniqueidError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [designationError, setDesignationError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [selectRoles, setSelectRoles] = useState<(string | undefined)[]>([]);
  const [selectRolesL, setSelectRolesL] = useState<any>([]);

  const [myrole, setMyRole] = useState<{}[]>();
  const [response, setResponse] = useState("");

  useEffect(() => {
    const role = async () => {
      const res = await axiosInstance.get(
        process.env.REACT_APP_SERVER_URL + "roles/fetchRoles"
      );
      const data = res.data.response;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({ value: data[i]._id, label: data[i].name });
      }
      setMyRole(arr);
    };
    role();
  }, []);

  const validateUniqueid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueid = e.target.value;
    setuniqueid(uniqueid);
    if (uniqueid.length === 0) {
      setUniqueidError("Unique ID field is empty");
    } //Add faculty Roll no validation
    else {
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

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (email.length === 0) {
      setEmailError("Email field is empty");
    } else {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validRegex.test(email)) {
        setEmailError("Enter valid Email!");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePass = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    const p = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    if (password.length < 6) {
      setPasswordError("Minimum Password Length should be 6");
    } else if (!p.test(password)) {
      setPasswordError(
        "Password should have atleast one capital letter, one digit and one symbol"
      );
    } else {
      setPasswordError("");
    }
  };

  const validateDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const designation = e.target.value;
    setDesignation(designation);
    if (designation.length === 0) {
      setDesignationError("Designation field is empty");
    } else {
      setDesignationError("");
    }
  };

  const validatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhone(phone);
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.length === 0) {
      setPhoneError("Phone field is empty");
    } else if (!phone.match(phoneno)) {
      setPhoneError("Invalid number");
    } else {
      setPhoneError("");
    }
  };

  const deleteItem = async () => {
    setShowError("");
    const res = await axiosInstance.post(
      process.env.REACT_APP_SERVER_URL + "faculty/deleteFaculty",
      { id: id }
    );
    const data = res.data;
    if (data.status === 1) {
      setResponse("Deleted");
      setShow(true);
      nav("/Faculty/");
    } else {
      setResponse(data.response.message);
      setShow(true);
    }
  };

  const loginValidate = async () => {



    if (
      uniqueid.length === 0 ||
      name.length === 0 ||
      password.length === 0 ||
      phone.length === 0 ||
      email.length === 0 ||
      designation.length === 0 ||
      selectRoles.length === 0 ||
      uniqueidError?.length !== 0 ||
      nameError?.length !== 0 ||
      phoneError?.length !== 0 ||
      passwordError?.length !== 0 ||
      emailError?.length !== 0 ||
      designationError?.length !== 0
    ) {
      setShowError("Fill details appropriately");
    } else {
      if (!isEdit) {
        setShowError("");
        const res = await axiosInstance.post(
          process.env.REACT_APP_SERVER_URL + "admin/addFaculty",
          {
            name: name,
            rollNumber: uniqueid,
            phone: phone,
            designation: designation,
            email: email,
            role: selectRoles,
            password: password,
          }
        );

        const data = res.data;
        if (data.status === 1) {
          setResponse("New Faculty Added");
          setShow(true);
        } else {
          setResponse(data.response.message);
          setShow(true);
        }
      } else {
        console.log("selectRoles is ", selectRoles);
        setShowError("");
        const res = await axiosInstance.put(
          process.env.REACT_APP_SERVER_URL + "admin/editFaculty",
          {
            id: id,
            name: name,
            rollNumber: uniqueid,
            phone: phone,
            designation: designation,
            email: email,
            role: selectRoles,
            password: password,
          }
        );
        const data = res.data;
        if (data.status === 1) {
          setResponse("Faculty Details Edited");
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
        <div className="flex flex-row justify-between">
          <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
            {isEdit ? "EDIT FACULTY" : "ADD FACULTY"}
          </p>
          {isEdit && (
            <button
              className="btn  bg-arma-red hover:bg-arma-red rounded-[8px] px-6 py-2 mb-12 flex"
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
            name="Unique ID"
            type="text"
            value={uniqueid}
            error={uniqueidError}
            onChange={(e) => {
              validateUniqueid(e);
            }}
          />
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

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Designation"
            type="text"
            value={designation}
            error={designationError}
            onChange={(e) => {
              validateDesignation(e);
            }}
          />
          {
            console.log("SelectRoles is ", selectRoles)
          }
          <Select
            name="Roles"
            placeholder="Roles"
            options={myrole}
            onChange={(e: any) => {
              for (let i = 0; i < selectRoles.length; i++) {
                if (e?.value   === selectRoles[i]) return;
              }
        
              setSelectRoles([...selectRoles, e?.value]);
              setSelectRolesL([...selectRolesL, e?.label]);

              setSpan(true);
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
                paddingLeft: "16px",
              }),
              singleValue: (base) => ({
                ...base,
                paddingLeft: "16px",
                color: "black",
              }),
            }}
            className="basic-multi-select "
          />
        </div>

        <div className="flex flex-col w-full sm:w-[50%] mx-auto">
          {span && <span className="text-arma-title mb-2">Roles:</span>}
          {selectRolesL.map((r: any, i: any) => {
            return isEdit ? (
              <div
                key={i}
                className="flex justify-between shadow-md px-4 py-2 mb-2 hover:bg-black/[0.05]"
              >
                <span>{r.name ? r.name : r}</span>
                <Close
                  className="cursor-pointer"
                  onClick={() => {
                    let temp = [...selectRoles];
                    temp.splice(i, 1);
                    setSelectRoles(temp);
                    let tempL = [...selectRolesL];
                    tempL.splice(i, 1);
                    setSelectRolesL(tempL);
                    if (selectRoles.length === 1) setSpan(false);
                  }}
                />
              </div>
            ) : (
              <div
                key={i}
                className="flex justify-between shadow-md px-4 py-2 mb-2 hover:bg-black/[0.05]"
              >
                <span>{r}</span>
                <Close
                  className="cursor-pointer"
                  onClick={() => {
                    let temp = [...selectRoles];
                    temp.splice(i, 1);
                    setSelectRoles(temp);
                    let tempL = [...selectRolesL];
                    tempL.splice(i, 1);
                    setSelectRolesL(tempL);
                    if (selectRoles.length === 1) setSpan(false);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className=" flex flex-col mt-2 gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Login Email"
            disabled={isEdit}
            type="text"
            value={email}
            error={emailError}
            onChange={(e) => {
              validateEmail(e);
            }}
          />
          <InputField
            name="Password"
            type="password"
            value={password}
            error={passwordError}
            onChange={(e) => {
              validatePass(e);
            }}
          />
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Phone Number"
            type="text"
            value={phone}
            error={phoneError}
            onChange={(e) => {
              validatePhone(e);
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