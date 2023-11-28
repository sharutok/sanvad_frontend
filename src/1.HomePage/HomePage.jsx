import React, { useEffect, useState } from 'react'
import YammerFrame from './Components/e.YammerFrame'
import ShortCutBtn from './Components/f.ShortCutBtn'
import '../../Style/comman.css'
import NewEmployee from './Components/k.NewEmployee'
import SideBar from './Components/c.Sidebar'
import QuickLinks from './Components/i.QuickLinks'
import Announsments from './Components/l.Announsments'
import WeatherAndTemp from './Components/m.WeatherAndTemp'

export default function HomePage() {
    return (
        <div className='bg-[#f0f0f0]  p-0 m-0 '>
            <div className='grid mr-5 '>
                <div className='flex gap-5 grid-cols-[repeat(2,1fr)] ' >
                    <div className='bg-[#fff]'>
                        <SideBar />
                    </div>
                    <div className=' grid gap-5 grid-cols-[1.5fr_2fr] p-1 mt-20 '>
                        <div className='h-[85vh] overflow-y-auto grid gap-5 rounded-xl'>
                            <YammerFrame />
                        </div>
                        <div className='grid gap-5 grid-cols-[repeat(1,1fr)] p-1  h-fit'>
                            <ShortCutBtn />
                            <div className='grid gap-5 grid-cols-[repeat(2,1fr)]  p-1 h-fit '>
                                <div className='grid grid-cols-[repeat(1,1fr)] '>
                                    <QuickLinks />
                                </div>
                                <div className='grid gap-5  '>
                                    <WeatherAndTemp />
                                    <NewEmployee />
                                    <Announsments />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
