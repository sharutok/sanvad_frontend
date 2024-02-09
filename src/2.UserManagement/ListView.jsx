import React, { useContext, useEffect, useState } from 'react'
import Table from '../Helper Components/Table'
import BackArrow from '../Helper Components/SideComponent'
import { useQuery, useMutation } from '@tanstack/react-query'
import { IconButton, TextField, Tooltip } from '@mui/material'
import { api } from '../Helper Components/Api'
import { AiOutlineDownload } from 'react-icons/ai'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import CPagination from '../Helper Components/Pagination'
import { AppContext } from '../App'
import { useAtom } from 'jotai'
import { searchAtom } from '../Helper Components/CustomCookies'

export default function UserManagementListView() {
    const { count, setCount, page, setPage } = useContext(AppContext)

    const [searchVariable, setSearchVariable] = useAtom(searchAtom)
    const thead = ["Employee Code", "Function", "Location", "First Name", "Last Name", "Department", "Plant", "Organization", "User Status", "Date of joining"]

    async function get_user_data() {
        // return await axios.get(`${api.user_management.get_data}/?page=${page}&search=${_search || getCookies()[3]}`)
        return await axios.get(`${api.user_management.get_data}/?page=${page}&search=${searchVariable}`)
    }

    const { isLoading, error, data } = useQuery(['user-data-list', page, searchVariable], async () => {
        return await get_user_data()
    })


    useEffect(() => {
        setCount(Math.ceil(data?.data.count / 10))
    })

    function handleNav(g) {
        // window.location.href = `/user/management/indvi/${g.id}`
        window.open(`/user/management/indvi/${g.id}`, '_blank')
    }

    return (
        <div >
            <div className='flex justify-between mt-20'>
                <BackArrow location={"/home"} title={"User Management - Listing"} />
                <div className='flex gap-4 mt-3 mr-10'>
                    <TextField value={searchVariable} onChange={(e) => { setSearchVariable(e.target.value) }} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    <ButtonComponent onClick={() => { window.location.href = "/user/management/new" }} icon={<AiOutlineUserAdd color='white' size={"23"} />} btnName={"Add User"} />
                </div>
            </div>
            {!isLoading ?
                <div className='mt-10 px-10'>
                    <Table thead={thead} tbody={
                        data?.data?.results?.map((g, i) => {
                            return (
                                <Tooltip key={i} title={"Click to view more"} arrow disableInteractive followCursor={false} placement='top'>
                                    <tr className='p-10 mt-1 table-wrapper' >
                                        <td onClick={() => handleNav(g)}>{g.emp_no}</td>
                                        <td onClick={() => handleNav(g)}>{g.ess_function}</td>
                                        <td onClick={() => handleNav(g)}>{g.ess_location}</td>
                                        <td onClick={() => handleNav(g)}>{g.first_name}</td>
                                        <td onClick={() => handleNav(g)}>{g.last_name}</td>
                                        <td onClick={() => handleNav(g)}>{g.department}</td>
                                        <td onClick={() => handleNav(g)}>{g.plant_name}</td>
                                        <td onClick={() => handleNav(g)}>{g.organization || "-"}</td>
                                        <td onClick={() => handleNav(g)}>{UserStatus(g.user_status)}</td>
                                        <td onClick={() => handleNav(g)}>{g.start_date || "-"}</td>
                                    </tr>
                                </Tooltip>
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
        return (<div className='flex justify-center '><p className='mt-[0.1rem]  bg-green-100 px-3 py-1 rounded-full'>Active</p></div>)
    }
    if (val === false) {
        return (<div className='flex justify-center '><p className='px-3 py-1  rounded-full bg-red-100 mt-[0.1rem]'>Inactive</p></div>)
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


