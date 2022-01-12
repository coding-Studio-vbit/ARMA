import { useState } from "react"
import { AuthService } from "../services/auth/auth"

export const useLogin = ()=>{
    const [loading,setLoading] = useState(false)
    
    const login = async (email:String,password:string,userType:string):Promise<{response:any,status:number}> =>{
        setLoading(true)
        
        const res = await AuthService.login(email,password,userType)
        setLoading(false)
        return res
    }
    return {loading,login}
}