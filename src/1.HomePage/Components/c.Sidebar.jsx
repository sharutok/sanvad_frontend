import { Navbar, Text, createStyles, getStylesRef, rem } from '@mantine/core';
import NavbarLinksGroup from './f.CollapsableLinks';
import MenuIcon from '@mui/icons-material/Menu';
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';

export default function SideBar() {
    const { collapse, setCollapse } = useContext(AppContext)
    return (
        <div >
            <Navbar width={{ sm: collapse ? 100 : 400 }} className={'overflow-y-scroll bg-[white] transition-transform duration-200 ease-[ease]'}>
                <Navbar.Section>
                    <div className='flex justify-start px-6 py-4 '>
                        <IconButton onClick={() => setCollapse(!collapse)}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Navbar.Section>

                <Navbar.Section grow mt="xl">
                    <NavbarLinksGroup />
                </Navbar.Section>
            </Navbar>
        </div>
    );
}


