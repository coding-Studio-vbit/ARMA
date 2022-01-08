import { useNavigate } from "react-router-dom"
import { InputField } from "../../Components/InputField/InputField"

export const RolesList = () => {
const navigate = useNavigate()
    return(
        <div>
        <button className="btn" onClick = {() => navigate('/Roles/AddRoles')}>ADD</button>
        <button className="btn" onClick = {() => navigate('/Admins/EditRoles')}>EDIT</button>

            

        </div>
    )
} 