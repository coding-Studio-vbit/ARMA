import React, { useState } from 'react'

interface Toggle{
    isEnabled:boolean,
    toggleSwitch:(val:boolean)=>void,
}

function ToggleSwitch({isEnabled,toggleSwitch}:Toggle) {
    return (
        <div onClick={()=>toggleSwitch(!isEnabled)}
            className={
                !isEnabled?
                "flex justify-start items-center bg-arma-toggle h-6 w-16 p-0 border-2 border-transparent rounded-full cursor-pointer":
                "flex justify-end items-center bg-arma-toggle h-6 w-16 p-0 border-2 border-transparent rounded-full cursor-pointer"
            }>
            <span className="rounded-full shadow h-7 w-7 bg-arma-dark-blue transform ring-0  transition ease-in-out duration-200">
            </span>
        </div>
    )
}

export default ToggleSwitch;
