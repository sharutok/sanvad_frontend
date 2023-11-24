import React, { useContext, useEffect, useState } from 'react'
import Table from '../Helper Components/Table'
import { HiMiniArrowSmallDown, HiMiniArrowSmallRight, HiMiniArrowSmallUp } from 'react-icons/hi2'
import CPagination from '../Helper Components/Pagination'
import BackArrow from '../Helper Components/SideComponent'
import { Fab, IconButton, TextField, Tooltip } from '@mui/material'
import TipTool from '../Helper Components/TipTool'
import { MdClear, MdDeleteOutline } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import { IoIosPaper } from 'react-icons/io'
import { useQuery, useQueryClient, } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../Helper Components/Api'
import { AppContext } from '../App'
import BarSnack from '../Helper Components/BarSnack'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { getCookies } from '../Helper Components/CustomCookies'
import moment from 'moment'
import { exportToCSV, isPermissionToView } from '../Static/StaticValues'

export default function TicketSystemListView() {
    const { setSnackBarPopUp, count, setCount, page, setPage } = useContext(AppContext)
    const [_search, _setSearch] = useState("")
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


    async function handleDelete(id) {
        try {
            const response = await axios.delete(api.ticket_system.by_id + id)
            response.data.status_code === 200 && setSnackBarPopUp({ state: true, message: "Deleted Entry", severity: "s" })
            queryClient.invalidateQueries(['ticket-listing'])
        }
        catch (error) {
            console.log("error", error);
        }
    }

    function handleNav(g) {
        window.location.href = `/ticket/sys/${g.id}`
    }

    async function exportData() {
        try {
            const data = await axios.post(api.utils.download_excel, { "data_module": "ticket" })
            console.log(data?.data?.data);
            exportToCSV(data?.data?.data, `Ticket System ${moment().format("DD_MM_YYYY")}`)
        } catch (error) {
            console.log("error in exporting");
        }
    }

    return (
        <div>
            <BarSnack />
            <div>
                <div className='flex justify-between mt-20'>
                    <BackArrow location={"/home"} title={"Ticketing System - Listing"} />
                    <div className='flex gap-4  mr-10'>
                        <TextField onChange={(e) => _setSearch(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                        <ButtonComponent onClick={() => { window.location.href = "/ticket/sys/new" }} icon={<IoIosPaper color='white' size={"23"} />} btnName={"New Ticket"} />
                        {isPermissionToView("ticketsystem:export") && <ButtonComponent onClick={() => exportData()} icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />}
                    </div>
                </div>
                {!ticket_listing.isLoading ? <div className='mt-20 mx-10'>
                    <Table thead={thead}
                        tbody={
                            ticket_listing?.data?.data?.results.map((g, i) => {
                                console.log(String(getCookies()[0]), String(g.requester_emp_no));
                                return (
                                    <Tooltip key={i} title={"Click to view more"} arrow disableInteractive followCursor={true} placement='top'>
                                        <tr className='table-wrapper' >
                                            <td onClick={() => handleNav(g)}>{g.ticket_no}</td>
                                            <td onClick={() => handleNav(g)}>{g.tkt_title}</td>
                                            <td onClick={() => handleNav(g)}>{g.tkt_type}</td>
                                            <td onClick={() => handleNav(g)}>{g.req_type}</td>
                                            <td onClick={() => handleNav(g)}>{g.requester_emp_name}</td>
                                            <td onClick={() => handleNav(g)} className='align-middle'>{severityArrow(g.severity)}</td>
                                            <td onClick={() => handleNav(g)} >{g.created_at}</td>
                                            <td onClick={() => handleNav(g)} className='align-middle'>{status(g.tkt_status)}</td>
                                            <td onClick={() => handleNav(g)}>{g.tkt_current_at}</td>
                                            {String(getCookies()[0]) === String(g.requester_emp_no) && <td className='delete'>
                                                <TipTool body={< >
                                                    <IconButton onClick={() => handleDelete(g.id)}>
                                                        <MdDeleteOutline color='#f08080' size={22} />
                                                    </IconButton>
                                                </>} title={"Delete"} />
                                            </td>}
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
        return (<div className='flex justify-center p-1 rounded-xl bg-yellow-100'><p className='mt-[0.1rem]'>Meduim</p><HiMiniArrowSmallRight className='text-yellow-500' size="25" /></div>)
    }
    if (val === 2) {
        return (<div className='flex justify-center p-1 rounded-xl bg-red-100'><p className='mt-[0.1rem]'>High</p><HiMiniArrowSmallUp className='text-red-500' size="25" /></div>)
    }
    else {
        return "-"
    }
}
