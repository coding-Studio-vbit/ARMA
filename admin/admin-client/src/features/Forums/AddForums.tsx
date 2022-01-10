import { ChangeEvent, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";



export const AddForums = () => {
  const [forumID, setforumID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [forumIDError, setforumIDError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [selectRoles, setSelectRoles] = useState<(string | undefined) []>([])


  
   const [selectHead, setSelectHead] = useState<(string | undefined) []>([])
   const [selectCoord, setSelectCoord] = useState<(string | undefined) []>([])


  const validateforumID = (e: React.ChangeEvent<HTMLInputElement>) => {
    const forumID = e.target.value;
    setforumID(forumID);
    if (forumID.length === 0) {
      setforumIDError("Forum name field is empty");
    } //Add faculty Roll no validation
    else {
        setforumIDError("");
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
    setPassword(password)
    const p = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
    if(password.length < 6){  
       setPasswordError("Minimum Password Length should be 6")
    }else if(!p.test(password)){
       setPasswordError("Password should have atleast one capital letter, one digit and one symbol")
    }else{
        setPasswordError("")
    }
    }
    

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

  

  const loginValidate = () => {
    if (
      forumID.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      forumIDError?.length !== 0 ||
      phoneError?.length !== 0 ||
      passwordError?.length !==0 ||
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
          ADD FORUMS
        </p>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Forum Name"
            type="text"
            error={forumIDError}
            onChange={(e) => {
              validateforumID(e);
            }}
          />
          <InputField
            name="Phone Number"
            type="text"
            error={phoneError}
            onChange={(e) => {
              validatePhone(e);
            }}
          />
        </div>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
        <div className="flex flex-col shrink">
        <Select
            name="Forum Head"
            placeholder="Forum Head"
            value ={{value: "Forum Head", label: "Forum Head"}}
            options={[]}
            onChange={(e) => {
              for(let i = 0; i < selectHead.length; i++){
                 if(e?.value === selectHead[i]) return        
              }
              setSelectHead([...selectHead, e?.value])
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
            
            className="basic-multi-select"
           
          /> 
          <div className="flex flex-col mr-auto w-[270px]">
             {
                 selectHead.map((r,i) => {
                     return(
                         <div className="flex justify-between shadow-md px-4 py-2 hover:bg-black/[0.05] mt-4 ">
                             <span>{r}</span>
                             <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...selectHead]
                                 temp.splice(i,1)
                                 setSelectHead(temp)
                             }}/>
                         </div>
                     )
                 })
             }

         </div>
         </div>
         
         <div className="flex flex-col shrink">
          <Select
            name="Faculty Coordinator"
            placeholder="Faculty Coordinator"
            value ={{value: "Faculty Coordinator", label: "Faculty Coordinator"}}
            options={[]}
            onChange={(e) => {
              for(let i = 0; i < selectCoord.length; i++){
                 if(e?.value === selectCoord[i]) return        
              }
              setSelectCoord([...selectCoord, e?.value])
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
           <div className="flex flex-col ml-auto w-[270px]">
             {
                 selectCoord.map((r,i) => {
                     return(
                         <div className="flex justify-between shadow-md px-4 py-2 hover:bg-black/[0.05] mt-4">
                             <span>{r}</span>
                             <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...selectCoord]
                                 temp.splice(i,1)
                                 setSelectCoord(temp)
                             }}/>
                         </div>
                     )
                 })
             }

         </div>
         </div>
        </div>
        
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Login Email"
            type="text"
            error={emailError}
            onChange={(e) => {
              validateEmail(e);
            }}
          />
          <InputField
            name="Password"
            type="password"
            error={passwordError}
            onChange={(e) => {
              validatePass(e);
            }}
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


