import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [isFaculty, setIsFaculty] = useState(true)
  const[emailError, setEmailError] = useState<String>()
  const[passwordError, setPasswordError] = useState<String>()
  const[ email, setEmail] =useState<String>()
  const[ password, setPassword] =useState<String>()
  const validateEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    var email = e.target.value
    setEmail(email)
    if(email.length===0){
       setEmailError('Email field is empty')
    } else{  
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (validRegex.test(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
  }

  const validatePass = (e:React.ChangeEvent<HTMLInputElement>)=>{
    var password = e.target.value
    setPassword(password)
    if(password.length===0){
       setPasswordError('password field is empty')
    }
  }

  return (
    
    <div className="mt-24 flex flex-col w-screen items-center">
      <p className="text-arma-title text-5xl font-medium mb-2">A.R.M.A</p>
      <p className="text-[#263238] mb-12 text-center">
        Automating and Digitalizing Event Organization
      </p>
      <div className="bg-[#F5F5F5] cursor-pointer pointer-events-auto flex w-max rounded-[24px] relative  mb-12 " onClick= {() => {setIsFaculty(!isFaculty)}}>
        <div className={`absolute ${isFaculty && "bg-arma-blue" }  rounded-[24px] w-6/12 h-full  cursor-pointer`} ></div>
        <div className="py-1 pl-8 pr-8 shrink z-10 ">
          <span className= {`${isFaculty && 'text-white' }  font-medium pointer-events-auto cursor-pointer`}>Faculty</span>
        </div>
        <div className={`${!isFaculty && "bg-arma-blue " } rounded-[24px] py-1 pr-8 pl-8 pointer-events-auto cursor-pointer z-10`}>
          <span className={` ${!isFaculty && 'text-white'} font-medium cursor-pointer`}>Forum</span>
        </div>
      </div>
    
        <div className="col-3 input-effect mb-8">
        	<input className="effect-20 focus:rounded-[8px]" type="text" placeholder="" onChange={(e) => validateEmail(e)}/>
            <label>E-mail</label>
            <span className="focus-border">
            	<i></i>
            </span>
        </div>

        <div className="col-3 input-effect mb-12">
        	<input className="effect-20" type="password" placeholder=""/>
            <label>Password</label>
            <span className="focus-border">
            	<i></i>
            </span>
        </div>
    
     
      <button className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mb-2" onClick={()=> {navigate(`/dash`);}}>Login</button>
      <p className="text-arma-title font-medium">Forgot Password?</p>
    </div>
  );
}

export { Login };
