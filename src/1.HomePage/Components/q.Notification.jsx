import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { IoTicketOutline } from 'react-icons/io5';
import { api } from '../../Helper Components/Api';
import { getCookies } from '../../Helper Components/CustomCookies';
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import { Badge } from '@mui/material';
import moment from 'moment';

function Notification() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries('tkt-notification');
    }, [anchorEl, queryClient]);

    const { isLoading, data } = useQuery(['tkt-notification'], async () => {
        return await axios.get(`${api.ticket_system.get_ticket_info_notifications_by_emp_id}/?emp_id=${getCookies()[0]}`)
    }
    )
    const handleTicketNav = async (key) => {
        const ticket_id = key.split(":")[1]
        await handleTicketRemoveFromNotification(key)
        window.location.href = `/ticket/sys/${ticket_id}`
    }

    const handleTicketRemoveFromNotification = async (key) => {
        try {
            await axios.delete(`${api.ticket_system.get_ticket_info_notifications_by_emp_id}/?key=${key}`)
        } catch (error) {
            console.log("error in handleTicketRemoveFromNotification", error)
        }
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
                        aria-expanded={open ? 'true' : undefined}>
                        <Badge color='primary' badgeContent={Number(data?.data?.length) || 0}>
                            <Avatar sx={{ width: 35, height: 35, backgroundColor: "#555259" }}>
                                <FaRegBell />
                            </Avatar>
                        </Badge>
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
                    {!isLoading ? data?.data?.map((x, i) => {
                        const { ticket_no, created_at, requester_emp_no, } = JSON.parse(x.value)
                        return (
                            <div key={i}>
                                <div className='px-2'>
                                    {Number(i) !== 0 && <Divider />}
                                </div>
                                <MenuItem onClick={handleClose}>
                                    <div onClick={() => handleTicketNav(x.key)} className='flex'>
                                        <div className='grid grid-cols-1 gap-1'>
                                            <div className='flex items-center gap-3'>
                                                <IoTicketOutline color="black" size={25} />
                                                <span className='font-bold text-sm inline-block max-w-xs truncate'>{ticket_no} </span> |
                                                <span className='text-sm inline-block max-w-xs truncate gap-3'><span className='font-bold'>Raised By: </span>{requester_emp_no}</span> |
                                                <span className='text-sm text-[#4768ff]'> {moment(created_at.substring(0, 10), "YYYY-MM-DD").format("DD-MM-YYYY")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </MenuItem>
                            </div>
                        )
                    }) :
                        <MenuItem>
                            <div className='m-20'>
                                <LoadingSpinner />
                            </div>
                        </MenuItem>
                    }
                </div>
            </Menu>
        </div>
    );
}

export default Notification