import React, { useContext, useEffect, useState } from 'react'
import Table from '../../Helper Components/Table'
import { HiMiniArrowSmallDown, HiMiniArrowSmallRight, HiMiniArrowSmallUp } from 'react-icons/hi2'
import CPagination from '../../Helper Components/Pagination'
import { MdAttachFile } from "react-icons/md";
import { Fab, IconButton, TextField, Tooltip } from '@mui/material'
import { useQuery, useQueryClient, } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../../Helper Components/Api'
import { AppContext } from '../../App'
import BarSnack from '../../Helper Components/BarSnack'
import LoadingSpinner from '../../Helper Components/LoadingSpinner'
import { getCookies } from '../../Helper Components/CustomCookies'
import moment from 'moment'
import { abbriviation, exportToCSV, isPermissionToView } from '../../Static/StaticValues'


export default function AllTicketsView({ _search }) {
    const { setSnackBarPopUp, count, setCount, page, setPage } = useContext(AppContext)
    // const [_search, _setSearch] = useState("")
    const emp_no = getCookies()[0]
    const thead = ["TIcket ID", "Ticket Title", "Ticket Type", "Requirement Type", "Requester", "Severity", "Ticket Date", "Status", "Current At", "Closed by and Date"]
    const queryClient = useQueryClient()

    const ticket_listing = useQuery(['ticket-listing', page, _search], async () => {
        const data = await axios.get(`${api.ticket_system.view_all_data}/?page=${page}&search=${_search}&woosee=${emp_no}&viewonly=${true}`)
        return data
    })


    useEffect(() => {
        setCount(Math.ceil(ticket_listing?.data?.data.count / 10))
    })

    function handleNav(g) {
        window.location.href = `/ticket/sys/${g.id}/?qreuecs=${"p13kjew"}`
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
                                            <td onClick={() => handleNav(g)}>
                                                {g.closed_by && <p>
                                                    <>{g.closed_by}</> on <>{moment(g.closed_date).format("DD-MM-YYYY")}</>
                                                </p>}

                                            </td>
                                            {/* {String(getCookies()[0]) === String(g.requester_emp_no) && <td className='delete'>
                                                <TipTool body={< >
                                                    <IconButton onClick={() => handleDelete(g.id)}>
                                                        <MdDeleteOutline color='#f08080' size={22} />
                                                    </IconButton>
                                                </>} title={"Delete"} />
                                            </td>} */}
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

const ButtonComponent = ({ onChange, icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            onChange={onChange}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
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
