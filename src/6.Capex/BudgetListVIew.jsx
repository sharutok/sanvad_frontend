import React from 'react'
import Table from '../Helper Components/Table'
import { Link } from 'react-router-dom';
import { api } from '../Helper Components/Api';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteOutline } from 'react-icons/md';
import TipTool from '../Helper Components/TipTool';
import { IconButton } from 'rsuite';
import CPagination from '../Helper Components/Pagination';
import LoadingSpinner from '../Helper Components/LoadingSpinner';
export default function BudgetListVIew() {
    const thead = ["Budget No", "Purpose code", "Purpose", "Line No", "Department", "Capex Group", "Class", "Category", "No. Of Capex ", "Budget (Remaining v/s Consumed)", "Final Budget"]

    function handleNav(c) {
        window.location.href = `/capex/${c.id}`
    }

    const { isLoading, error, data } = useQuery(['sales-data'], async () => {
        return await axios.get(api.capex.get_data)
    })

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <div>
            <Table thead={thead} tbody={
                !isLoading && data?.data?.map((c, i) => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td onClick={() => handleNav(c)}>{c.budget_no}</td>
                            <td onClick={() => handleNav(c)}>{c.purpose_code}</td>
                            <td onClick={() => handleNav(c)}>{c.purpose_description}</td>
                            <td onClick={() => handleNav(c)}>{c.line_no}</td>
                            <td onClick={() => handleNav(c)}>{c.dept}</td>
                            <td onClick={() => handleNav(c)}>{c.capex_group}</td>
                            <td onClick={() => handleNav(c)}>{c.capex_class}</td>
                            <td onClick={() => handleNav(c)}>{c.category}</td>
                            <td onClick={() => handleNav(c)}>{Math.floor(Math.random() * 5)}</td>
                            <td onClick={() => handleNav(c)} >{<CProgressBar />}</td>
                            <td onClick={() => handleNav(c)}>{c.final_budget}</td>
                            <td className='delete'>
                                <TipTool body={< >
                                    <IconButton>
                                        <MdDeleteOutline color='#f08080' size={22} />
                                    </IconButton>
                                </>} title={"Delete"} />
                            </td>
                        </tr>
                    )
                })
            } />
            <CPagination />
        </div>
    )
}


function CProgressBar() {
    const val = 80
    return (<div className=' '>
        {/* <div className='w-[100%]'>
            <div className=' bg-[#60d394] p-1 rounded-tl-[10px] rounded-bl-[10px]'></div>
        </div> */}
        <div className='flex justify-between'>
            <p className='text-right text-xs mt-[1rem]'>{`${val}%`}</p>
            <p className='text-left text-xs mt-[1rem]'>{`${100 - val}%`}</p>
        </div>
        <div className='w-[100%] relative'>
            <div className='bg-[#ee6055] p-1 rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[10px]'></div>
            <div style={{ width: `${val}%` }} className='bg-[#60d394] p-1 rounded-tl-[10px] rounded-bl-[10px] absolute z-[1] left-0 top-0'></div>
        </div>
    </div>)
}