import { useNavigate } from "react-router-dom"
import { InputField } from "../../Components/InputField/InputField"

export const EquipList = () => {
const navigate = useNavigate()
    return(
        <div>
        <button className="btn" onClick = {() => navigate('/Facilities/AddEquip')}>ADD</button>
        <button className="btn" onClick = {() => navigate('/Facilities/EditEquip')}>EDIT</button>

            

        </div>
    )
} 