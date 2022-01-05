import { ChangeEvent, useState } from "react"
import { Dialog } from "../../Components/Dialog/Dialog"
import { InputField } from "../../Components/InputField/InputField"
import { Close, InsertDriveFile } from "@material-ui/icons";


export const AddHalls = () => {
const [equipment, setEquipment] = useState("")
const [quantity, setQuantity] = useState("")
const [list, setList] = useState<{equipment:string, quantity: string} []>([])
let temp = [...list]
    return(
            <div className="flex flex-col grow items-center">
            <div className="mt-12 w-[90%] sm:w-[60%] md:w-[80%] lg:w-[60%]">
            <p className= 'text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 '>ADD HALL</p>
           
            <InputField
            className="mb-6"
            name="Name"
            onChange={(e) =>{}}
            />

            <div className=' flex flex-col gap-y-6 mb-12  md:flex-row sm:gap-x-8'>
            <InputField 
            name="Block"                         
            onChange={(e) =>{}}
            />
            <InputField 
            name="Capacity"
            onChange={(e) =>{}}
            />
            </div>
            
            <p className= 'text-center lg:text-left text-arma-title text-lg font-medium mb-4 ml-2 '>Equipment</p>

            <div className=' flex flex-col gap-y-6 mb-6  w-full md:w-[100%] lg:w-[90%] sm:w-[100%] align-middle md:flex-row sm:gap-x-4'>

            <InputField 
            name="Equipment"                         
            onChange={(e) =>{setEquipment(e.target.value)}}
            />
            <InputField 
            name="Quantity"
            onChange={(e) =>{setQuantity(e.target.value)}}
            />
            <button className='btn  bg-arma-title rounded-[8px]  ml-auto mr-auto flex justify-center' onClick={() => {
             setList([...list, {equipment: equipment, quantity: quantity}])
            }} >ADD</button>
            </div>
            <div className="flex flex-col w-full sm:w-[90%]">
                {
                    list.map((p,i) => {
                    return(
                        <div className="flex shodow-2xl w-full border-[1px] border-black/30 rounded-[8px] p-1 mb-2 px-6">
                            <span className="grow-[2]">{p.equipment}</span>
                            <span className="grow-[1] font-semibold">{p.quantity}</span>
                            <Close className="cursor-pointer" onClick={() => {temp.splice(i,1);  setList(temp); console.log(temp);}} />
                        </div>
                    )
                    })
                }
            </div>


            <button className='btn  bg-arma-title rounded-[8px] px-6 py-2 mb-4 mt-12 ml-auto mr-auto flex justify-center' onClick={() => {}} >SUBMIT</button>


            </div>
            

        </div>
    )
} 
