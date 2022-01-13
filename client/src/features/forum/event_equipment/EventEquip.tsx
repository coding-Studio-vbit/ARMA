import { BusinessCenter, Close } from '@material-ui/icons'
import React, { useState } from 'react'
import Select from "react-select";
import { InputField } from '../../../components/InputField/InputField'

export default function EventEquip() {
    const [equipment, setEquipment] = useState("")
    const [quantity, setQuantity] = useState("")
    const [addError, setAddError] = useState("")
    const [list, setList] = useState<{}[]>([])


    return (
        <div className="flex flex-col sm:mx-24 mt-8 md:items-start items-center mb-8 ">
      <span className='text-arma-title sm:text-4xl  text-2xl mb-8 font-semibold'>[eventname] -  Equipment</span>
        <div className='flex gap-2'>
        <span className = 'text-arma-gray text-lg mb-8 font-semibold'>Choose Equipment</span>
        <BusinessCenter className="text-arma-title" />
          </div>
          <div className='flex flex-col md:flex-row gap-y-6 items-center sm:gap-x-6 '>
          <div className=" flex flex-col gap-y-6  md:flex-row sm:gap-x-8">
          <Select
            name="Equipment"
            placeholder="Equipment"
            options={[{value:"speaker", label:"speaker"}, {value:"mic", label:"mic"}]}
            onChange={(e:any) => {setEquipment(e.value)}}
            styles={{
                control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 270,
                borderRadius: "0.5rem",
                border: "2px solid rgb(200, 200, 200)",
                }),

                placeholder: (base) => ({
                  ...base,
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: '#575757e1'
                }) 
            }}
            
            className="basic-multi-select "
           
          /> 
        </div>
        <div className=" flex flex-col gap-y-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Quantity"
            type="text"
            onChange={(e:any) => setQuantity(e.target.value)}
          />
        </div>
        <button
          className="btn  bg-arma-title rounded-[8px] px-6 py-2 my-auto"
          onClick={()=>{
            if(!equipment || !quantity){setAddError("Please fill details"); return}
            if(list.find((eqi:any) => eqi.equipment === equipment)){setAddError("Equipment already added"); return}
            setList([...list, {equipment:equipment,quantity:quantity}])
            }}
        >
          ADD
        </button>
          </div>
         <span className='text-red-500 ml-2 mt-4 mb-4 h-6 '>{addError}</span>
          
          <div className='flex gap-6 flex-wrap w-[80%] sm:w-[600px]'>
             {
                   list.map((li:any,i) => {
                   return(
                      <div className='flex justify-between bg-white shadow-lg py-5 px-4 w-max gap-6 rounded-[8px] basis-[100px] shrink'>
                               <span>{li.equipment}</span>
                              <span>{li.quantity}</span>
                              <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...list]
                                 temp.splice(i,1)
                                 setList(temp)
                             }}/>
                           </div>
                     )
                   })
                 }
            </div>

        
         
         {/* <div className="flex flex-col sm:w-[40%]">
             {
                 list.map((r:any,i) => {
                     return(
                         <div className="flex justify-between shadow-md px-4 py-2 hover:bg-black/[0.05]">
                             <span>{r.equipment}</span>
                             <span>{r.quantity}</span>
                             <Close className="cursor-pointer"onClick ={() => {
                                 let temp = [...list]
                                 temp.splice(i,1)
                                 setList(temp)
                             }}/>
                         </div>
                     )
                 })
             }

         </div> */}
      </div>
    )
    
            }

