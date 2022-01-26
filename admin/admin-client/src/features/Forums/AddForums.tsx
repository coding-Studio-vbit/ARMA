import { ChangeEvent, useEffect, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { Close } from "@material-ui/icons";
import axiosInstance from "../../utils/axios";



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
   const [selectHead, setSelectHead] = useState<(string | undefined) []>([])
   const [selectCoord, setSelectCoord] = useState<(string | undefined) []>([])
   const [selectHeadLabel, setSelectHeadLabel] = useState<(string | undefined) []>([])
   const [selectCoordLabel, setSelectCoordLabel] = useState<(string | undefined) []>([])
   const [mystu, setMyStu] = useState<{value:string,label:string}[]>()
   const [myfac, setMyFac] = useState<{}[]>()
   const [response, setResponse] = useState("")
  



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

  

  const loginValidate = async() => {
    if (
      forumID.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      selectHead.length === 0 ||
      selectCoord.length === 0 ||
      forumIDError?.length !== 0 ||
      phoneError?.length !== 0 ||
      passwordError?.length !==0 ||
      emailError?.length !==0  
  
    ) {
      setShowError("Fill details appropriately");
    } else {
      setShowError("");
      const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "admin/addForum", {name:forumID, phone:phone, facultyCoordinatorID:selectCoord, forumHeads:selectHead,email:email, password:password})
      const data = res.data
      if (data.status === 1) {
        setResponse("New Forum Added")
        setShow(true)
      } else {
          setResponse(data.response)
          setShow(true)             
      }   
    }
  };

      
  useEffect(() => {
    const students = async () => {
      const res = await axiosInstance.get(process.env.REACT_APP_SERVER_URL +"students/fetchStudents");
      console.log(res.data);
      const data = res.data.response;
      let arr = []
      for(let i = 0; i < data.length; i++){
          arr.push({value:data[i]._id, label:data[i].name + "  -  " + data[i].rollNumber})
      }
      setMyStu(arr)
    }
    students();
  },[])

  useEffect(() => {
    const faculty = async () => {
      const res = await axiosInstance.get(process.env.REACT_APP_SERVER_URL +"faculty/fetchFaculty");
      console.log(res.data);
      const data = res.data.response;
      let arr = []
      for(let i = 0; i < data.length; i++){
          arr.push({value:data[i]._id, label:data[i].name + "  -  " + data[i].rollNumber})
      }
      setMyFac(arr)
    }
    faculty();
  },[])

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
        <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          ADD FORUMS
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <Select
            name="Forum Head"
            placeholder="Forum Head"
            value={{value:'Forum Head',label:'Forum Head'}}
            options={mystu}
            onChange={(e:any) => {
              for(let i = 0; i < selectHead.length; i++){
                 if(e?.value === selectHead[i]) return        
              }
              setSelectHead([...selectHead, e?.value])
              setSelectHeadLabel([...selectHeadLabel,e?.label.split('-')[0]])
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
                }) 
            }}
            
            className="basic-multi-select"
           
          /> 
          <Select
            name="Faculty Coordinator"
            placeholder="Faculty Coordinator"
            options={myfac}
            onChange={(e:any) => {
              for(let i = 0; i < selectCoord.length; i++){
                 if(e?.value === selectCoord[i]) return        
              }
              setSelectCoord([...selectCoord, e?.value])
              setSelectCoordLabel([...selectCoordLabel,e?.label])

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
                }) 
            }}
            
            className="basic-multi-select "
           
          /> 
          <div className={`flex flex-col mr-auto w-[270px] ${selectHeadLabel.length===0 && 'hidden'} `}>
             {
                 selectHeadLabel.map((r,i) => {
                     return(
                         <div className="flex justify-between shadow-md px-4 py-2 hover:bg-black/[0.05] mt-4 ">
                             <span>{r}</span>
                             <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...selectHeadLabel]
                                 let x = [...selectHead]
                                 temp.splice(i,1)
                                 x.splice(i,1)
                                 setSelectHeadLabel(temp)
                                 setSelectHead(x)
                             }}/>
                         </div>
                     )
                 })
             }

         </div>
         
          
         <div className={`flex flex-col ml-auto w-[270px] ${selectHeadLabel.length===0 && 'hidden'} `}>
             {
                 selectCoordLabel.map((r,i) => {
                     return(
                         <div className="flex justify-between shadow-md px-4 py-2 hover:bg-black/[0.05] mt-4">
                             <span>{r}</span>
                             <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...selectCoordLabel]
                                 let x = [...selectCoord]
                                 temp.splice(i,1)
                                 x.splice(i,1)
                                 setSelectCoordLabel(temp)
                                 setSelectCoord(x)
                             }}/>
                         </div>
                     )
                 })
             }

        </div>
        
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
        

        <Dialog show={show} setShow={setShow} title={response}>
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


