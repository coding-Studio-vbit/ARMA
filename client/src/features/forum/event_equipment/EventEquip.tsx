import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/CustomNavbar';
//import { Spinner } from '../../../components/Spinner/Spinner';

function EventEquip()
{
    const navItems=[
        {  label:'Dashboard',icon:"home",path:'/'},
        {  label:'Forums',icon:"group",path:'/' },
        {  label:'Students',icon:"person",path:'/' },
        
    ];
    const [username,setUsername] = useState<string>('anisha')
    return(
       
        <div>
             <Navbar navItems={navItems} userName={username}/>
            <div>c.S() SOC</div>
        </div>
        
    );
}
export default EventEquip;