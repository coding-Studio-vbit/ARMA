import { createContext, useContext, useState } from "react";
import { Faculty, Forum } from "../../interfaces/user";

interface User {
    faculty:(Faculty)| undefined
    forum: Forum | undefined
    setFaculty: React.Dispatch<React.SetStateAction<Faculty|undefined>>
    setForum: React.Dispatch<React.SetStateAction<Forum|undefined>>

}

const UserContext = createContext<User>({ faculty:undefined,forum:undefined, setFaculty: user=>{},setForum: user=>{} })

const useUser = () => useContext(UserContext)


const UserProvider = ({children}:any)=>{
    const [forum,setforum] = useState< Forum|undefined >()
    const [faculty,setfaculty] = useState< Faculty|undefined >()

    return (
        <UserContext.Provider value={{faculty:faculty,forum:forum,setFaculty:setfaculty,setForum:setforum}} >
        {children}
        </UserContext.Provider>
    )
}
export {UserProvider,useUser}
