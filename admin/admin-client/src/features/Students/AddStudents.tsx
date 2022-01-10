import { ChangeEvent, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";



export const AddStudents = () => {
  const [uniqueid, setuniqueid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [uniqueidError, setUniqueidError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [selectRoles, setSelectRoles] = useState<(string | undefined) []>([])


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

  const validatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhone(phone);
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.length === 0) {
      setPhoneError("Phone field is empty");
    } else if(!phone.match(phoneno)){
      setPhoneError("Invalid number");
    }
    else {
        setPhoneError("");
      }  
  };

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



  const loginValidate = () => {
    if (
      uniqueid.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      uniqueidError?.length !== 0 ||
      nameError?.length !== 0 ||
      emailError?.length !==0  
      
    ) {
      setShowError("Fill details appropriately");
    } else {
      setShow(true);
      setShowError("");
    }
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
        <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          ADD STUDENT
        </p>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Name"
            type="text"
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
          <InputField
            name="Unique ID"
            type="text"
            error={uniqueidError}
            onChange={(e) => {
              validateUniqueid(e);
            }}
          />
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
        <Select
            name="Year"
            placeholder="Year"
            value ={{value: "Year", label: "Year"}}
            options={[]}
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
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: '#575757e1'
                }) 
            }}
            
            className="basic-multi-select w-full h-full"
           
          /> 
          <Select
            name="Branch"
            placeholder="Branch"
            value ={{value: "Branch", label: "Branch"}}
            options={[]}
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
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: '#575757e1'
                }) 
            }}
            
            className="basic-multi-select w-full h-full"
           
          /> 
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <Select
            name="Roles"
            placeholder="Roles"
            value ={{value: "Roles", label: "Roles"}}
            options={[]}
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
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: '#575757e1'
                }) 
            }}
            
            className="basic-multi-select w-full h-full"
           
          /> 
          <InputField
            name="Email"
            type="text"
            error={emailError}
            onChange={(e) => {
              validateEmail(e);
            }}
          />
        </div>
        <div className=" w-full sm:w-[270px] ">
            <InputField 
            name="Phone"
            type="text"
            error={phoneError}
            onChange={(e) =>{validatePhone(e)}}
            />
            </div>

        <Dialog show={show} setShow={setShow} title="Added">
          {" "}
        </Dialog>

        <button
          className="btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center"
          onClick={() => {
            loginValidate();
          }}
        >
          ADD
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

