import React from 'react'
import { createStyles, Header, HoverCard, Group, Button, UnstyledButton, Text, SimpleGrid, ThemeIcon, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, rem, Title, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconChevronDown
} from '@tabler/icons-react';
import { FaUsers, FaIdBadge, FaRegBell } from 'react-icons/fa';
import { IoTicketOutline } from 'react-icons/io5';
import { GrCurrency } from 'react-icons/gr';
import { AiFillAccountBook } from 'react-icons/ai';
import IMAGES from '../../assets/Image/Image';
import '../../../Style/Header.css'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { deleteCookies, getCookies } from '../../Helper Components/CustomCookies';
const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

export default function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    return (
        <div className='fixed top-0 w-[100%] bg-[#ffff] '>
            <Box className=' border-b-[.5px] border-solid border-[#e9e9e9] '>
                <Header className='bg-[#ffff] ' height={60} px="md" >
                    <Group position="apart" sx={{ height: '100%' }} >
                        <div onClick={() => window.location.href = '/home'} className='flex gap-4 cursor-pointer '>
                            <img loading='lazy' src={IMAGES.ador_logo} alt="Ador" width={"60"} />
                            <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                            <Title align="center" className='text-[#555259]' sx={(theme) => ({ fontSize: "22px", textTransform: "uppercase" })}> Sanvad</Title>
                        </div>
                        <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                            <Notification />
                            <AccountMenu />
                        </Group>
                    </Group>
                </Header>
            </Box >
        </div>
    );
}

function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const initials = getCookies()[2]
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleLogOut() {
        window.location.href = "/login"
        deleteCookies()

    }
    return (
        <React.Fragment>
            <div sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 35, height: 35, backgroundColor: "#555259" }}>{initials && initials.toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

function Notification() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleLogOut() {
        window.location.href = "/login"
        deleteCookies()

    }
    return (
        <div >
            <div sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Notification">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 35, height: 35, backgroundColor: "#555259" }}><FaRegBell /></Avatar>
                    </IconButton>
                </Tooltip>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='max-h-[15rem] overflow-scroll'>
                    {[...Array(5).keys()].map((x, i) => {
                        return (
                            <div key={i}>
                                <MenuItem onClick={handleClose}>
                                    <div className='flex gap-3'>
                                        <IoTicketOutline color="black" size={25} className='mt-3' />
                                        <Divider orientation='vertical' />
                                        <div className='grid-cols-1'>
                                            <span>Toss out that granular state management</span>
                                            <h1 className='text-right text-[#ED1C24]'> date</h1>
                                        </div>

                                    </div>
                                </MenuItem>
                                <div className='px-3'>
                                    <Divider />
                                </div>
                            </div>
                        )
                    })}
                    {[...Array(5).keys()].map((x, i) => {
                        return (
                            <div key={i}>
                                <MenuItem nuItem onClick={handleClose}>
                                    <div className='flex gap-3'>
                                        <GrCurrency size={25} className='mt-3' />
                                        <Divider orientation='vertical' />
                                        <div className='grid-cols-1'>
                                            <span>Toss out that granular state management</span>
                                            <div className='flex justify-end'>
                                                <h1 className='text-[#ED1C24]'> date</h1>
                                            </div>
                                        </div>
                                    </div>
                                </MenuItem>
                                <div className='px-3'>
                                    <Divider />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Menu>
        </div>
    );
}