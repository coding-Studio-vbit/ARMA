import React, { useState } from 'react'

interface Toggle{
    isEnabled:boolean,
    toggleSwitch:(val:boolean)=>void,
}

function ToggleSwitch({isEnabled,toggleSwitch}:Toggle) {
    return (
        <div onClick={()=>toggleSwitch(!isEnabled)}
            className={
                "flex mx-2 items-center bg-arma-toggle h-5 w-12  md:h-6 md:w-14 p-0 border-2 border-transparent rounded-full cursor-pointer"
            }>
            <span 
            className={
                isEnabled?
                "rounded-full  translate-x-6 md:translate-x-7 shadow h-6 w-6 md:h-7 md:w-7 bg-arma-dark-blue transform ring-0  transition ease-in-out duration-200":
                "rounded-full -translate-x-1 shadow h-6 w-6 md:h-7 md:w-7 bg-gray-500 transform ring-0  transition ease-in-out duration-200"
            }>
            </span>
        </div>
    )
}

export default ToggleSwitch;
