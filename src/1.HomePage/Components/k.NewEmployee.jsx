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

export default function NewEmployee() {
    return (
        <div>
            <span>Birthday's</span>
            <List sx={{ width: '100%', maxHeight: 360, maxWidth: 360 }} className='overflow-y-scroll'>
                {[...Array(10).keys()].map(x => {
                    return (
                        <div>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountBoxIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="John Doe" secondary="IT" />
                                <ListItemText primary={
                                    <>
                                        <span className='cursor-pointer px-3 py-1 rounded-[5px] bg-[#c0c0c0] text-[#ffff3f]'>Wish</span>
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