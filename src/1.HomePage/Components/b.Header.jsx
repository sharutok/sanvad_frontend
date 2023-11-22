import React from 'react'
import { FaRegBell } from 'react-icons/fa';
import { IoTicketOutline } from 'react-icons/io5';
import { GrCurrency } from 'react-icons/gr';
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
import Divider from '@mui/material/Divider';

export default function HeaderMegaMenu() {
    return (
        <div className='fixed top-0 w-[100%] bg-[#ffff] overflow-y-hidden'>
            <div className=' border-b-[.5px] border-solid border-[#e9e9e9] p-2'>
                <div className='flex justify-between h-fit'  >
                    <div onClick={() => window.location.href = '/home'} className='flex gap-4 cursor-pointer '>
                        <div className='py-1'>
                            <img loading='lazy' src={IMAGES.ador_logo} alt="Ador" width={"60"} />
                        </div>
                        <div className='py-2'>
                            <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                        </div>
                        <span className='text-[#555259] py-1 font-bold  text-[1.4rem]' > SANVAD</span>
                    </div>
                    <div className='flex' >
                        <Notification />
                        <AccountMenu />
                    </div>
                </div>
            </div >
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

