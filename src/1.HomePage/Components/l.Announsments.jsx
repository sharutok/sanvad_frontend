import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material'
import React from 'react'
import IMAGES from '../../assets/Image/Image'
import moment from 'moment';

export default function Announsments() {
    return (
        <div className=' '>
            <div className='p-3 bg-[#fff] rounded-t-xl  '>
                <span className='text-[1.2rem] font-extrabold text-[#555259] '>Announcements</span>
                <div >
                    <Divider />
                </div>
            </div>
            <List sx={{ width: '100%', maxHeight: "10rem" }} className=' overflow-y-scroll rounded-b-xl bg-[#fff] '>
                {false ? [...Array(3).keys()].map((x, i) => {
                    return (
                        <div key={i} >
                            <ListItem className='flex justify-between'>
                                <ListItemAvatar>
                                    <div className='bg-[red] rounded-full w-fit h-fit p-2'>
                                        <img loading='lazy' src={IMAGES.announcement} alt="" width={25} />
                                    </div>
                                </ListItemAvatar>
                                <ListItemText primary={<span className='text-[14px] font-bold'>{"Toss out that granular state management, manual refetching and endless bowls of async-spaghetti code. TanStack Query gives you"}</span>} secondary={<span className='text-[12px] flex justify-end'>{moment().format("DD MMM YYYY")}</span>} />

                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>)
                }) : <div >
                    <Stack spacing={1} alignItems={"center"} >
                        <img loading='lazy' src={IMAGES.no_announcement} alt="" width={150} />
                        <span className='font-bold'>NO ANNOUNCEMENT</span>
                    </Stack>
                </div>}
            </List>
        </div>
    );
}
