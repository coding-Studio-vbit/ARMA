import { createContext, useContext, useState } from "react";
import { Faculty, Forum } from "../../interfaces/user";

interface User {
    user:Faculty|Forum|undefined
    setUser: React.Dispatch<React.SetStateAction<Faculty | Forum | undefined>>

}

const UserContext = createContext<User>({ user:undefined, setUser: user=>{} })

const useUser = ():User => useContext(UserContext)


const UserProvider = ({children}:any)=>{
    const [user,setUser] = useState<Forum | Faculty | undefined >()
    
    return (
        <UserContext.Provider value={{user:user,setUser:setUser}} >
        {children}
        </UserContext.Provider>
    )
}
export {UserProvider,useUser}
