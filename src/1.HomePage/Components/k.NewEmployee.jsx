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



export default function NewEmployee() {

    return (
        <div className=''>
            <span>Birthday's</span>
            <List sx={{ width: '100%', maxHeight: 245, }} className='overflow-y-scroll border border-solid border-[#DDDDDD] rounded-[10px] '>
                {[...Array(4).keys()].map((x, i) => {
                    return (
                        <div key={i} className='p-1'>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 50, height: 50 }} src={IMAGES.avatar_boy}></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <span className='text-[16px]'>
                                        John Doe
                                    </span>
                                }

                                    secondary={
                                        <span className='text-[15px]'>
                                            FPED
                                        </span>
                                    } />
                                <ListItemText primary={
                                    <>
                                        <span className='cursor-pointer px-3 py-1 rounded-[5px] bg-[#DFE0E5] text-[#7c7c7c]'>Send your wishes</span>
                                    </>
                                } />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>)
                })}
            </List>
        </div>
    );
}