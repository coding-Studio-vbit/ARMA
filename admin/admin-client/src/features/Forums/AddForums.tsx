import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { Close } from "@material-ui/icons";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

interface AddStudentsProps {
  isEdit: boolean;
}

export const AddForums = ({ isEdit }: AddStudentsProps) => {
  const nav = useNavigate()
  let {id} = useParams()
  console.log(id);
  useEffect(() => {
    const student = async () => {
      const res = await axiosInstance.post(
        process.env.REACT_APP_SERVER_URL + "forum/viewForum",
        { id: id }
      );
      const data = res.data.response;
      console.log(data);
      
      setforumID(data?.name)
      setPhone(data?.phone)
      setEmail(data?.email)
      setSelectHead(data?.forumHeads.name);
      setSelectHeadLabel(data.forumHeads.map((i:any)=>i.name))
      setActualName(data?.facultyInchargeID.name)
      setSelectCoord(data?.facultyCoordinatorID.name)
      
    };
    if (isEdit) {
      student();
    }
  }, []);
  const [forumID, setforumID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [actualName, setActualName] = useState("");
  const [forumIDError, setforumIDError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [showError1, setShowError1] = useState<String>("");
   const [selectHead, setSelectHead] = useState<(string | undefined) []>([])
   const [selectCoord, setSelectCoord] = useState<string>("")
   const [selectHeadLabel, setSelectHeadLabel] = useState<(string | undefined) []>([])
   const [mystu, setMyStu] = useState<{value:string,label:string}[]>()
   const [myfac, setMyFac] = useState<{ value: string; label: string }[]>();
   const [response, setResponse] = useState("")
   let[name, setName]= useState<string>(" ")
   let[rollNumber, setrollNumber]= useState<string>(" ")
  const [span, setSpan] = useState(false);

  



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

  
    const deleteItem = async() => {
      setShowError("");
      const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "forum/deleteForum", {id:id})
      const data = res.data
      if (data.status === 1) {
        setResponse("Deleted")
        setShow(true)
        nav('/Forums/')
      } else {
          setResponse(data.response.message)
          setShow(true)             
      }  
    }

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
      if(!isEdit)
      {
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
      else{
        setShowError("");
          const res = await axiosInstance.put(process.env.REACT_APP_SERVER_URL + "forum/editForum", {id:id,name:forumID, phone:phone, facultyCoordinatorID:selectCoord, forumHeads:selectHead,email:email, password:password})
          const data = res.data
          if (data.status === 1) {
            setResponse("Forum Details Edited")
            setShow(true)
            
          } else {
              setResponse(data.response.message)
              setShow(true)             
          }   
      }
        
    }
  };

      
  useEffect(() => {
    const students = async () => {
      const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL +"students/fetchStudents", {rollNumber: rollNumber});
      console.log(res.data);
      const data = res.data.response;
      let arr = []
      for(let i = 0; i < data.length; i++){
          arr.push({value:data[i]._id, label:data[i].name + "-" + data[i].rollNumber})
      }
      setMyStu(arr)
    }

    if(rollNumber.length !== 0)
    {
      students();
    }else{
      setMyStu([])
    }
  },[rollNumber])
  const handleInputChange1 = (characterEntered: SetStateAction<string>) => {
    setrollNumber(characterEntered)
    
    console.log(rollNumber);
  };

  useEffect(() => {
    const faculty = async () => {
      const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL +"faculty/fetchFaculty", {name: name});
      console.log(res.data);
      const data = res.data.response;
      let arr = []
      for(let i = 0; i < data.length; i++){
          arr.push({value:data[i]._id, label:data[i].name})
      }

      setMyFac(arr)
    }
    if(name.length !== 0)
    {
      faculty();
    }else{
      setMyFac([])
    }
    
  },[name])
  const handleInputChange = (characterEntered: SetStateAction<string>) => {
    setName(characterEntered)
    
    console.log(name);
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
      <div className="flex flex-row justify-between">
        <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          {isEdit? "EDIT FORUM" : "ADD FORUM"}
        </p>
        {isEdit &&
        <button
          className="btn  bg-arma-red hover:bg-arma-red rounded-[8px] px-2 py-1 mb-12 flex" onClick={() => {setShow1(true)}}>
         Delete
        </button>
        }
         <Dialog show={show1} setShow={setShow1} title="Are you sure you want to proceed?">
         <button className="outlineBtn" onClick={()=>setShow1(false)} >Cancel</button>
         <button className="btn" onClick={()=>{
          deleteItem();
        }} >Proceed</button>
        </Dialog>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            name="Forum Name"
            type="text"
            value={forumID}
            error={forumIDError}
            onChange={(e) => {
              validateforumID(e);
            }}
          />
          <InputField
            name="Phone Number"
            type="text"
            value={phone}
            error={phoneError}
            onChange={(e) => {
              validatePhone(e);
            }}
          />

        <Select
            name="Forum Head"
            placeholder="Forum Head"
            options={mystu}
            onInputChange={handleInputChange1}
            noOptionsMessage={() => null}
            onChange={(e:any) => {
              for(let i = 0; i < selectHead.length; i++){
                 if(e?.value === selectHead[i]) return        
              }
              setSelectHead([...selectHead, e?.value])
              setSelectHeadLabel([...selectHeadLabel,e?.label.split('-')[0]])
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
              
            }),
            
            valueContainer: (base) => ({
              ...base,
              paddingLeft: '16px',
          })  
        }}
        
        className="basic-multi-select "
           
          /> 
          

          <Select
            name="Faculty Coordinator"
            options={myfac}
            placeholder="faculty coordinator"
            onInputChange={(e)=>{
              if(e !== "")
                handleInputChange(e);
            }}
            value={isEdit ? { value: selectCoord, label: actualName }: "faculty coordinator"}
            noOptionsMessage={() => null}
            onChange={(e: any) => {
              setSelectCoord(e.value);
              setActualName(e.label);
            } 
        }
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
                  paddingLeft: '16px',
              })  
            }}
            
            className="basic-multi-select "
           
          /> 
          <div className={`flex flex-col mr-auto w-[270px] ${selectHeadLabel.length===0 && 'hidden'} `}>
          {span && <span className="text-arma-title mb-2">Forum Heads:</span>}
          {selectHeadLabel.map((r: any, i: any) => {
            return isEdit ? (
              <div
                key={i}
                className="flex justify-between shadow-md px-4 py-2 mb-2 hover:bg-black/[0.05]"
              >
                <span>{r.name ? r.name : r}</span>
                <Close
                  className="cursor-pointer"
                  onClick={() => {
                    let temp = [...selectHeadLabel];
                    temp.splice(i, 1);
                    setSelectHead(temp);
                    let tempL = [...selectHeadLabel];
                    tempL.splice(i, 1);
                    setSelectHeadLabel(tempL);
                    if (selectHead.length === 1) setSpan(false);
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
                    let temp = [...selectHead];
                    temp.splice(i, 1);
                    setSelectHead(temp);
                    let tempL = [...selectHeadLabel];
                    tempL.splice(i, 1);
                    setSelectHeadLabel(tempL);
                    if (selectHead.length === 1) setSpan(false);
                  }}
                />
              </div>
            );
          })}

          </div>
  
         
        
          
        
        
          <InputField
            name="Login Email"
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


