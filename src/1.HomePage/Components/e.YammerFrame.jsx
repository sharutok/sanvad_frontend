import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../../Helper Components/Api'
import moment from 'moment'
import LoadingSpinner from '../../Helper Components/LoadingSpinner'
import Avatar from '@mui/material/Avatar';
import IMAGES from '../../assets/Image/Image'
import { Divider } from '@mui/material'
import { getCookies } from '../../Helper Components/CustomCookies'
const url = import.meta.env.VITE_BACKEND_URL
const port = import.meta.env.VITE_BACKEND_PORT

export default function Frame({ view }) {
    const [innerHeight, setInnerHeight] = useState("")
    const response = useQuery(['which-frame'], async () => {
        const data = await axios.get(`${api.utils.which_frame}/?woosee=${getCookies()[0]}`)
        return data
    }, { staleTime: Infinity })

    useEffect(() => {
        setInnerHeight(window.innerHeight)
    }, [window.innerHeight])


    return (
        <>
            {!response.isLoading ?
                response?.data?.data?.response ?
                    <div className='overflow-y-auto grid gap-5 rounded-xl' style={{ height: view ? (innerHeight - 700) : (innerHeight - 100) }} >
                        <YammerFrame />
                    </div> :
                    <div>
                        <FlashFrame />
                    </div>
                : <div className='w-[100%] h-[100%] bg-[#fff] rounded-lg p-3 grid gap-3'>
                    <div>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </div>
                    <Skeleton variant="rounded" style={{ height: '20rem' }} />
                    <br />
                    <Skeleton variant="rounded" style={{ height: '20rem' }} />
                </div>}
        </>

    )

}

function FlashFrame() {
    return (
        <div className='grid bg-[#fff] rounded-lg p-3 h-[100%]'>
            <span className='text-[1.2rem] font-extrabold text-[#555259]'>About Us</span>
            <div className='mt-[-1rem]'>
                <Divider />
            </div>
            <div className='grid gap-3'>
                <span>Flash Orthodontics is a subsidiary of ADOR Group, and a part of 3D Future Technologies Pvt. Ltd.,
                    a start-up that aims to meet the fundamental 3D printing needs of the healthcare industry. Our driving force,
                    ADOR Group with a 109-year legacy in India, dominates the core industry sectors where it participates.
                    Flash Orthodontics is built on their objective to nurture businesses for select industrial segments,
                    with the aim of attaining market leadership</span>
                <img loading='lazy' onClick={() => window.location.href = flash_link} className='rounded-xl hover:cursor-pointer' src={IMAGES.flash_logo_dash_1} />
                <img loading='lazy' onClick={() => window.location.href = flash_link} className='rounded-xl hover:cursor-pointer' src={IMAGES.flash_logo_dash_2} />
            </div>
        </div>
    )
}


function YammerFrame() {
    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.yammer.get_data) }, { staleTime: "300000" })
    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <div >
            <div className='p-3 bg-[#fff] rounded-t-xl'>
                <span className='text-[1.2rem] font-extrabold text-[#555259] '>Yammer Posts</span>
                <div >
                    <Divider />
                </div>
            </div>
            <div className='p-4 bg-[#fff] border-solid border-[#ffffff] rounded-b-xl border h-[100%] '>
                {!isLoading && <ICarousels data={data} />}
            </div>
        </div>
    )
}


function ICarousels({ data }) {
    return (
        data?.data?.data?.map((x, i) => {
            return (
                <div key={i} className='grid mb-6 '>
                    <div className='shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] p-2 grid rounded-xl '>
                        <>
                            <div className='flex gap-2 p-1'>
                                <Avatar sx={{ width: 45, height: 45, bgcolor: "#2b58a5" }}>{(x.sender_id).split(" ")[0][0]}{String((x.sender_id).split(" ")[1])[0].toUpperCase()}</Avatar>
                                <div className='grid grid-cols-1'>
                                    <span className='text-lg font-bold'>{x.sender_id}</span>
                                    <span className='text-xs'>{moment(x.created_at).format("DD MMMM YYYY")}</span>
                                </div>
                            </div>
                            <div className='text-center my-3 mx-1' style={{ wordBreak: "break-word" }}>
                                <p className='text-lg text-left '>{x.message}</p>
                            </div>

                            <div className='flex justify-center '>
                                {x?.image[0]?.type === "image" && <img loading='lazy' style={{ minWidth: "400px" }} src={`${url}:${port}/media/yammer/${x.image[0].name}`} />}
                                {x?.image[0]?.type === "file" && <video loop style={{ minWidth: "400px" }} controls>
                                    <source src={`${url}:${port}/media/yammer/${x.image[0].name}`} type="video/mp4" />
                                </video>}
                            </div>
                            <div>
                                <div className='px-3 flex justify-between'  >
                                    <span >
                                        <div className='flex'>
                                            <img className='rotate-180 -scale-x-100' width={30} src={IMAGES.like_gif} alt="" />
                                            <span color='#3d3d3d' className=' text-lg'>{x.liked_by}</span>
                                        </div>
                                    </span>
                                    <div spacing={5}>
                                        <span className='text-[0.9rem]'>
                                            <a href={x.web_url}>Click here for more...</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div >
            )
        })
    )
}




