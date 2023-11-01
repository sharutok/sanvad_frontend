import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { api } from '../../Helper Components/Api'
import IMAGES from '../../assets/Image/Image'

export default function WetherAndTemp() {
    const [obj, setObj] = useState({})
    const { isLoading, error, data } = useQuery(['weather-data'], async () => { return await axios.get(api.utils.weather_temp) }, { staleTime: "300000" })

    return (
        <div className='w-fit'>
            <img className='' src={IMAGES.rain} />
            <div className='rounded-xl text-[white] flex justify-between px-2 py-3  mt-[-7.5rem] '>
                <div className='grid grid-cols-1'>
                    <div className='grid grid-cols-1 '>
                        <span className='text-[1.6rem] mb-[-0.5rem] mt-[1rem]'>{moment().format("HH:MM")}</span>
                        <span className=''>
                            <span className='text-[1rem] font-bold'>{String(moment().format('dddd')).toUpperCase()}</span>
                            <span className=''>,</span>
                            <span className=''>{" "}</span>
                            <span className='text-[0.8rem]'>{String(moment().format('MMMM')).toUpperCase()}</span>
                            <span className=''>{" "}</span>
                            <span className='text-[1.0rem] font-bold'>{moment().format('Do')}</span>
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
