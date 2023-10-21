import React from 'react'
import Header from './Components/b.Header'
import YammerFrame from './Components/e.YammerFrame'
import ShortCutBtn from './Components/f.ShortCutBtn'
import '../../Style/comman.css'
import NewEmployee from './Components/k.NewEmployee'
import SideBar from './Components/c.Sidebar'
export default function HomePage() {
    return (
        <div className='bg-[#E1EFF9] border h-100'>
            <div className='grid mr-5'>
                <div className='flex gap-5 grid-cols-[repeat(2,1fr)] ' >
                    <div className='bg-[#fff]'>
                        <SideBar />
                    </div>
                    <div className='grid gap-5 grid-cols-[repeat(2,1fr)] p-3 '>
                        <div className='grid gap-10 grid-cols-[repeat(1,1fr)] p-3'>
                            <ShortCutBtn />
                            <div className="">
                                {/* <Calender /> */}
                            </div>
                        </div>
                        <div className='grid gap-10 grid-cols-[repeat(1,1fr)] p-3'>
                            <YammerFrame />
                            <NewEmployee />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
