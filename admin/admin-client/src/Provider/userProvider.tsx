import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useStateStorage";
import { User } from "../interfaces/user";

interface UserDetails {
    user:User | null
    setUser : React.Dispatch<React.SetStateAction<User | null>>
    logout:()=>void
}

const UserContext = createContext<UserDetails >({user:null,setUser:user=>{},logout:()=>{}})

const useUser = () => useContext(UserContext)


const UserProvider = ({children}:any)=>{
    const [user,setUser] = useLocalStorageState< User|null >('user',null)
    const logout = ()=>{
        localStorage.clear()
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }
    return (
        <UserContext.Provider value={{user:user,setUser:setUser,logout:logout}} >
        {children}
        </UserContext.Provider>
    )
}
export {UserProvider,useUser}