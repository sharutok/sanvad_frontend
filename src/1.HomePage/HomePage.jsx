import React from 'react'
import Header from './Components/b.Header'
import YammerFrame from './Components/e.YammerFrame'
import ShortCutBtn from './Components/f.ShortCutBtn'
import '../../Style/comman.css'
import NewEmployee from './Components/k.NewEmployee'
import SideBar from './Components/c.Sidebar'
import QuickLinks from './Components/i.QuickLinks'
import Announsments from './Components/l.Announsments'
import WetherAndTemp from './Components/m.WetherAndTemp'
import Feedback from './Components/n.Feedback'

export default function HomePage() {
    return (
        <div className='bg-[#f0f0f0] h-screen p-0 m-0 '>
            <div className='grid mr-5 mt-[-3rem]'>
                <div className='flex gap-5 grid-cols-[repeat(2,1fr)] ' >
                    <div className='bg-[#fff]'>
                        <SideBar />
                    </div>
                    <div className='grid gap-5 grid-cols-[45rem_2fr] p-1 mt-5 '>
                        <div className='grid gap-5 grid-cols-[repeat(1,1fr)] p-1 grid-rows-[repeat(1,1fr)]  '>
                            <YammerFrame />
                        </div>
                        <div className='grid gap-5 grid-cols-[repeat(1,1fr)] p-1  h-fit'>
                            <ShortCutBtn />
                            <div className='grid gap-5 grid-cols-[repeat(2,1fr)]  p-1 h-fit '>
                                <div className='grid grid-cols-[repeat(1,1fr)] '>
                                    <QuickLinks />
                                </div>
                                <div className='grid gap-5  '>
                                    <WetherAndTemp />
                                    <NewEmployee />
                                    <Announsments />
                                    {/* <Feedback /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
