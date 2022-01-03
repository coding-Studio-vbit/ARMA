import { InputField } from "../../Components/InputField/InputField"

export const AddAdmin = () => {
    return(
        <div className="flex flex-col grow">
            <div className="ml-10 mt-12 w-max ">
            <p className='text-arma-title text-2xl font-medium mb-12 ml-2 '>ADD ADMIN</p>

            <div className='flex gap-x-8 mb-12'>
            <InputField 
            name="Email"                         
            onChange={(e) =>{}}
            />
            <InputField 
            name="Password"
            type="password"
            onChange={(e) =>{}}
            />
            </div>
            <InputField 
            name="Confirm Password"
            type="password"
            onChange={(e) =>{}}
            />
            <button className='btn bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center'>ADD</button>
            </div>
            

        </div>
    )
} 
