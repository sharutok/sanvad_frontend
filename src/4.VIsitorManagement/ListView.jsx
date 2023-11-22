import React, { useState, useContext, useEffect } from 'react'
import BackArrow from '../Helper Components/SideComponent'
import CPagination from '../Helper Components/Pagination'
import { FiSearch } from 'react-icons/fi'
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
import { exportToCSV, isPermissionToView } from '../Static/StaticValues'
import { getCookies } from '../Helper Components/CustomCookies'

export default function VisitManagementListView() {
    const thead = ["Visitor's Reason For Vist", "Raised By", "Department", "Start Date-time", "End Date-Time", "Visitor Count",]
    const { count, setCount, page, setSnackBarPopUp } = useContext(AppContext)
    const [_search, _setSearch] = useState("")
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(["visitor-list", page, _search], async () => {
        return axios.get(`${api.visitor_management.get_data}/?page=${page}&search=${_search}&woosee=${getCookies()[0]}`)
    })


    useEffect(() => {
        setCount(Math.ceil(data?.data.count / 10))
    })

    function handleNav(g) {
        window.location.href = "/vistors/management/" + g.id
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
                    <ButtonComponent onClick={() => { window.location.href = "/vistors/management/new" }} icon={<AiOutlineUserAdd color='white' size={"23"} />} btnName={"Add Visitor"} />
                    {isPermissionToView("visitormanagement:export") && <ButtonComponent onClick={() => exportData()} icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />}
                </div>
            </div>
            <div className='mt-10 px-10'>
                <Table thead={thead} tbody={
                    data?.data?.results.map((g, i) => {
                        return (
                            <Tooltip key={i} title={"Click to view more"} arrow disableInteractive followCursor={true} placement='top'>
                                <tr className='p-10 mt-1 table-wrapper' key={i}>
                                    <td onClick={() => handleNav(g)} >{g.reason_for_visit}</td>
                                    <td onClick={() => handleNav(g)} >{g.name}</td>
                                    <td onClick={() => handleNav(g)} >{g.department}</td>
                                    <td onClick={() => handleNav(g)} >{moment(g.start_date_time).format("DD-MM-YYYY hh:mm a")}</td>
                                    <td onClick={() => handleNav(g)} >{moment(g.end_date_time).format("DD-MM-YYYY hh:mm a")}</td>
                                    <td onClick={() => handleNav(g)} >{JSON.parse(g.visitors).length}</td>
                                    <td onClick={() => handleDelete(g.id)} className='delete '>
                                        <TipTool position={"right"} body={
                                            <div className='w-fit hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200'>
                                                <MdDeleteOutline color='#f08080' size={22} />
                                            </div>
                                        } title={"Delete"} />
                                    </td>
                                </tr>
                            </Tooltip>
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