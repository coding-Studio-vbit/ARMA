import React, { FC, useState } from 'react'
import { AccountCircle, Menu } from "@material-ui/icons";

interface TopnavProps{
    showSidebar: boolean,
    setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>
}

export const Topnav: FC<TopnavProps> = ({showSidebar,setShowSidebar}) => {
    return (
            <div className='border-b-[0.3px] w-full border-[#898888] flex items-center sm:justify-end justify-between p-3 '>
                <Menu className='sm:!hidden cursor-pointer'  onClick ={()=> setShowSidebar(!showSidebar)}/>
                <div className='flex gap-2 items-center'>
                <span>NAME HERE</span>
                <AccountCircle className='!w-10 !h-10' />  
                </div>
            </div>   
    )
}

