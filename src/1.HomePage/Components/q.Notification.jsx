import React from 'react'
import { FaRegBell } from 'react-icons/fa';
import { IoTicketOutline } from 'react-icons/io5';
import { GrCurrency } from 'react-icons/gr';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { api } from '../../Helper Components/Api';
import { getCookies } from '../../Helper Components/CustomCookies';
function Notification() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { isLoading, error, data } = useQuery(['tkt-otification'], async () => { return await axios.get(`${api.ticket_system.get_ticket_info_notifications_by_emp_id}/?emp_id=${getCookies()[0]}`) }
    )

    console.log(data);

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
                                    <div className='flex gap-1'>
                                        <IoTicketOutline color="black" size={25} className='m-3' />
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
                    {/* {[...Array(5).keys()].map((x, i) => {
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
                    })} */}
                </div>
            </Menu>
        </div>
    );
}

export default Notification