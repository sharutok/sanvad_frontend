import React from 'react'
import Header from './Components/b.Header'
import Sidebar from './Components/c.Sidebar'
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
            <div  >
                <div className=''>
                    <Header />
                </div>
                <div className='flex gap-10' >
                    <div className=''>
                        <Sidebar />
                    </div>
                    <div className='grid gap-5 p-5 grid-cols-[repeat(2,3fr)] '>
                        <div className=''>
                            <ShortCutBtn />
                            <Calender />
                        </div>
                        <div className='grid grid-cols-[repeat(1,2fr)]'>
                            <div className=''>
                                {/* <Date />
                                <Divider orientation="vertical" flexItem /> */}
                                <Policies />
                            </div>
                            {/* <div className='flex justify-center gap-5 h-fit'>
                                <Date />
                                <Divider orientation="vertical" flexItem />
                                <Policies />
                            </div> */}
                            <div>
                                <YammerFrame />
                            </div>
                            <div className='grid grid-cols-[repeat(2,1fr)] gap-10'>
                                <NewEmployee />
                                <Tasks />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
