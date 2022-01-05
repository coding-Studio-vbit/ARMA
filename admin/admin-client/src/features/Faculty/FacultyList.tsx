import { useNavigate } from "react-router-dom"
import { InputField } from "../../Components/InputField/InputField"

export const FacultyList = () => {
const navigate = useNavigate()
    return(
        <div>
        <button className="btn" onClick = {() => navigate('/Faculty/AddFaculty')}>ADD</button>
        <button className="btn" onClick = {() => navigate('/Faculty/EditFaculty')}>EDIT</button>

            

        </div>
    )
} 

