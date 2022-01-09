import { ChangeEvent, useState } from "react"
import { Dialog } from "../../Components/Dialog/Dialog"
import { InputField } from "../../Components/InputField/InputField"


export const AddAdmin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();
    const [passwordConfirmError, setConfirmPassError] = useState<string>();
    const [show, setShow] = useState(false)
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
         
        const loginValidate = () => {
        if((email.length === 0) ||  (password.length === 0)  || (confirmPass.length === 0) || (emailError?.length !== 0)  || (passwordError?.length !== 0) || (passwordConfirmError?.length !== 0))
        {
            setShowError("Fill details appropriately")
         }else{
             setShow(true)
             setShowError("")
        }

        }

    return(
        <div className="flex flex-col grow items-center">
            <div className="mt-12 w-max">
            <p className= 'text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 '>ADD ADMIN</p>

            <div className=' flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8'>
            <InputField 
            name="Email"   
            error={emailError}                      
            onChange={(e) =>{validateEmail(e)}}
            />
            <InputField 
            name="Password"
            type="text"   
            error={passwordError} 
            onChange={(e) =>{validatePass(e)}}
            />
            </div>
            <div className=" w-full sm:w-[270px] ">
            <InputField 
            name="Confirm Password"
            type="text"
            error={passwordConfirmError}
            onChange={(e) =>{validateConfirmPass(e)}}
            />
            </div>
            <Dialog show={show} setShow={setShow} title="Added"> </Dialog>


            <button className='btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center' onClick={() => { loginValidate()}} >ADD</button>
            {(showError.length !== 0) && <span className="text-red-500 text-sm flex justify-center mt-2">{showError}</span> }

            </div>
            

        </div>
    )
} 
