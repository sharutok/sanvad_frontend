import React, { useContext, useState } from 'react'
import { PiFlowArrow } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";


import TipTool from '../../Helper Components/TipTool';
import { AppContext } from '../../App';

function AdvDropdown({ x }) {
    const [show, setShow] = useState(false)
    const { collapse, setCollapse } = useContext(AppContext)
    return (
        <div>
            <div className='flex'>
                <div onClick={() => { setShow(!show), collapse && setCollapse(false) }} className=' hover:bg-[#f7f7f7] cursor-pointer rounded-lg flex gap-3 w-full'>
                    <TipTool position={"right"} title={x.label} body={
                        <div className='p-3' >
                            <Icon icon={x.icon} />
                        </div>
                    } />
                    {!collapse &&
                        <>
                            <span className='text-[#555259] p-3'>{x.label}</span>
                            <div className='p-4 '>
                                {show ? <IoIosArrowForward color="#555259" size="1rem" /> :
                                    <IoIosArrowDown color="#555259" size="1rem" />}
                            </div>
                        </>
                    }
                </div>
            </div>
            {show &&
                x.links.map((y, n) => {
                    return (
                        <div key={n} className='ml-5'>
                            <div onClick={() => handleNavigation(y.link)} className=' hover:bg-[#f7f7f7] cursor-pointer rounded-lg flex '>
                                <div className='p-3 ml-3'>
                                    <Icon icon={y.icon} />
                                </div>
                                <span className='text-[#555259] p-3'>{y.label}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
function handleNavigation(link) {
    window.location.href = link
}

function Icon({ icon: Icon }) {
    return (
        <div className='ml-1'>
            <Icon color="#555259" size="1.5rem" />
        </div>
    )
}

export default AdvDropdown