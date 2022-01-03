import { useNavigate } from "react-router-dom"
import { InputField } from "../../Components/InputField/InputField"

export const AdminList = () => {
const navigate = useNavigate()
    return(
        <div>
        <button className="btn" onClick = {() => navigate('/Admins/AddAdmin')}>ADD</button>
        <button className="btn" onClick = {() => navigate('/Admins/EditAdmin')}>EDIT</button>

            

        </div>
    )
} 
