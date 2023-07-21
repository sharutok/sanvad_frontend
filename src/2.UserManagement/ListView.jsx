import React from 'react'
import Table from '../Helper Components/Table'
import { Link } from 'react-router-dom'
import BackArrow from '../Helper Components/SideComponent'
import { useQuery, useMutation, } from '@tanstack/react-query'
import { Button, TextField } from '@mui/material'
import { api } from '../Helper Components/Api'
import { GrFormView } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineDownload } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import Fab from '@mui/material/Fab';
import dayjs from 'dayjs';
import CPagination from '../Helper Components/Pagination'
import TipTool from '../Helper Components/TipTool'
export default function ListView() {
    const thead = ["First Name", "Last Name", "Department", "Plant", "Organization", "User Status", "View", "Delete"]
    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.user_management.get_data) })
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    return (
        <div >
            <BackArrow location={"/"} title={"User Management - Listing"} />
            <div className='mt-10 ml-5 flex gap-4'>
                <TextField id="outlined-basic" label="Smart Search" variant="outlined" size='small' />
                <TipTool body={
                    <Fab size='small' aria-label="add">
                        <FiSearch size={"20"} />
                    </Fab>} title={"Search"} position={"top"} />
                <TipTool body={
                    <Fab onClick={() => window.location.href = "/user/management/new"} size='small' aria-label="add">
                        <AiOutlineUserAdd size={"20"} />
                    </Fab>
                } title={"Add User"} position={"top"} />
                <TipTool body={
                    <Fab size='small' aria-label="add">
                        <AiOutlineDownload size={"20"} />
                    </Fab>
                } title={"Export"} position={"top"} />
            </div>
            {!isLoading ?
                <div>
                    <Table thead={thead} tbody={
                        data?.data.map((g, i) => {
                            return (
                                <tr key={i}>
                                    <td >{g.first_name}</td>
                                    <td>{g.last_name}</td>
                                    <td>{g.department}</td>
                                    <td>{g.plant_name}</td>
                                    <td>{g.organization || "-"}</td>
                                    <td>{g.user_status || "-"}</td>
                                    <td>
                                        <Link to={`/user/management/indvi/${g.id}`}><GrFormView /></Link>
                                    </td>
                                    <td>
                                        <RiDeleteBin6Line />
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









































































