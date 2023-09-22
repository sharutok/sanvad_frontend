import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import IMAGES from '../../assets/Image/Image';
import { FiSearch } from 'react-icons/fi';
import { FaBirthdayCake } from 'react-icons/fa';



export default function NewEmployee() {

    return (
        <div >
            <span className='text-xl p-1'>Today's Birthday</span>
            <List sx={{ width: '100%', maxHeight: 245, }} className='overflow-y-scroll border border-solid border-[#DDDDDD] rounded-[10px] '>
                {[...Array(4).keys()].map((x, i) => {
                    return (
                        <div key={i} className='    '>
                            <ListItem className='flex justify-between'>
                                <ListItemAvatar>
                                    {Math.floor(Math.random() * 2) === 1 ? <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._girl_}></Avatar>
                                        : <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._boy_}></Avatar>}
                                </ListItemAvatar>
                                <ListItemText primary={<span className='text-[16px]'>John Doe</span>} secondary={<span className='text-[12px]'>FPED </span>} />
                                <div>
                                    <ButtonComponent icon={<FaBirthdayCake color='white' size={"20"} />} btnName={"Send Wishes"} />
                                </div>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>)
                })}
            </List>
        </div>
    );
}
const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            {icon && <div className='no-underline'>
                {icon}
            </div>}
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}