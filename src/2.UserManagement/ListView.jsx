import React, { useContext, useEffect } from 'react'
import Table from '../Helper Components/Table'
import BackArrow from '../Helper Components/SideComponent'
import { useQuery, } from '@tanstack/react-query'
import { IconButton, TextField } from '@mui/material'
import { api } from '../Helper Components/Api'
import { AiOutlineDownload } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import dayjs from 'dayjs';
import CPagination from '../Helper Components/Pagination'
import TipTool from '../Helper Components/TipTool'
import { AppContext } from '../App'
import IMAGES from '../assets/Image/Image'
import { GoDot, GoDotFill } from 'react-icons/go'
import { HiMiniArrowSmallDown } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function UserManagementListView() {
    const { count, setCount, page, setPage } = useContext(AppContext)
    const thead = ["Employee Code", "First Name", "Last Name", "Department", "Plant", "Organization", "User Status", "Date of joining"]
    const { isLoading, error, data } = useQuery(['sales-data', page], async () => {
        return await axios.get(`${api.user_management.get_data}/?page=${page}`)
    })
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    function handleNavigation(id) {
        window.location.href = `/user/management/indvi/${id}`
    }

    useEffect(() => {
        setCount(Math.ceil(data?.data.count / 10))
    })

    return (
        <div >
            <div className='flex justify-between mt-10'>
                <BackArrow location={"/home"} title={"User Management - Listing"} />
                <div className='flex gap-4 mt-3 mr-10'>
                    <TextField sx={{ width: "20rem" }} id="outlined-basic" label="Smart Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    <ButtonComponent icon={<FiSearch color='white' size={"23"} />} />
                    <ButtonComponent icon={<MdClear color='white' size={"23"} />} />
                    <ButtonComponent onClick={() => { window.location.href = "/user/management/new" }} icon={<AiOutlineUserAdd color='white' size={"23"} />} btnName={"Add User"} />
                    <ButtonComponent icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />
                </div>
            </div>
            {!isLoading ?
                <div className='mt-10 px-10'>
                    <Table thead={thead} tbody={
                        data?.data.results.map((g, i) => {
                            return (
                                <tr className='p-10 mt-1 table-wrapper' key={i}>
                                    <td>
                                        <Link to={`/user/management/indvi/${g.id}`}>{g.emp_no}</Link>
                                    </td>
                                    {/* <td onClick={() => handleNavigation(g.id)}>{g.emp_no}</td> */}
                                    <td >{g.first_name}</td>
                                    <td >{g.last_name}</td>
                                    <td >{g.department}</td>
                                    <td >{g.plant_name}</td>
                                    <td >{g.organization || "-"}</td>
                                    <td >{UserStatus(g.user_status)}</td>
                                    <td >{g.start_date || "-"}</td>
                                </tr>
                            )
                        })
                    } />
                    < CPagination />
                </div>
                : <LoadingSpinner />}
            {/* {(window.innerHeight >= 900 && window.innerWidth >= 1900) &&
                <div className='absolute right-0 bottom-0 ' >
                    <img width={"300px"} src={IMAGES.test_img} />
                </div>
            } */}

        </div>

    )
}

function UserStatus(val) {
    if (val === true) {
        return (<div className='flex justify-center p-1 rounded-xl bg-green-100'><p className='mt-[0.1rem]'>Active</p></div>)
    }
    if (val === false) {
        return (<div className='flex justify-center p-1 rounded-xl bg-red-100'><p className='mt-[0.1rem]'>Inactive</p></div>)
    }
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