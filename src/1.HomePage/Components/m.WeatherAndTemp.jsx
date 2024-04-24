import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { api } from '../../Helper Components/Api'
import IMAGES from '../../assets/Image/Image'

export default function WeatherAndTemp() {
    const { isLoading, error, data } = useQuery(['weather-data'], async () => { return await axios.get(api.utils.weather_temp) }, { staleTime: "300000" })

    function imgGen() {
        function isTimeBetween(start, end, targetTime) {
            const startTime = moment(start, 'HH:mm');
            const endTime = moment(end, 'HH:mm');
            const targetTimeMoment = moment(targetTime, 'HH:mm');

            return targetTimeMoment.isBetween(startTime, endTime, null, '[]');
        }

        const targetTime = moment().format("HH:mm");
        if (isTimeBetween("06:00", "11:59", targetTime)) { return IMAGES.morning }
        if (isTimeBetween("12:00", "15:59", targetTime)) { return IMAGES.afternoon }
        if (isTimeBetween("16:00", "18:59", targetTime)) { return IMAGES.evening }
        if (isTimeBetween("19:00", "23:59", targetTime) || isTimeBetween("00:00", "05:59", targetTime)) { return IMAGES.night }
    }

    useEffect(() => {
        imgGen()
    }, [])

    const image = imgGen()

    return (
        <div className='h-[100%] w-[100%]'>
            <img loading='lazy' className='h-[100%] w-[100%]' src={image} />
            <div className='rounded-xl flex justify-between px-2 py-3  mt-[-7.5rem]' style={{ color: "white" }}>
                <div className='grid grid-cols-1'>
                    <div className='grid grid-cols-1 '>
                        <span className='text-[1.6rem] mb-[-0.5rem] mt-[1rem]'>{moment().format("HH:MM")}</span>
                        <span className=''>
                            <span className='text-[1rem] font-bold'>{String(moment().format('dddd')).toUpperCase()}</span>
                            <span className=''>,</span>
                            <span className=''>{" "}</span>
                            <span className='text-[1rem] font-bold'>{moment().format('D')}</span>
                            <span className=''>{" "}</span>
                            <span className='text-[0.8rem]'>{String(moment().format('MMMM')).toUpperCase()}</span>
                        </span>
                    </div>
                    <div>
                        <span className='text-[0.8rem] '>{String(data?.data?.data?.place).toUpperCase()}</span>
                    </div>
                </div>
                <div className='grid grid-cols-1 mt-[1rem]'>
                    <span>{String(data?.data?.data?.weather).toUpperCase()}</span>
                    <div>
                        <span className='text-[2.5rem] font-bold'>{data?.data?.data?.temp}°</span><span className='text-[2rem]'>c</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
