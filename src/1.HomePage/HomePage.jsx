import React from 'react'
import Header from './Components/b.Header'
import SideBar from './Components/c.SideBar'
import YammerFrame from './Components/e.YammerFrame'
import ShortCutBtn from './Components/f.ShortCutBtn'
import Tasks from './Components/g.Tasks'
import Policies from './Components/h.Policies'
import '../../Style/comman.css'
import Calender from './Components/i.Calender'
import Date from './Components/j.Date'
import NewEmployee from './Components/k.NewEmployee'
import Divider from '@mui/material/Divider';
export default function HomePage() {
    return (
        <div>
            <div className='grid'>
                {/* <div>
                    <Header />
                </div> */}
                <div className='flex gap-2 grid-cols-[repeat(2,1fr)]' >
                    <div className=''>
                        <SideBar />
                    </div>
                    <div className='grid gap-2 p-5 grid-cols-[repeat(2,1fr)] '>
                        <div >
                            <ShortCutBtn />
                            <Calender />
                        </div>
                        <div className='grid gap-2 p-5 grid-cols-[repeat(1,1fr)]'>
                            {/* <Policies /> */}
                            <YammerFrame />
                            <NewEmployee />
                            {/* <Tasks /> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
