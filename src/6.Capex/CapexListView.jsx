import React, { useContext, useEffect } from 'react'
import TipTool from '../Helper Components/TipTool'
import { MdDeleteOutline, MdOutlineOpenInNew } from 'react-icons/md'
import Table from '../Helper Components/Table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { api } from '../Helper Components/Api'
import { AppContext } from '../App'
import CPagination from '../Helper Components/Pagination'
import { Link } from 'react-router-dom'

export default function CapexListView({ _search, _setSearch }) {
    const thead = ["Budget No", "Line No", "Purpose code", "Requisition Date", "Payback Period", "Return On Investment", "Budget Type", "Current At", "Capex Status"]
    const { count, setCount, page, setPage } = useContext(AppContext)

    const { isLoading, error, data } = useQuery(['capex-data', page, _search], async () => {
        return await axios.get(`${api.capex.get_capex_data}/?page=${page}&search=${_search}`)
    }, { staleTime: 3000 })

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
            <Table thead={thead} tbody={
                data?.data?.results?.map(i => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td>{i.budget_no}</td>
                            <td>{i.line_no}</td>
                            <td>{i.purpose_code}</td>
                            <td>{i.requisition_date}</td>
                            <td>{i.payback_period}</td>
                            <td>{i.return_on_investment}</td>
                            <td>{i.budget_type}</td>
                            <td>{i.capex_current_at}</td>
                            <td>{status(i.capex_status)}</td>
                            <td className='delete w-fit'>
                                <Link to={`/capex/appr/${i.budget_id}/${i.capex_id}`}>
                                    <TipTool title={"View Capex"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200 w-fit'><MdOutlineOpenInNew color='#f08080' size={22} /></div>} />
                                </Link>
                            </td>
                            <td className='delete'>
                                <TipTool body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200 w-fit'>
                                    <MdDeleteOutline color='#f08080' size={22} />
                                </div>} title={"Delete"} />
                            </td>
                        </tr>
                    )
                })
            } />
            < CPagination />
        </div>
    )
}

function status(val) {
    if (val === "INPROGRESS") {
        return (<div className=' font-extrabold  text-xs  px-2 py-1 rounded-xl text-yellow-500'><p className='mt-[0.1rem]'>{val}</p></div>)
    }
    if (val === "APPROVED") {
        return (<div className=' font-extrabold  text-xs  px-2 py-1 rounded-xl text-green-500'><p className='mt-[0.1rem]'>{val}</p></div>)
    }
    if (val === "CLOSED") {
        return (<div className=' font-extrabold  text-xs  px-2 py-1 rounded-xl text-blue-500'><p className='mt-[0.1rem]'>{val}</p></div>)
    }
    if (val === "REJECTED") {
        return (<div className=' font-extrabold  text-xs  px-2 py-1 rounded-xl text-red-500'><p className='mt-[0.1rem]'>{val}</p></div>)
    }
    else {
        return "-"
    }
}