import { useEffect, useState } from "react";



export const useLocalStorageState = <T extends unknown>(key:string,initialValue:T) :[T,React.Dispatch<React.SetStateAction<T>>] => {

    const [data,setData] = useState<T>(()=>{
        const value = localStorage.getItem(key)
        console.log(value);
        
        if(!value || value === 'undefined')
        return initialValue
        return JSON.parse(value?value:'')
    })
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(data))
    },[data])

    return [data,setData];
}
/**
 * 
 * @param {string} key Any unqiue key
 * @param {any} initialValue 
 * 
 * Data will be deleted when browser or app is closed. Best for storing temporary session data.
 * 
    usage 
    
    const [data,setData] = useSessionStorageState("data","")
 */
export const useSessionStorageState = <T extends unknown>(key:string,initialValue:T):[T,React.Dispatch<React.SetStateAction<T>>]  => {

    const [data,setData] = useState<T>(()=>{
        const value = sessionStorage.getItem(key)
        if(!value || value === 'undefined')
        return initialValue
        return JSON.parse(value?value:'')
    })
    useEffect(()=>{
        sessionStorage.setItem(key,JSON.stringify(data))
    },[data])

    return [data,setData];
}