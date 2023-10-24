import React from 'react'
import { MdSupportAgent } from 'react-icons/md';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai'
export default function Feedback() {
    return (
        <BasicPopover />
    )
}



function BasicPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <div onClick={handleClick} className='shadow-[rgba(0,0,0,0.35)_0px_5px_15px] absolute bottom-10 right-10 bg-[#83bde7c2] rounded-full p-2  hover:bg-[#2ea1ffc2] cursor-pointer active:bg-[#2b88d4c2]'>
                <MdSupportAgent color='#fff' size={40} />
            </div >
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <div className='pl-5 pr-10 py-2 grid grid-cols-1 gap-3'>
                    <span className='font-bold' >Any Feedback?</span>
                    <div className='flex'>
                        <TextField multiline={true} rows={2} size='small' id="outlined-basic" label="Suggestions" variant="outlined" />
                        <Button variant='contained'>Send</Button>
                    </div>
                </div>
            </Popover>
        </div>
    );
}