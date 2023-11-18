import { Navbar, Text, createStyles, getStylesRef, rem } from '@mantine/core';
import NavbarLinksGroup from './CollapsableLinks';
import MenuIcon from '@mui/icons-material/Menu';
import { Collapse, IconButton, Tooltip } from '@mui/material';
import '../../../Style/Sidebar.css'
import { useContext, useState } from 'react';
import { AppContext } from '../../App';

export default function SideBar() {
    const { collapse, setCollapse } = useContext(AppContext)
    return (
        <div className={`overflow-y-scroll bg-[white] box ${collapse ? 'expanded' : ''}`}>
            <Navbar >
                <Navbar.Section>
                    <div className='flex justify-start px-6 py-4 '>
                        <Tooltip disableInteractive title={`Click ${!collapse ? "Less" : "More"}`} placement='right'>
                            <IconButton onClick={() => setCollapse(!collapse)}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    </div>

                </Navbar.Section>

                <Navbar.Section grow mt="xl">
                    <NavbarLinksGroup />
                </Navbar.Section>

            </Navbar>
        </div>
    );
}
