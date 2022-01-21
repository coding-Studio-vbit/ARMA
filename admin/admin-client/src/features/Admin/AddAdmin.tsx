import { ChangeEvent, useState } from "react"
import { useLocation } from "react-router-dom"
import { Dialog } from "../../Components/Dialog/Dialog"
import { InputField } from "../../Components/InputField/InputField"


const adminAdd = async (name:string, email: string, password: string) => {
  try {
    const res = await fetch(process.env.REACT_APP_SERVER_URL + "admin/addAdmin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name:name,
        email: email,
        password: password,
      }),
    });
    const data = await res.json()   
    return data
  } catch (error) {
    return {response: "Server not available. Try again later", status: -1}
  }
};


export const AddAdmin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("");
    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();
    const [passwordConfirmError, setConfirmPassError] = useState<string>();
    const [nameError, setNameError] = useState<string>();
    const [show, setShow] = useState(false)
    const [response, setResponse] = useState("")
    const [showError, setShowError] = useState<String>("")


    
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
         
        const loginValidate = async() => {
        if((email.length === 0) ||  (password.length === 0)  || (confirmPass.length === 0) || (emailError?.length !== 0)  || (passwordError?.length !== 0) || (passwordConfirmError?.length !== 0))
        {
            setShowError("Fill details appropriately")
         }else{
             setShowError("")
             const res = await adminAdd(name,email, password);
             console.log(res);
          
          if (res.status === 1) {
            setResponse("New Admin Added")
            setShow(true)
          } else {
              setResponse(res.response)
              setShow(true)
              
          }
        }

        }

    return(
        <div className="flex flex-col grow items-center">
            <div className="mt-12 w-max">
            <p className= 'text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 '>ADD ADMIN</p>

            <div className=' flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8'>
            <InputField
            name="Name"
            type="text"
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
            <InputField 
            name="Email"  
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


            <button className='btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center' onClick={async() => { loginValidate()}} >ADD</button>
            {(showError.length !== 0) && <span className="text-red-500 text-sm flex justify-center mt-2">{showError}</span> }

            </div>
            

        </div>
    )
} 
