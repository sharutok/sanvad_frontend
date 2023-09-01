import React from 'react'
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

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='no-underline rounded-md p-2 border border-solid border-[#c7c7c7] bg-[#fcfcfc] flex gap-3 px-3 cursor-pointer hover:bg-[#e6e6e6] active:bg-[#cccccc] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            <span className='text-[15px] no-underline'>{btnName}</span>
        </div>
    )
}


export default function UserManagementListView() {
    const thead = ["Employee Code", "First Name", "Last Name", "Department", "Plant", "Organization", "User Status", "Date of joining"]
    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.user_management.get_data) })
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    function handleNavigation(id) {
        window.location.href = `/user/management/indvi/${id}`
    }

    return (
        <div >
            <BackArrow location={"/home"} title={"User Management - Listing"} />
            <div className='mt-10 ml-5 flex gap-4'>
                <TextField id="outlined-basic" label="Smart Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                <ButtonComponent icon={<FiSearch color='grey' size={"23"} />} btnName={"Search"} />
                <ButtonComponent icon={<MdClear color='grey' size={"23"} />} btnName={"Clear"} />
                <ButtonComponent onClick={() => { window.location.href = "/user/management/new" }} icon={<AiOutlineUserAdd color='grey' size={"23"} />} btnName={"Add User"} />
                <ButtonComponent icon={<AiOutlineDownload color='grey' size={"23"} />} btnName={"Export"} />
            </div>
            {!isLoading ?
                <div>
                    <Table thead={thead} tbody={
                        data?.data.map((g, i) => {
                            return (
                                <tr className='p-10 mt-5 table-wrapper' key={i}>
                                    <td onClick={() => handleNavigation(g.id)} >{g.emp_no}</td>
                                    <td onClick={() => handleNavigation(g.id)} >{g.first_name}</td>
                                    <td onClick={() => handleNavigation(g.id)}>{g.last_name}</td>
                                    <td onClick={() => handleNavigation(g.id)}>{g.department}</td>
                                    <td onClick={() => handleNavigation(g.id)}>{g.plant_name}</td>
                                    <td onClick={() => handleNavigation(g.id)}>{g.organization || "-"}</td>
                                    <td onClick={() => handleNavigation(g.id)}>{<UserStatus user_status={g.user_status} />}</td>
                                    <td onClick={() => handleNavigation(g.id)}>{g.start_date || "-"}</td>
                                    <td className='delete'>
                                        <TipTool body={<div >
                                            <IconButton>
                                                <MdDeleteOutline color='#f08080' size={22} />
                                            </IconButton>
                                        </div>} title={"Delete"} />
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


function UserStatus({ user_status }) {
    return (
        user_status ?
            <span className='bg-[#85ff85] rounded-md px-2 text-[grey] ' >Active</span> :
            <span className='bg-[#ff9b9b] rounded-md px-2 text-[grey] ' >Inactive</span>
    )
}
