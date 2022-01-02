import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/CustomNavbar';
import { Spinner } from '../../../components/Spinner/Spinner';


function FacultyDashBoard() {
    const navItems=[
        {  label:'Dashboard',icon:"home",path:'/'},
        {  label:'Forums',icon:"group",path:'/' },
        {  label:'Students',icon:"person",path:'/' },
        
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
        <div >
            <Navbar navItems={navItems} userName={"Prashanith"}/>
        </div>
        ):
        <div className='flex h-screen justify-center items-center'>
            <Spinner className=''/>
        </div>
}

export default FacultyDashBoard;
