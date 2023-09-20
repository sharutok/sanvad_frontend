import React from 'react'
import BackArrow from '../Helper Components/SideComponent'
import CPagination from '../Helper Components/Pagination'
import { FiSearch } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import { IoIosPaper } from 'react-icons/io'
import { Button, TextField } from '@mui/material'
import Table from '../Helper Components/Table'

export default function VisitManagementListView() {
    const thead = ["Visitor's Name", "Visitor's Company", "Visitor's Reason For Vist", "PPE", "Visitor Count", "Actions"]
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
            <div className='mt-10'>
                <Table thead={thead} tbody={
                    [1, 2, 3, 4, 5, 6].map((g, i) => {
                        return (
                            <tr className='p-10 mt-1' key={i}>
                                <td >{"g.emp_no"}</td>
                                <td >{"g.first_name"}</td>
                                <td >{"g.last_name"}</td>
                                <td >{"g.department"}</td>
                                <td >{"g.plant_name"}</td>
                                <td >
                                    <>
                                        <>
                                            <Button sx={{ color: "grey", background: "white" }} disableElevation>{"Check In"}</Button>
                                            <Button sx={{ color: "grey", background: "white" }} disableElevation>{"Check Out"}</Button>
                                        </>
                                    </>
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