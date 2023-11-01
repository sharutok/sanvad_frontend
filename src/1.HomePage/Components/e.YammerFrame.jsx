import React, { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../../Helper Components/Api'
import moment from 'moment'
import { AiOutlineLike } from 'react-icons/ai';
import { createStyles, Card, getStylesRef, rem, Group, Text } from '@mantine/core';
import LoadingSpinner from '../../Helper Components/LoadingSpinner'
import Avatar from '@mui/material/Avatar';
import IMAGES from '../../assets/Image/Image'
import { Divider } from '@mui/material'


export default function YammerFrame() {
    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.yammer.get_data) }, { staleTime: "300000" })
    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <div >
            <div className='p-3 bg-[#fff] rounded-t-xl'>
                <span className='text-[1.2rem] font-extrabold text-[#555259] '>Posts</span>
                <div >
                    <Divider />
                </div>
            </div>
            <div className='h-[82vh] overflow-y-auto p-4 bg-[#fff] border-solid border-[#ffffff] rounded-b-xl border '>
                {!isLoading && <ICarousels data={data} />}
            </div>
        </div>
    )
}

const useStyles = createStyles((theme) => ({
    price: {
        color: theme.black,
    },

    carousel: {
        '&:hover': {
            [`& .${getStylesRef('carouselControls')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getStylesRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        color: 'red',
        width: rem(10),
        height: rem(10),
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: rem(16),
        },
    },
}));



function ICarousels({ data }) {
    return (
        data?.data?.data?.map((x, i) => {
            return (
                <div key={i} className='grid mb-6 '>
                    <div className='shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] p-4 grid rounded-xl'>
                        <div className='flex gap-2 p-2'>
                            <Avatar sx={{ width: 45, height: 45, bgcolor: "#2b58a5" }}>{(x.sender_id).split(" ")[0][0]}{String((x.sender_id).split(" ")[1])[0].toUpperCase()}</Avatar>
                            <div className='grid grid-cols-1'>
                                <span className='text-lg'>{x.sender_id}</span>
                                <span className='text-xs'>{moment(x.created_at).format("DD MMMM YYYY")}</span>
                            </div>
                        </div>
                        <div className='text-center my-3 mx-1' style={{ wordBreak: "break-word" }}>
                            <p className='text-lg font-extrabold'>{x.message.toUpperCase()}</p>
                        </div>

                        <div className='flex justify-center '>
                            {x?.image[0]?.type === "image" && <img style={{ width: "400px" }} src={x.image[0].sharepoint_web_url} />}
                            {x?.image[0]?.type === "file" && <video style={{ width: "400px" }} controls>
                                <source src={x?.image[0]?.sharepoint_web_url} type="video/mp4" />
                            </video>}
                        </div>
                        <div className='py-2'>
                            <Group className='px-3' position="apart" >
                                <Text fw={500} >
                                    <div className='flex'>
                                        <img className='rotate-180 -scale-x-100' width={30} src={IMAGES.like_gif} alt="" />
                                        {/* <AiOutlineLike color="#3d3d3d" fontSize='20' className='cursor-pointer' /> */}
                                        <span color='#3d3d3d' className=' text-lg'>{x.liked_by}</span>
                                    </div>
                                </Text>
                                <Group spacing={5}>
                                    <Text fz="xs" fw={500}>
                                        <a href={x.web_url}>Click here for more...</a>
                                    </Text>
                                </Group>
                            </Group>
                        </div>
                    </div>
                </div >
            )
        })
    )
}