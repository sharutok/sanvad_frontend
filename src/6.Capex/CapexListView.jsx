import React, { useContext, useEffect } from 'react'
import TipTool from '../Helper Components/TipTool'
import { MdDeleteOutline, MdOutlineOpenInNew } from 'react-icons/md'
import Table from '../Helper Components/Table'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { api } from '../Helper Components/Api'
import { AppContext } from '../App'
import CPagination from '../Helper Components/Pagination'
import { Link } from 'react-router-dom'
import { getCookies } from '../Helper Components/CustomCookies'
import BarSnack from '../Helper Components/BarSnack'
import { abbriviation } from '../Static/StaticValues'

export default function CapexListView({ _search, view }) {
    const thead = [
        'Capex No',
        "Purpose code",
        "Nature of requirement",
        "Total Cost (₹ in Lakhs)",
        "Budget Type",
        "Raised By",
        'Department',
        "Current At",
        "Capex Raised Date",
        "Capex Status"]
    const { count, setCount, page, setSnackBarPopUp } = useContext(AppContext)
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery(['capex-data', page, _search], async () => {
        return await axios.get(`${api.capex.get_capex_data}/?page=${page}&search=${_search}&woosee=${getCookies()[0]}&view=${view}`)
    })

    useEffect(() => {
        setCount(Math.ceil(data?.data?.count / 10))
    })

    async function handleDelete(id) {
        const response = await axios.delete(api.capex.capex_by_id + "/" + id)
        response.data.status_code === 200 && setSnackBarPopUp({ state: true, message: "Deleted Entry", severity: "s" })
        queryClient.invalidateQueries(['capex-data'])
    }

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <div className='mt-5'>
            <BarSnack />
            <Table thead={thead} tbody={
                data?.data?.results?.map(i => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td>{abbriviation(i.capex_no, 10)}</td>
                            <td>{i.purpose_code}</td>
                            <td>{abbriviation(i.nature_of_requirement, 50)}</td>
                            <td>{i.total_cost}</td>
                            <td>{i.budget_type}</td>
                            <td>{i.capex_raised_by}</td>
                            <td>{i.department}</td>
                            <td>{i.capex_current_at}</td>
                            <td>{i.created_at}</td>
                            <td>{status(i.capex_status)}</td>
                            <td className='delete w-fit'>
                                <Link to={`/capex/appr/${i.budget_id}/${i.capex_id}/?raised_by=${i.capex_raised_by}`} >
                                    <TipTool title={"View Capex"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200 w-fit'><MdOutlineOpenInNew color='#f08080' size={22} /></div>} />
                                </Link>
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
    if (val === "ASK FOR JUSTIFICATION") {
        return (<div className=' font-extrabold  text-xs  px-2 py-1 rounded-xl text-black-500'><p className='mt-[0.1rem]'>{val} ?</p></div>)
    }
    else {
        return "-"
    }
}