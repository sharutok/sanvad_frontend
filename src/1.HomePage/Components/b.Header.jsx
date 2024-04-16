import React from 'react'
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
import Notification from './q.Notification';

export default function HeaderMegaMenu() {
    return (
        <div className='fixed top-0 w-[100%] bg-[#ffff] overflow-y-hidden z-[10]'>
            <div className=' border-b-[.5px] border-solid border-[#e9e9e9] p-2'>
                <div className='flex justify-between h-fit'  >
                    <div onClick={() => window.location.href = '/home'} className='flex gap-4 cursor-pointer ml-5'>
                        <div className='py-2'>
                            <img loading='lazy' src={IMAGES.ador_star_logo} alt="Ador" width={"30"} />
                        </div>
                        <div className='py-3'>
                            <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                        </div>
                        <span align="center" style={{ fontFamily: "Archive" }} className='py-1 text-[1.3rem] mt-1 text-[#555259] font-extrabold'>ADOR<span style={{ fontFamily: "Archive" }} className='text-red-600 font-bold'>HUB</span></span>
                    </div>
                    <div className='flex mr-5' >
                        {/* <Notification /> */}
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



