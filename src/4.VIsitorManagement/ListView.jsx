import React, { useContext, useEffect } from 'react'
import BackArrow from '../Helper Components/SideComponent'
import CPagination from '../Helper Components/Pagination'
import { FiSearch } from 'react-icons/fi'
import { MdClear, MdDeleteOutline } from 'react-icons/md'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import { IoIosPaper } from 'react-icons/io'
import { Button, TextField } from '@mui/material'
import Table from '../Helper Components/Table'
import { useQuery } from '@tanstack/react-query'
import { api } from '../Helper Components/Api'
import axios from 'axios'
import { AppContext } from '../App'
import TipTool from '../Helper Components/TipTool'

export default function VisitManagementListView() {
    const thead = ["Visitor's Reason For Vist", "Raised By", "Department", "Start Date-time", "End Date-Time", "Visitor Count",]
    const { count, setCount, page, setPage } = useContext(AppContext)

    const { data, isLoading } = useQuery(["visitor-list", page], async () => {
        return axios.get(`${api.visitor_management.get_data}/?page=${page}`)
    })

    useEffect(() => {
        setCount(Math.ceil(data?.data.count / 10))
    })


    return (
        <div>
            <div className='flex justify-between mt-5'>
                <BackArrow location={"/home"} title={"Visitor's Management - Listing"} />
                <div className='flex gap-4 mt-3 mr-20'>
                    <TextField sx={{ width: "20rem" }} id="outlined-basic" label="Smart Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    <ButtonComponent icon={<FiSearch color='white' size={"23"} />} />
                    <ButtonComponent icon={<MdClear color='white' size={"23"} />} />
                    <ButtonComponent onClick={() => { window.location.href = "/vistors/management/new" }} icon={<AiOutlineUserAdd color='white' size={"23"} />} btnName={"Add Visitor"} />
                    <ButtonComponent icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />
                </div>
            </div>
            <div className='mt-10 px-10'>
                <Table thead={thead} tbody={
                    data?.data?.results.map((g, i) => {
                        return (
                            <tr className='p-10 mt-1 table-wrapper' key={i}>
                                <td >{g.reason_for_visit}</td>
                                <td >{g.raised_by}</td>
                                <td ></td>
                                <td >{g.start_date_time}</td>
                                <td >{g.end_date_time}</td>
                                <td >{g.visitors.length}</td>
                                {/* <td >
                                    <>
                                        <>
                                            <Button sx={{ color: "grey", background: "white" }} disableElevation>{"Check In"}</Button>
                                            <Button sx={{ color: "grey", background: "white" }} disableElevation>{"Check Out"}</Button>
                                        </>
                                    </>
                                </td> */}
                                <td className='delete'>
                                    <TipTool body={
                                        <div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200'>
                                            <MdDeleteOutline color='#f08080' size={22} />
                                        </div>
                                    } title={"Delete"} />
                                </td>
                            </tr>
                        )
                    })} />
            </div>
            <div>
                <CPagination />
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