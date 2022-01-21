import { useNavigate } from "react-router-dom"
import { InputField } from "../../Components/InputField/InputField"

export const ListStudents = () => {
const navigate = useNavigate()
    return(
        <div>
        <button className="btn" onClick = {() => navigate('/Students/AddStudents')}>ADD</button>
        <button className="btn" onClick = {() => navigate('/Students/EditStudents')}>EDIT</button>

            

        </div>
    )
} 
