import React, { useContext, useEffect } from 'react'
import Table from '../Helper Components/Table'
import BackArrow from '../Helper Components/SideComponent'
import { useQuery, } from '@tanstack/react-query'
import { IconButton, TextField } from '@mui/material'
import { api } from '../Helper Components/Api'
import { AiOutlineDownload } from 'react-icons/ai'
import { MdDeleteOutline, MdOutlineOpenInNew } from 'react-icons/md'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { FiSearch } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import CPagination from '../Helper Components/Pagination'
import TipTool from '../Helper Components/TipTool'
import { AppContext } from '../App'
import moment from 'moment'

export default function ListsView() {
    const thead = ["Meeting title", "Start Date", "End Date ", "Start Time", "End Time", "Conference", "Booked By", "Department"]
    const { count, setCount, page, setPage } = useContext(AppContext)
    const { data, isLoading } = useQuery(['list-of-conf-booking'], async () => {
        return axios.get(api.conference_booking.get_data + "/?page=" + page)
    })
    console.log(data?.data);
    useEffect(() => {
        setCount(Math.ceil(data?.data.count / 10))
    })
    return (
        <div >
            <div className='flex justify-between mt-10'>
                <BackArrow location={"/home"} title={"Conference Booking - Listing"} />
                <div className='flex gap-4 mt-3 mr-10'>
                    <TextField sx={{ width: "20rem" }} id="outlined-basic" label="Smart Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    <ButtonComponent icon={<FiSearch color='white' size={"23"} />} />
                    <ButtonComponent icon={<MdClear color='white' size={"23"} />} />
                    <ButtonComponent onClick={() => { window.location.href = "/conference/booking/new" }} icon={<GroupAddIcon sx={{ color: 'white' }} size={"23"} />} btnName={"Book Conference"} />
                    <ButtonComponent icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />
                </div>
            </div>
            {!false ?
                <div className='mt-10 mx-10'>
                    <Table thead={thead} tbody={
                        data?.data.results.map((g, i) => {
                            return (
                                <tr className='p-10 mt-1 table-wrapper' key={i}>
                                    <td>{g.meeting_about}</td>
                                    <td>{moment(g.conf_start_date).format("DD MMM YYYY")}</td>
                                    <td>{moment(g.conf_end_date).format("DD MMM YYYY")}</td>
                                    <td>{moment(g.conf_start_time, "HH:mm").format("hh:mm A")}</td>
                                    <td>{moment(g.conf_end_time, "HH:mm").format("hh:mm A")}</td>
                                    <td>{g.conf_room}</td>
                                    <td >{g.conf_by}</td>
                                    <td ></td>
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
                    < CPagination />
                </div>
                : <LoadingSpinner />}
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