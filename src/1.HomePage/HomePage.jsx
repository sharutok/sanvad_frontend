import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import React, { useEffect } from 'react';
import '../../Style/comman.css';
import { CapexTab, searchAtom, TicketTab } from '../Helper Components/CustomCookies';
import SideBar from './Components/c.Sidebar';
import Frame from './Components/e.YammerFrame';
import ShortCutBtn from './Components/f.ShortCutBtn';
import QuickLinks from './Components/i.QuickLinks';
import NewEmployee from './Components/k.NewEmployee';
import Announsments from './Components/l.Announsments';
import WeatherAndTemp from './Components/m.WeatherAndTemp';

export default function HomePage() {
    const [searchVariable, setSearchVariable] = useAtom(searchAtom)
    const [capexTabIndex, setCapexTabIndex] = useAtom(CapexTab)
    const [TicketTabIndex, setTicketTabIndex] = useAtom(TicketTab)

    useEffect(() => {
        setSearchVariable(RESET)
        setCapexTabIndex(RESET)
        setTicketTabIndex(RESET)
    })
    return (
        <div className='bg-[#f0f0f0] p-0 m-0 '>
            <div className='sm:hidden'>
                <MobileView />
            </div>
            <div className='sm:block md:block lg:block xl:block 2xl:block hidden'>
                <DesktopView />
            </div>
        </div>
    )
}


const DesktopView = () => {
    return (
        <div className='flex gap-5 grid-cols-[repeat(2,1fr)] mr-5' >
            <div className='bg-[#fff]'>
                <SideBar />
            </div>
            <div className=' grid gap-5 grid-cols-[1.5fr_2fr] mt-20 '>
                <Frame />
                <div className='grid gap-5 grid-cols-[repeat(1,1fr)] p-1  h-fit'>
                    <ShortCutBtn view={false} />
                    <div className='grid gap-5 grid-cols-[repeat(2,1fr)]  p-1 h-fit '>
                        <div className='grid grid-cols-[repeat(1,1fr)] '>
                            <QuickLinks />
                        </div>
                        <div className='grid gap-5'>
                            <WeatherAndTemp />
                            <NewEmployee />
                            <Announsments />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MobileView = () => {

    return (
        <div className='flex gap-3 grid-cols-[repeat(2,1fr)] mr-3' >
            <div className='bg-[#fff]'>
                <SideBar />
            </div>
            <div className=' grid gap-5 grid-col-1 mt-20 '>
                <Frame view={true} />
                <div className='grid gap-5 grid-cols-1 h-fit'>
                    <ShortCutBtn view={true} />
                    <div className='grid gap-5 grid-cols-[repeat(1,1fr)] h-fit '>
                        {/* <QuickLinks /> */}
                        <NewEmployee />
                        <Announsments />
                        {/* <div className='grid gap-5'>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}