import React, { useState } from 'react'

interface Toggle{
    isEnabled:boolean,
    toggleSwitch:(val:boolean)=>void,
}

function ToggleSwitch({isEnabled,toggleSwitch}:Toggle) {
    return (
        <div onClick={()=>toggleSwitch(!isEnabled)}
            className={
                "flex  items-center bg-arma-toggle h-5 w-14 p-0 border-2 border-transparent rounded-full cursor-pointer"
            }>
            <span 

            className={
                isEnabled?
                "rounded-full translate-x-8 shadow h-6 w-6 bg-arma-dark-blue transform ring-0  transition ease-in-out duration-200":
                "rounded-full -translate-x-1 shadow h-6 w-6 bg-arma-dark-blue transform ring-0  transition ease-in-out duration-200"

            }>
            </span>
        </div>
    )
}

export default ToggleSwitch;
