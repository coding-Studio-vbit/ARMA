import { ChangeEvent, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router-dom";

interface AddRolesProps
{
  isEdit: boolean,
}

export const AddRoles = ({isEdit}:AddRolesProps) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string>();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<string>("");
  const [response, setResponse] = useState("")
  let {id} = useParams()
  console.log(id);


  const options = [
    { value: "Create ", label: "Create" },
    { value: "Edit ", label: "Edit" },
    { value: "Delete", label: "Delete" },
  ];
  
   const [selectRoles, setSelectRoles] = useState<(string | undefined) []>([])



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

  
  const loginValidate = async() => {
    if (
      name.length === 0 ||
      nameError?.length !== 0 
    ) {
      setShowError("Fill details appropriately");
    } else {
      if(!isEdit)
      {
      setShowError("");
      const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "roles/addRoles", {name:name, permissions:selectRoles})
      const data = res.data
      if (data.status === 1) {
        setResponse("New Role Added")
        setShow(true)
      } else {
          setResponse(data.response)
          setShow(true)             
      }  
    } 
    else{
      setShowError("");
        const res = await axiosInstance.put(process.env.REACT_APP_SERVER_URL + "roles/editRoles", {id:id, name:name, permissions:selectRoles,})
        const data = res.data
        if (data.status === 1) {
          setResponse("Role Details Edited")
          setShow(true)
        } else {
            setResponse(data.response.message)
            setShow(true)             
        }   
    }
    }
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
      <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          {isEdit? "EDIT ROLES" : "ADD ROLES"}
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
        </div>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <Select
            name="Roles"
            placeholder="Roles"
            options={options}
            onChange={(e) => {
                for(let i = 0; i < selectRoles.length; i++){
                   if(e?.value === selectRoles[i]) return        
                }
                setSelectRoles([...selectRoles, e?.value])
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
                    color: 'black'
                }) 
            }}
            
            className="basic-multi-select w-full h-full"
           
          /> 
        </div>
         
         <div className="flex flex-col">
             {
                 selectRoles.map((r,i) => {
                     return(
                         <div className="flex justify-between shadow-md px-4 py-2 hover:bg-black/[0.05]">
                             <span>{r}</span>
                             <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...selectRoles]
                                 temp.splice(i,1)
                                 setSelectRoles(temp)
                             }}/>
                         </div>
                     )
                 })
             }

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
          {isEdit? "SAVE" : "ADD"}
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
