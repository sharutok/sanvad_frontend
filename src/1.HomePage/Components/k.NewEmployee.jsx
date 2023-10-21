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
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../../Helper Components/Api';



export default function NewEmployee() {

    const tkt_type_lists = useQuery(['tkt-type-lists'], async () => {
        return await axios.get(api.user.birthday_list)
    })

    return (
        <div >
            <List sx={{ width: '100%', maxHeight: 245, }} className='overflow-y-scroll rounded-2xl bg-[#fff]'>
                {/* <span className='text-xl p-1 ml-4'>Today's Birthday</span> */}
                {tkt_type_lists?.data?.data?.data?.map((x, i) => {
                    return (
                        <div key={i} >
                            <ListItem className='flex justify-between'>
                                <ListItemAvatar>
                                    {x.gender === "F" ? <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._girl_}></Avatar>
                                        : <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._boy_}></Avatar>}
                                </ListItemAvatar>
                                <ListItemText primary={<span className='text-[16px]'>{x.first_name + " " + x.last_name}</span>} secondary={<span className='text-[12px]'>{x.department}</span>} />
                                <div>
                                    {/* <ButtonComponent icon={<LiaBirthdayCakeSolid size={23} />} btnName={"Send Birthday Wishes"} /> */}
                                    <ButtonComponent icon={<img className='' width={30} src={IMAGES.confetti_gif} alt="" />} btnName={"Send Birthday Wishes"} />
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
            className=' no-underline rounded-lg py-2 h-fit border-[#c7c7c7] bg-[#DFE0E5] flex justify-between px-6 cursor-pointer hover:bg-[#e7e7e7] active:bg-[#000000] transition-[1s]'>
            {icon && <div className='no-underline'>
                {icon}
            </div>}
            {btnName && <span className='text-[#383838] font-bold text-[14px] no-underline ml-2 mt-1 pr-1'>{btnName}</span>}
        </div>
    )
}