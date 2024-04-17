import NavbarLinksGroup from './CollapsableLinks';
import MenuIcon from '@mui/icons-material/Menu';
import { Collapse, IconButton, Tooltip } from '@mui/material';
import { RiCloseLine } from "react-icons/ri";
import '../../../Style/Sidebar.css'
import { useContext, useState } from 'react';
import { AppContext } from '../../App';

export default function SideBar() {
    const { collapse, setCollapse } = useContext(AppContext)
    return (
        <div className=''>
            <div className={`z-10 fixed h-screen  border-r-[.5px] border-solid border-[#e9e9e9] overflow-hidden bg-[white]  ${collapse ? 'expanded' : ''}`}>
                <div >
                    <div>
                        <div className='flex justify-start px-7 py-4 mt-20 '>
                            <Tooltip disableInteractive title={`Click ${!collapse ? "Less" : "More"}`} placement='right'>
                                <IconButton onClick={() => setCollapse(!collapse)}>
                                    {collapse ? <MenuIcon /> : <RiCloseLine />}
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <NavbarLinksGroup />
                    </div>
                </div>
            </div>
        </div>
    );
}
