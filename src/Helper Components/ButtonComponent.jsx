import React from 'react'

export default function ButtonComponent({ onChange, icon, btnName, onClick, ...props }) {
    return (
        <div
            onClick={onClick}
            onChange={onChange}
            {...props}
            className='items-center no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2 whitespace-nowrap'>{btnName}</span>}
        </div>
    )
}