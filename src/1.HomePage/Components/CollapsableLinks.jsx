import { useContext, useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { getCookies } from '../../Helper Components/CustomCookies';
import { AppContext } from '../../App';
import { links } from '../../Static/StaticValues';
import TipTool from '../../Helper Components/TipTool';
import { IconButton } from '@mui/material';



export default function NavbarLinksGroup() {
    const user_perm = getCookies()[1]
    const { collapse, setCollapse, setOpen } = useContext(AppContext)

    function handleNavigation(link) {
        window.location.href = link
    }

    return (
        <div className='h-max grid grid-cols-1 gap-3 px-5'>
            {links.map(x => {
                return (
                    <div onClick={() => handleNavigation(x.mainlink)} className='w-100'>
                        <div className=' hover:bg-[#f7f7f7] cursor-pointer rounded-lg flex gap-3'>
                            {collapse ? <TipTool position={"right"} title={x.label} body={
                                <div className='p-3'>
                                    <Icon icon={x.icon} />
                                </div>
                            } /> : <div >
                                <Icon icon={x.icon} />
                            </div>}
                            {!collapse && <span className='text-[#555259]'>{x.label}</span>}
                        </div>
                        {/* <div className='grid gap-2'>
                            <div className='ml-15 grid grid-cols-1 gap-2'>
                                {x?.links?.length && x.links.map(x => {
                                    return (<div >
                                        <span>{x.label}</span>
                                    </div>)
                                })}
                            </div>
                        </div> */}
                    </div>
                )
            })}

        </div>
    );
}

function Icon({ icon: Icon }) {
    return (
        <div className='ml-1'>
            <Icon color="#555259" size="1.5rem" />
        </div>
    )
}