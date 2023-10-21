import React, { useContext, useEffect } from 'react'
import Table from '../Helper Components/Table'
import { Link } from 'react-router-dom';
import { api } from '../Helper Components/Api';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteOutline, MdOutlineOpenInNew } from 'react-icons/md';
import TipTool from '../Helper Components/TipTool';
import CPagination from '../Helper Components/Pagination';
import LoadingSpinner from '../Helper Components/LoadingSpinner';
import { AppContext } from '../App';

export default function BudgetListVIew({ _search, _setSearch }) {
    const thead = ["Budget No", "Purpose code", "Line No", "Purpose", "Department", "Capex Group", "Class", "Category", "No. Of Capex ", "Budget (Remaining v/s Consumed)", "Final Budget"]
    const { count, setCount, page, setPage } = useContext(AppContext)
    console.log(_search);
    const { isLoading, error, data } = useQuery(['budget-data', page, _search], async () => {
        return await axios.get(`${api.capex.get_budget_data}/?page=${page}&search=${_search}`)
    })

    useEffect(() => {
        setCount(Math.ceil(data?.data?.count / 10))
    })

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <div>
            <div className='mt-10'>
                <Table thead={thead} tbody={
                    data?.data?.results.map((c, i) => {
                        return (
                            <tr className='p-10 mt-1 table-wrapper' key={i}>
                                <td >{c.budget_no}</td>
                                <td >{c.purpose_code}</td>
                                <td >{c.line_no}</td>
                                <td >{c.purpose_description}</td>
                                <td >{c.dept}</td>
                                <td >{c.capex_group}</td>
                                <td >{c.capex_class}</td>
                                <td >{c.category}</td>
                                <td >{c.no_of_capex}</td>
                                <td  >{<CProgressBar no_of_capex={c.no_of_capex} consumed={c.consumed} final_budget={c.final_budget} budget_remaining={c.budget_remaining} />}</td>
                                <td>{c.final_budget}</td>
                                <td className='delete w-fit'>
                                    <Link to={`/capex/${c.id}`}>
                                        <TipTool title={"Create Capex"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200 w-fit'><MdOutlineOpenInNew color='#f08080' size={22} /></div>} />
                                    </Link>
                                </td>
                                <td className='delete'>
                                    <TipTool title={"Delete"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200 w-fit'><MdDeleteOutline color='#f08080' size={22} /></div>} />
                                </td>
                            </tr>
                        )
                    })
                } />
                < CPagination />
            </div>
        </div>
    )
}


function CProgressBar({ consumed, final_budget, budget_remaining }) {
    const val = 80
    const consumed_in_percentage = Math.ceil((100 * consumed) / final_budget)
    const remaining_in_percentage = 100 - consumed_in_percentage
    return (<div className=' '>
        <div className='flex justify-between'>
            <p className='text-right text-xs mt-[1rem]'>{`${consumed_in_percentage}%`}</p>
            <p className='text-left text-xs mt-[1rem]'>{`${remaining_in_percentage}%`}</p>
        </div>
        <div className='w-[100%] relative'>
            <div className='bg-[#ee6055] p-1 rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[10px]'></div>
            <div style={{ width: `${consumed_in_percentage}%` }} className='bg-[#60d394] p-1 rounded-tl-[10px] rounded-bl-[10px] absolute z-[1] left-0 top-0'></div>
        </div>
        <div className='flex justify-between'>
            <p className='text-right text-xs'>{`₹${consumed}`}</p>
            <p className='text-left text-xs mt-[-0.1rem]'>{`₹${budget_remaining}`}</p>
        </div>
    </div>)
}