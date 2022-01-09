import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useStateStorage";
import { User } from "../interfaces/user";

interface UserDetails {
    user:User | null
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserDetails >({user:null,setUser:user=>{}})

const useUser = () => useContext(UserContext)


const UserProvider = ({children}:any)=>{
    const [user,setUser] = useLocalStorageState< User|null >('user',null)

    return (
        <UserContext.Provider value={{user:user,setUser:setUser}} >
        {children}
        </UserContext.Provider>
    )
}
export {UserProvider,useUser}