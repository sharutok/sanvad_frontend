import { Tooltip } from '@mui/material'
import { useQuery, useQueryClient, } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect } from 'react'
import { HiMiniArrowSmallDown, HiMiniArrowSmallRight, HiMiniArrowSmallUp } from 'react-icons/hi2'
import { MdAttachFile } from "react-icons/md"
import { AppContext } from '../../App'
import { api } from '../../Helper Components/Api'
import BarSnack from '../../Helper Components/BarSnack'
import { getCookies } from '../../Helper Components/CustomCookies'
import LoadingSpinner from '../../Helper Components/LoadingSpinner'
import CPagination from '../../Helper Components/Pagination'
import Table from '../../Helper Components/Table'
import { abbriviation, exportToCSV } from '../../Static/StaticValues'

export default function TicketSystemListView({ _search }) {
    const { setSnackBarPopUp, count, setCount, page, setPage } = useContext(AppContext)
    const emp_no = getCookies()[0]
    const thead = ["TIcket ID", "Ticket Title", "Ticket Type", "Requirement Type", "Requester", "Severity", "Ticket Date", "Status", "Current At"]
    const queryClient = useQueryClient()

    const ticket_listing = useQuery(['ticket-listing', page, _search], async () => {
        const data = await axios.get(`${api.ticket_system.get_data}/?page=${page}&search=${_search}&woosee=${emp_no}`)
        return data
    })

    useEffect(() => {
        setCount(Math.ceil(ticket_listing?.data?.data.count / 10))
    })

    function handleNav(g) {
        window.open(`/ticket/sys/${g.id}`, '_blank')
    }

    async function exportData() {
        try {
            const data = await axios.post(api.utils.download_excel, { "data_module": "ticket" })
            exportToCSV(data?.data?.data, `Ticket System ${moment().format("DD_MM_YYYY")}`)
        } catch (error) {
            console.log("error in exporting");
        }
    }

    return (
        <div className='mt-2'>
            <BarSnack />
            <div>
                <div className='flex justify-between'>
                </div>
                {!ticket_listing.isLoading ? <div className=' mx-10'>
                    <Table thead={thead}
                        tbody={
                            ticket_listing?.data?.data?.results.map((g, i) => {
                                return (
                                    <Tooltip key={i} title={"Click to view more"} arrow disableInteractive followCursor={false} placement='top'>
                                        <tr className='table-wrapper' >
                                            <td onClick={() => handleNav(g)}><p className='flex justify-center gap-2'>{g.total_file_uploads > 0 && <MdAttachFile size={20} color='#bd0000' className='rotate-45' />}{g.ticket_no}</p></td>
                                            <td onClick={() => handleNav(g)}>{abbriviation(g.tkt_title, 100)}</td>
                                            <td onClick={() => handleNav(g)}>{g.tkt_type}</td>
                                            <td onClick={() => handleNav(g)}>{g.req_type}</td>
                                            <td onClick={() => handleNav(g)}>{g.requester_emp_name}</td>
                                            <td onClick={() => handleNav(g)} className='align-middle'>{severityArrow(g.severity)}</td>
                                            <td onClick={() => handleNav(g)} >{g.created_at}</td>
                                            <td onClick={() => handleNav(g)} className='align-middle'>{status(g.tkt_status)}</td>
                                            <td onClick={() => handleNav(g)}>{g.tkt_current_at} {g.role && <b>({g.role})</b>}</td>
                                        </tr>
                                    </Tooltip>
                                )
                            })
                        }
                    />
                </div> : <LoadingSpinner />}
                < CPagination />
            </div>
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

function severityArrow(val) {
    if (val === 0) {
        return (<div className='flex justify-center p-1 rounded-xl bg-green-100'><p className='mt-[0.1rem]'>Low</p><HiMiniArrowSmallDown className='text-green-500' size="25" /></div>)
    }
    if (val === 1) {
        return (<div className='flex justify-center p-1 rounded-xl bg-yellow-100'><p className='mt-[0.1rem]'>Medium</p><HiMiniArrowSmallRight className='text-yellow-500' size="25" /></div>)
    }
    if (val === 2) {
        return (<div className='flex justify-center p-1 rounded-xl bg-red-100'><p className='mt-[0.1rem]'>High</p><HiMiniArrowSmallUp className='text-red-500' size="25" /></div>)
    }
    else {
        return "-"
    }
}
