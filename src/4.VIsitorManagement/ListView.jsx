import React, { useState, useContext, useEffect } from 'react'
import BackArrow from '../Helper Components/SideComponent'
import CPagination from '../Helper Components/Pagination'
import { FaInfoCircle } from "react-icons/fa";
import { Divider, FormControlLabel, IconButton, Stack, Switch, Typography } from '@mui/material'
import { MdClear, MdDeleteOutline } from 'react-icons/md'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import { IoIosPaper } from 'react-icons/io'
import { Button, TextField, Tooltip } from '@mui/material'
import Table from '../Helper Components/Table'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../Helper Components/Api'
import axios from 'axios'
import { AppContext } from '../App'
import TipTool from '../Helper Components/TipTool'
import moment from 'moment'
import BarSnack from '../Helper Components/BarSnack'
import { abbriviation, exportToCSV, isPermissionToView } from '../Static/StaticValues'
import { getCookies } from '../Helper Components/CustomCookies'
import LoadingSpinner from '../Helper Components/LoadingSpinner'

export default function VisitManagementListView() {
    const thead = [
        "Visitor Ref No",
        "Raised By",
        "Department",
        "Main Visitor's Name",
        "Visitor Company",
        "Start Date-time",
        "End Date-Time",
        "Reason For Vist",
        "Visitor Count",
        "Visitor's Status"]
    const { count, setCount, page, setSnackBarPopUp } = useContext(AppContext)
    const [_search, _setSearch] = useState("")
    const queryClient = useQueryClient()
    const [_date, _setDate] = useState(true)

    const { data, isLoading } = useQuery(["visitor-list", page, _search, _date], async () => {
        return axios.get(`${api.visitor_management.get_data}/?page=${page}&search=${_search}&date=${_date}&woosee=${getCookies()[0]}`)
    })
    const list_access_permission = useQuery(["list-access-permission", page, _search], async () => {
        const response = axios.get(`${api.visitor_management.list_access}/?woosee=${getCookies()[0]}`)
        return response
    })

    useEffect(() => {
        setCount(Math.ceil(data?.data.count / 10))
    })

    function handleNav(g) {
        window.location.href = "/vistors/management/" + g.id
        // window.open("/vistors/management/" + g.id, '_blank')
    }

    async function handleDelete(id) {
        const response = await axios.delete(api.visitor_management.by_id + id)
        response.data.status_code === 200 && setSnackBarPopUp({ state: true, message: "Deleted Entry", severity: "s" })
        queryClient.invalidateQueries(['visitor-list'])
    }
    async function exportData() {
        try {
            const data = await axios.post(api.utils.download_excel, { "data_module": "visitor" })
            exportToCSV(data?.data?.data, `Visitor Management ${moment().format("DD_MM_YYYY")}`)
        } catch (error) {
            console.log("error in exporting");
        }
    }

    return (
        <div>
            <div className='flex justify-between mt-20'>
                <BackArrow location={"/home"} title={"Visitor's Management - Listing"} />
                <div className='flex gap-4 mt-3 mr-20'>
                    <BarSnack />
                    <TextField onChange={(e) => _setSearch(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    <Divider orientation='vertical' />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography >All Visitors</Typography>
                        <FormControlLabel checked={_date} onChange={() => _setDate(!_date)} color="#555259" control={<Switch />} />
                        <Typography >Today's Visitors</Typography>
                    </Stack>
                    <ButtonComponent onClick={() => { window.location.href = "/vistors/management/new" }} icon={<AiOutlineUserAdd color='white' size={"23"} />} btnName={"Add Visitor"} />
                    {isPermissionToView("visitormanagement:export") && <ButtonComponent onClick={() => exportData()} icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />}
                </div>
            </div>
            <div className='mt-10 px-10'>
                <Table thead={thead} tbody={
                    !isLoading ? data?.data?.results.map((g, i) => {
                        return (
                            <Tooltip key={i} title={"Click to view more"} arrow disableInteractive followCursor={false} placement='top'>
                                <tr className='p-10 mt-1 table-wrapper' key={i}>

                                    <td onClick={() => handleNav(g)} >{abbriviation(g.id, 10)}</td>
                                    <td onClick={() => handleNav(g)} >{g.name}</td>
                                    <td onClick={() => handleNav(g)} >{g.department}</td>
                                    <td onClick={() => handleNav(g)} >{JSON.parse(g.visitors) && JSON.parse(g.visitors)[0]?.["v_name"]}</td>
                                    <td onClick={() => handleNav(g)} >{abbriviation(g.v_company, 25)}</td>
                                    <td onClick={() => handleNav(g)} ><div className='flex justify-center gap-5'>
                                        {moment(g.start_date_time).format("DD-MM-YYYY hh:mm a")}{MorInfo("Actual In Time", g.punch_in_date_time)}
                                    </div></td>
                                    <td onClick={() => handleNav(g)} ><div className='flex justify-center gap-5'>
                                        {moment(g.end_date_time).format("DD-MM-YYYY hh:mm a")}{MorInfo("Actual Out Time", g.punch_out_date_time)}
                                    </div></td>
                                    <td onClick={() => handleNav(g)} >{abbriviation(g.reason_for_visit, 25)}</td>
                                    <td onClick={() => handleNav(g)} >{JSON.parse(g.visitors).length}</td>
                                    <td onClick={() => handleNav(g)} >{VisitorStatus(g.visitor_status)}</td>
                                    {!list_access_permission?.data?.data.delete_btn &&
                                        g.visitor_status == 0 && <td onClick={() => handleDelete(g.id)} className='delete '>
                                            <TipTool position={"right"} body={
                                                <div className='w-fit hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200'>
                                                    <MdDeleteOutline color='#f08080' size={22} />
                                                </div>
                                            } title={"Delete"} />
                                        </td>
                                    }
                                </tr>
                            </Tooltip>
                        )
                    }) : <LoadingSpinner />} />
            </div>
            <div>
                <CPagination />
            </div>
        </div>
    )
}

const MorInfo = (a, g) => {
    return (
        <div>
            {g && <TipTool position={"right"} body={
                <div>
                    <FaInfoCircle size={"17"} title={a + " " + moment(g).format("DD-MM-YYYY hh:mm a")} />
                </div>
            } />}
        </div>
    )
}

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='whitespace-nowrap no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}

function VisitorStatus(val) {
    if (val === 0) {
        return (<div className='flex justify-center '><p className='mt-[0.1rem]  bg-slate-100 px-3 py-1 rounded-full'>Not Yet</p></div>)
    }
    if (val === 1) {
        return (<div className='flex justify-center '><p className='px-3 py-1  rounded-full bg-yellow-100 mt-[0.1rem]'>In-Premise</p></div>)
    }
    if (val === 2) {
        return (<div className='flex justify-center '><p className='px-3 py-1  rounded-full bg-green-100 mt-[0.1rem]'>Exited</p></div>)
    }
}