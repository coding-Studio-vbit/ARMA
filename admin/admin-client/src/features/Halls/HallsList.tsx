import { useNavigate } from "react-router-dom"

export const HallsList = () => {
const navigate = useNavigate()
    return(
        <div>
        <button className="btn" onClick = {() => navigate('/Halls/AddHall')}>ADD</button>
        <button className="btn" onClick = {() => navigate('/Halls/EditHall')}>EDIT</button>

            

        </div>
    )
} 
