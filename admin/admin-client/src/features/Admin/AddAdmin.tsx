import { ChangeEvent, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Dialog } from "../../Components/Dialog/Dialog"
import { InputField } from "../../Components/InputField/InputField"
import axiosInstance from "../../utils/axios";

interface AddAdminProps
{
  isEdit: boolean,
}

export const AddAdmin = ({isEdit}:AddAdminProps) => {
  useEffect(() => {
    const student = async () => {
      const res = await axiosInstance.post(
        process.env.REACT_APP_SERVER_URL + "admin/viewAdmin",
        { id: id }
      );
      const data = res.data.response;
      console.log(data);
      setName(data?.name)
      setEmail(data?.email)
    };
    if(isEdit)
    {
    student();
    }
  }, []);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordConfirmError, setConfirmPassError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [response, setResponse] = useState("")
    const [showError, setShowError] = useState<String>("")
    const [showError1, setShowError1] = useState<String>("")
    const nav = useNavigate()
    const location:any = useLocation()
    let {id} = useParams()
    console.log(id);
    console.log(name);
   
    
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

      const validateConfirmPass = (e: ChangeEvent<HTMLInputElement>) => {
        const pass = e.target.value;
    
        setConfirmPass(pass)
        if(pass !== password ){
            setConfirmPassError("Does not match password")
        }
        else{
            setConfirmPassError("")
        }
        }
        
  const deleteItem = async() => {
    setShowError("");
    const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "admin/deleteAdmin", {id:id})
    const data = res.data
    if (data.status === 1) {
      setResponse("Deleted")
      setShow(true)
      nav('/Admins/')
    } else {
        setResponse(data.response.message)
        setShow(true)             
    }  
  }
         
        const loginValidate = async() => {
        if((email.length === 0) ||  (password.length === 0)  || (confirmPass.length === 0) || (emailError?.length !== 0)  || (passwordError?.length !== 0) || (passwordConfirmError?.length !== 0))
        {
            setShowError("Fill details appropriately")
         }
         else {
          if(!isEdit)
          {
          setShowError("");
          const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "admin/addAdmin", {name:name, email: email, password:password})
          const data = res.data
          if (data.status === 1) {
            setResponse("New Admin Added")
            setShow(true)
          } else {
              setResponse(data.response)
              setShow(true)             
          }  
        } 
        else{
          setShowError("");
            const res = await axiosInstance.put(process.env.REACT_APP_SERVER_URL + "admin/editAdmin", {id:id, name:name, email:email, password:password})
            const data = res.data
            if (data.status === 1) {
              setResponse("Admin Details Edited")
              setShow(true)
            } else {
                setResponse(data.response.message)
                setShow(true)             
            }   
        }
        }

        }

    return(
        <div className="flex flex-col grow items-center">
            <div className="mt-12 w-max">
            <div className="flex flex-row justify-between">
            <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          {isEdit? "EDIT ADMIN" : "ADD ADMIN"}
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
            <div className=' flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8'>
            <InputField
            name="Name"
            type="text"
            value={name}
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
            <InputField 
            name="Email"  
            value={email}
            error={emailError}                       
            onChange={(e) =>{validateEmail(e)}}
            />
            
            </div>
            <div className=' flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8'>
            <InputField 
            name="Password"
            type="password"   
            error={passwordError} 
            onChange={(e) =>{validatePass(e)}}
            />
            <InputField 
            name="Confirm Password"
            type="password"
            error={passwordConfirmError}
            onChange={(e) =>{validateConfirmPass(e)}}
            />
            
            </div>
            <Dialog show={show} setShow={setShow} title= {response}> </Dialog>


            <button className='btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center' onClick={async() => { loginValidate()}} >{isEdit? "SAVE" : "ADD"}</button>
            {(showError.length !== 0) && <span className="text-red-500 text-sm flex justify-center mt-2">{showError}</span> }

            </div>
            

        </div>
    )
} 
