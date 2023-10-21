import React, { useContext, useEffect, useState } from 'react'
import Table from '../Helper Components/Table'
import BackArrow from '../Helper Components/SideComponent'
import { useQuery, useMutation } from '@tanstack/react-query'
import { IconButton, TextField } from '@mui/material'
import { api } from '../Helper Components/Api'
import { AiOutlineDownload } from 'react-icons/ai'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import CPagination from '../Helper Components/Pagination'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'
import ExportToExcel from '../Helper Components/ExportToExcel'

export default function UserManagementListView() {
    const { count, setCount, page, setPage } = useContext(AppContext)
    const [_search, _setSearch] = useState("")
    const thead = ["Employee Code", "Function", "Location", "First Name", "Last Name", "Department", "Plant", "Organization", "User Status", "Date of joining"]

    async function get_user_data() {
        return await axios.get(`${api.user_management.get_data}/?page=${page}&search=${_search}`)
    }

    const { isLoading, error, data } = useQuery(['user-data-list', page, _search], async () => {
        return await get_user_data()
    })

    const mutation = useMutation({
        mutationFn: async (newTodo) => {
            get_user_data()
        },
    })

    useEffect(() => {
        setCount(Math.ceil(data?.data.count / 10))
    })


    return (
        <div >
            <div className='flex justify-between mt-10'>
                <BackArrow location={"/home"} title={"User Management - Listing"} />
                <div className='flex gap-4 mt-3 mr-10'>
                    <TextField onChange={(e) => _setSearch(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    {/* <ButtonComponent onClick={handleOnSearch} icon={<FiSearch color='white' size={"23"} />} /> */}
                    {/* <ButtonComponent icon={<MdClear color='white' size={"23"} />} /> */}
                    <ButtonComponent onClick={() => { window.location.href = "/user/management/new" }} icon={<AiOutlineUserAdd color='white' size={"23"} />} btnName={"Add User"} />
                    {/* <ButtonComponent icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} /> */}
                    <ExportToExcel apiData={data?.data.results} fileName={"usermanagement"} />
                </div>
            </div>
            {!isLoading ?
                <div className='mt-10 px-10'>
                    <Table thead={thead} tbody={
                        data?.data.results.map((g, i) => {
                            return (
                                <tr className='p-10 mt-1 table-wrapper' key={i}>
                                    <td className='text-[#0b1358]'>
                                        <Link to={`/user/management/indvi/${g.id}`}>{g.emp_no}</Link>
                                    </td>
                                    <td >{g.ess_function}</td>
                                    <td >{g.ess_location}</td>
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


const ButtonComponent = ({ onClick, icon, btnName, ...props }) => {
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


