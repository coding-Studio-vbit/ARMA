import { ChangeEvent, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";



export const AddFaculty = () => {
  const [uniqueid, setuniqueid] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [span, setSpan] = useState(false)
  const [uniqueidError, setUniqueidError] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [designationError, setDesignationError] = useState<string>();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [selectRoles, setSelectRoles] = useState<(string | undefined) []>([])

  const options = [
    { value: "Create Event", label: "Create Event" },
    { value: "Edit Event", label: "Edit Event" },
    { value: "SAC", label: "SAC" },
  ];

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
    } 
    else {
        setNameError("");
      }
    
  };

  
  const validateDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const designation = e.target.value;
    setDesignation(designation);
    if (designation.length === 0) {
      setDesignationError("Designation field is empty");
    } 
    else {
        setDesignationError("");
      }
    
  };

  const loginValidate = () => {
    if (
      uniqueid.length === 0 ||
      name.length === 0 ||
      designation.length === 0 ||
      uniqueidError?.length !== 0 ||
      nameError?.length !== 0 ||
      designationError?.length !== 0
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
          ADD FACULTY
        </p>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Unique ID"
            type="text"
            error={uniqueidError}
            onChange={(e) => {
              validateUniqueid(e);
            }}
          />
          <InputField
            name="Name"
            type="text"
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
            error={designationError}
            onChange={(e) => {
              validateDesignation(e);
            }}
          />
          <Select
            name="Roles"
            placeholder="Roles"
            value ={{value: "Roles", label: "Roles"}}
            options={options}
            onChange={(e) => {
                for(let i = 0; i < selectRoles.length; i++){
                   if(e?.value === selectRoles[i]) return        
                }
                setSelectRoles([...selectRoles, e?.value])
                setSpan(true)
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
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: '#575757e1'
                }) 
            }}
            
            className="basic-multi-select "
           
          /> 
        </div>
        <div className="flex flex-col w-full sm:w-[50%] mx-auto">
          
          {span &&
          <span className="text-arma-title mb-2">Roles:</span>
           }
             {
                 selectRoles.map((r,i) => {
                     return(
                         <div className="flex justify-between shadow-md px-4 py-2 hover:bg-black/[0.05]">
                             <span>{r}</span>
                             <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...selectRoles]
                                 temp.splice(i,1)
                                 setSelectRoles(temp)
                                 {(selectRoles.length === 1) && setSpan(false)}
                             }}/>
                         </div>
                     )
                 })
             }
          
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
