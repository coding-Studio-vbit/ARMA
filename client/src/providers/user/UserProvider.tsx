import { createContext, useContext } from "react";
import { useLocalStorageState } from "../../hooks/useStateStorage";
import { Faculty, Forum } from "../../interfaces/user";

interface User {
    faculty:(Faculty)| null
    forum: Forum | null
    setFaculty: React.Dispatch<React.SetStateAction<Faculty|null>>
    setForum: React.Dispatch<React.SetStateAction<Forum|null>>

}

const UserContext = createContext<User>({ faculty:null,forum:null, setFaculty: user=>{},setForum: user=>{} })

const useUser = () => useContext(UserContext)


const UserProvider = ({children}:any)=>{
    const [forum,setforum] = useLocalStorageState< Forum|null >('forum',null)
    const [faculty,setfaculty] = useLocalStorageState< Faculty|null >('faculty',null)

    return (
        <UserContext.Provider value={{faculty:faculty,forum:forum,setFaculty:setfaculty,setForum:setforum}} >
        {children}
        </UserContext.Provider>
    )
}
export {UserProvider,useUser}
