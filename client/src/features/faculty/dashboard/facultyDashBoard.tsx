import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/CustomNavbar';
import { Spinner } from '../../../components/Spinner/Spinner';


function FacultyDashBoard() {
    const navItems=[
        {  label:'Dashboard',path:'' },
        {  label:'Forums',path:'' },
        {  label:'Students',path:'' },
    ];
    const [loading, setLoading] = useState(false);

    async function fetchData(){
        setTimeout(() => {
            setLoading(false);
        }, 2000);    
    }

    useEffect(() => {
        fetchData();        
    }, [])

    return !loading?(
        <div>
            <Navbar navItems={navItems} userName={"Prashanith"}/>
            <p className='text-black'>rgegtg</p>
        </div>
        ):
        <div className='flex h-screen justify-center items-center'>
            <Spinner className=''/>
        </div>
}

export default FacultyDashBoard;
