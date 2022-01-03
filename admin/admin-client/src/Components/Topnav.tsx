import React from 'react'
import { AccountCircle } from "@material-ui/icons";

export const Topnav = () => {
    return (
            <div className='border-b-[0.3px] w-full border-[#898888] flex justify-end p-3 '>
                <div className='flex gap-2 items-center'>
                <span>NAME HERE</span>
                <AccountCircle className='!w-10 !h-10' />  
                </div>
            </div>   
    )
}

