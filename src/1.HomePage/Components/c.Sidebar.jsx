import NavbarLinksGroup from './CollapsableLinks';
import MenuIcon from '@mui/icons-material/Menu';
import { Collapse, IconButton, Tooltip } from '@mui/material';
import '../../../Style/Sidebar.css'
import { useContext, useState } from 'react';
import { AppContext } from '../../App';

export default function SideBar() {
    const { collapse, setCollapse } = useContext(AppContext)
    return (
        <div className={`h-screen border-r-[.5px] border-solid border-[#e9e9e9] overflow-hidden bg-[white] box ${collapse ? 'expanded' : ''}`}>
            <div >
                <div>
                    <div className='flex justify-start px-6 py-4 mt-20'>
                        <Tooltip disableInteractive title={`Click ${!collapse ? "Less" : "More"}`} placement='right'>
                            <IconButton onClick={() => setCollapse(!collapse)}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    </div>

                </div>
                <div>
                    <NavbarLinksGroup />
                </div>

            </div>
        </div>
    );
}
