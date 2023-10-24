import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IMAGES from '../../assets/Image/Image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../../Helper Components/Api';
import { FaCakeCandles } from 'react-icons/fa6';



export default function NewEmployee() {

    const tkt_type_lists = useQuery(['tkt-type-lists'], async () => {
        return await axios.get(api.user.birthday_list)
    })

    return (
        <div >
            <div className='p-3 bg-[#fff] rounded-t-xl'>
                <span className='text-[1.5rem] font-extrabold text-[#555259] '>Birthdays</span>
                <div >
                    <Divider />
                </div>
            </div>
            <List sx={{ width: '100%', maxHeight: 200, }} className='overflow-y-scroll rounded-b-xl bg-[#fff]'>
                {tkt_type_lists?.data?.data?.data?.map((x, i) => {
                    return (
                        <div key={i} >
                            <ListItem className='flex justify-between'>
                                <ListItemAvatar>
                                    {x.gender === "F" ? <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._girl_}></Avatar>
                                        : <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._boy_}></Avatar>}
                                </ListItemAvatar>
                                <ListItemText primary={<span className='text-[13px] font-bold'>{x.first_name + " " + x.last_name}</span>} secondary={<span className='text-[12px]'>{x.department}</span>} />
                                <div>
                                    <ButtonComponent icon={<FaCakeCandles size={15} color='#ED1C24' />} btnName={"Send wishes"} />
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
            className=' no-underline rounded-xl py-1 h-fit border-[3px] border-solid border-[#ED1C24] bg-[#ffffff] flex justify-between px-2 cursor-pointer hover:bg-[#e7e7e7] active:bg-[#eeeeee] transition-[1s]'>
            {icon && <div className='no-underline mt-[0.4rem]'>
                {icon}
            </div>}
            {btnName && <span className='text-[#ED1C24] font-bold text-[14px] no-underline ml-2 mt-1 pr-1'>{btnName}</span>}
        </div>
    )
}