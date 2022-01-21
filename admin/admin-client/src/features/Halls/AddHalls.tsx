import { ChangeEvent, useState } from "react"
import { Dialog } from "../../Components/Dialog/Dialog"
import { InputField } from "../../Components/InputField/InputField"
import { Close, InsertDriveFile } from "@material-ui/icons";
import { TextArea } from "../../Components/InputField/TextArea";


export const AddHalls = () => {
    return(
            <div className="flex flex-col grow items-center justify-center ">
            <div className="w-[80%] sm:w-[60%] md:w-[70%] lg:w-[50%] xl:w-[40%] items-center justify-center ">
            <p className= 'text-center  text-arma-title text-2xl font-medium mb-12 ml-2 '>ADD HALL</p>
            <div className=' flex flex-col w-full gap-y-6 mb-6 sm:gap-x-6 items-center justify-center '>
            <div className="basis-full">
            <InputField 
            name="Name"                         
            onChange={(e) =>{}}
            />
            </div>
            <div className="basis-full">
            <InputField 
            name="Block"
            onChange={(e) =>{}}
            />
            </div>
            <div>
           <InputField
            name="Capacity"
            onChange={(e) =>{}}
            />
           </div>
           <div>
           <textarea
            className="mb-5 w-[270px] border-2 border-solid border-[#c8c8c8] outline-arma-title rounded-[8px] px-6 py-[0.75rem] placeholder:text-[#575757e1]"
            rows ={3}  
            placeholder="Hall Information"
            onChange={(e) => {}}
          /> 

           </div>
            </div>
           
            <button className='btn  bg-arma-title rounded-[8px] px-6 py-2 mb-4 mt-6 ml-auto mr-auto flex justify-center' onClick={() => {}} >SUBMIT</button>


            </div>
            

        </div>
    )
} 
