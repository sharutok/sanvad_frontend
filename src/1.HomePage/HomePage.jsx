import React from 'react'
import Header from './Components/b.Header'
import Sidebar from './Components/c.Sidebar'
import YammerFrame from './Components/e.YammerFrame'
import ShortCutBtn from './Components/f.ShortCutBtn'
import Tasks from './Components/g.Tasks'
import Policies from './Components/h.Policies'
import '../../Style/comman.css'
import BirthdayCard from './Components/i.BirthdayCard'
export default function HomePage() {
    return (
        <div>
            <div  >
                <div className=''>
                    <Header />
                </div>
                <div className='flex' >
                    <div className=''>
                        <Sidebar />
                    </div>

                    <div className='grid grid-cols-[repeat(3,2fr)] '>
                        <div className='p-5 grid grid-cols-[repeat(1,3fr)] '>
                            <ShortCutBtn />
                            <Tasks />
                            <Policies />
                        </div>

                        <div className='border grid grid-rows-[repeat(1,1fr)]'>
                            <div className='p-5'>
                                <YammerFrame />
                            </div >
                            <div className='border'>
                                <BirthdayCard />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
