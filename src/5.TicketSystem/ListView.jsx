import React, { useContext } from 'react'
import Table from '../Helper Components/Table'
import { HiMiniArrowSmallDown, HiMiniArrowSmallRight, HiMiniArrowSmallUp } from 'react-icons/hi2'
import CPagination from '../Helper Components/Pagination'
import BackArrow from '../Helper Components/SideComponent'
import { Fab, IconButton, TextField } from '@mui/material'
import TipTool from '../Helper Components/TipTool'
import { MdClear, MdDeleteOutline } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import { IoIosPaper } from 'react-icons/io'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../Helper Components/Api'
import { AppContext } from '../App'
import BarSnack from '../Helper Components/BarSnack'
import { Link } from 'react-router-dom'

export default function TicketSystemListView() {
    const { setSnackBarPopUp } = useContext(AppContext)
    const thead = ["TIcket ID", "Ticket Title", "Ticket Type", "Requirement Type", "Requester", "Severity", "Ticket Date", "Status", "Current At"]

    const ticket_listing = useQuery(['ticket-listing', handleDelete], async () => {
        const data = await axios.get(api.ticket_system.get_data)
        return data
    })

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

    async function handleDelete(id) {
        const response = await axios.delete(api.ticket_system.by_id + id)
        response.data.status_code === 200 && setSnackBarPopUp({ state: true, message: "Ticket Delete" })
    }


    return (
        <div>
            <BarSnack />
            <div>
                <div className='flex justify-between mt-10'>
                    <BackArrow location={"/home"} title={"Ticketing System - Listing"} />
                    <div className='flex gap-4 mt-3 mr-10'>
                        <TextField sx={{ width: "20rem" }} id="outlined-basic" label="Smart Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                        <ButtonComponent icon={<FiSearch color='white' size={"23"} />} />
                        <ButtonComponent icon={<MdClear color='white' size={"23"} />} />
                        <ButtonComponent onClick={() => { window.location.href = "/ticket/sys/new" }} icon={<IoIosPaper color='white' size={"23"} />} btnName={"New Ticket"} />
                        <ButtonComponent icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />
                    </div>
                </div>
                <div className='mt-10 mx-10'>
                    <Table thead={thead}
                        tbody={
                            ticket_listing?.data?.data?.results.map((g, i) => {
                                return (
                                    <tr className='table-wrapper' key={i}>
                                        <td>
                                            <Link to={`/ticket/sys/${g.id}`}>{g.ticket_no}</Link>
                                        </td>
                                        <td>{g.tkt_title}</td>
                                        <td>{g.tkt_type}</td>
                                        <td>{g.req_type}</td>
                                        <td>{g.requester_emp_no}</td>
                                        <td className='align-middle'>{severityArrow(g.severity)}</td>
                                        <td>{g.created_at}</td>
                                        <td>{g.tkt_status}</td>
                                        <td>{g.tkt_current_at}</td>
                                        <td className='delete'>
                                            <TipTool body={< >
                                                <IconButton onClick={() => handleDelete(g.id)}>
                                                    <MdDeleteOutline color='#f08080' size={22} />
                                                </IconButton>
                                            </>} title={"Delete"} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    />
                </div>
                < CPagination />
            </div>
        </div>
    )
}

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}