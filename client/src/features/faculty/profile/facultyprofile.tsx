import React from 'react';


function FacultyProfile() {
    return (
        <body className='min-h-screen  bg-[#E5E5EA]'>
        <div>
            <div className='flex justify-end mt-14 pr-10 mb-20'>
            <button className='outlineBtn'>LOGOUT</button>
            </div>
            <div className='flex flex-col w-[542px] items-center m-auto'>
            <p className='text-center item-center text-3xl text-arma-blue'>Siddharth Malladi</p>
            
            <p className = 'text-black mt-4 mb-10 text-lg'>Faculty</p>
            <div className='flex gap-x-11 mb-10'>
            <input className='shadow appearance-none border rounded-[24px] py-2 px-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder='Rollnumber' />
            <input className='shadow appearance-none border rounded-[24px] py-2 px-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder='Email' />
            </div>
            <div className='flex gap-x-11 mb-10'>
            <input className='shadow appearance-none border rounded-[24px] py-2 px-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder='Designation' />
            <input className='shadow appearance-none border rounded-[24px] py-2 px-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder='Department' />
            </div>
            <input className='shadow appearance-none border rounded-[24px] py-2 px-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline self-start' type="text" placeholder='Phone Number' />

            
            </div>
        </div>
        </body>
    );
}

export {FacultyProfile}



