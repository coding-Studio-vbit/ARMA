import { useNavigate } from "react-router-dom"
import { InputField } from "../../Components/InputField/InputField"

export const ForumsList = () => {
const navigate = useNavigate()
    return(
        <div>
        <button className="btn" onClick = {() => navigate('/Forums/AddForums')}>ADD</button>
        <button className="btn" onClick = {() => navigate('/Forums/EditForums')}>EDIT</button>

            

        </div>
    )
} 
