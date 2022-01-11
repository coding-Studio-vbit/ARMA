import React from 'react'

export default function RequestsView() {
    return (
        <div className ='mx-4 mt-2 gap-y-4'>
            <div className='flex flex-col'>
                <span className='text-arma-title text-xl font-medium'>Request to conduct [event name]</span>
                <div className='flex gap-x-4'>
                    <span className='text-arma-gray text-sm'>[forum name]</span>
                    <span className='text-arma-gray text-sm'>[faculty coordinator]</span>
                </div>
            </div>
            
        </div>
    )
}
