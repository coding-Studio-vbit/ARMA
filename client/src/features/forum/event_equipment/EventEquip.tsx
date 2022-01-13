import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/CustomNavbar';
import { Spinner } from '../../../components/Spinner/Spinner';
import { ChangeEvent } from "react";
import { Dialog } from "../../../components/Dialog/Dialog";
import { InputField } from "../../../components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { BusinessCenter, Close } from "@material-ui/icons";

function EventEquip()
{
    const [name, setName] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [event, setEvent] = useState<string>("");
    const [username,setUsername] = useState<string>("")
    const [equipment, setEquipment] = useState("")
    const [nameError, setNameError] = useState<string>();
    const [quantityError, setQuantityError] = useState<string>();
    const [quantity, setQuantity] = useState("")
    const [list, setList] = useState<{equipment:string, quantity: string} []>([])
    let temp = [...list]

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setUsername("coding.Studio();");
            setEvent("SoC");         
        }, 2000);        
    }, [])

    const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setName(name);
        if (name.length === 0) {
          setNameError("Name field is empty");
        } 
        else {
            setNameError("");
          }
        
      };
    
      
      const validateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        setQuantity(quantity);
        if (quantity.length === 0) {
          setQuantityError("Quantity field is empty");
        } 
        else {
            setQuantityError("");
          }
        
      };

    return !loading?((
       
        <div id='eventEquipmentPage'>
            
            <div id='forumEventEquipmentPage' className='w-screen mx-auto my-5 mt-13 w-11/12 '>

                

                <div className='mx-auto'>
                    <div className='flex flex-row justify-start items-center mb-12'>
                        <span className=' font-normal md:font-semibold text-arma-dark-blue text-xl md:text-2xl '>{username+" "+event}-Equipment</span>
                    </div>
                    <div className= "flex justify-left items-center mb-12">
                        <span className="font-normal text-arma-title text-xl font-medium ml-2">Choose Equipment</span>
                        <BusinessCenter className="material-icons text-arma-dark-blue ml-2"></BusinessCenter>
                    </div>

                    <div className=" flex flex-col sm:flex-row gap-6 mb-6 w-1/2 ml-5">
                    <Select
                            name="Choose Equipment"
                            placeholder="Equipment"
                            
                            options={[{value:"Mic", label:"Mic"},{value:"Speaker", label:"Speaker"}]}
                            styles={{
                            control: (base) => ({
                            ...base,
                            minHeight: 44,
                            minWidth: 272,
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
                            onChange={(e:any) =>{setEquipment(e.value)}}
            
                            className="basic-multi-select w-full h-full"
                        />
                        <InputField
                            name="Quantity"
                            type="text"
                            error={quantityError}
                            onChange={(e) =>{setQuantity(e.target.value)}}
                        />
                        <button className='btn  bg-arma-title rounded-[8px]  ml-auto mr-auto flex justify-right' 
                        onClick={() => {
                            setList([...list, {equipment: equipment, quantity: quantity}])
                        }} >ADD</button>
                    </div>
                    <div className="flex flex-col w-max ml-8">
                {
                    list.map((p,i) => {
                    return(
                        <div className="flex gap-16 shrink px-6 py-4 bg-white border-2 rounded">
                            <span className="font-semibold">{p.equipment}</span>
                            <span className="font-semibold">{p.quantity}</span>
                            <Close className="cursor-pointer" onClick={() => {temp.splice(i,1);  setList(temp); console.log(temp);}} />
                        </div>
                    )
                    })
                }
            </div>

                    <div className="  ">
                        
                        </div>

                {/* <Dialog show={show} setShow={setShow} title="Added">{" "}</Dialog> */}
                </div>
            </div>
        </div>
    )
        
    ):
    <div className='flex h-screen justify-center items-center'>
        <Spinner className=''/>
    </div>
}

export default EventEquip;