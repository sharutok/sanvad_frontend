import React, { useContext, useEffect, useState } from 'react'
import Table from '../Helper Components/Table'
import BackArrow from '../Helper Components/SideComponent'
import { useQuery, useQueryClient, } from '@tanstack/react-query'
import { Divider, FormControlLabel, IconButton, Stack, Switch, TextField, Tooltip, Typography } from '@mui/material'
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
import BarSnack from '../Helper Components/BarSnack'
import { exportToCSV, isPermissionToView } from '../Static/StaticValues'
import { getCookies } from '../Helper Components/CustomCookies'
import ButtonComponent from '../Helper Components/ButtonComponent'

export default function ListsView() {
    const thead = ["Meeting title", "Meeting Start Date", "Meeting End Date", "Start Time", "End Time", "Conference", "Booked By", "Department"]
    const { count, setCount, page, setSnackBarPopUp } = useContext(AppContext)
    const [_search, _setSearch] = useState("")
    const [_date, _setDate] = useState(false)

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(['list-of-conf-booking', _search, page, _date], async () => {
        return axios.get(`${api.conference_booking.get_data}/?page=${page}&search=${_search}&date=${_date}&woosee=${getCookies()[0]}`)
    })

    useEffect(() => {
        setCount(Math.ceil(data?.data?.count / 10))
    })

    async function handleDelete(id) {
        const response = await axios.delete(api.conference_booking.by_id + id)
        queryClient.invalidateQueries(['list-of-conf-booking'])
        response.data.status_code === 200 && setSnackBarPopUp({ state: true, message: "Deleted Entry", severity: "s" })
    }

    async function exportData() {
        try {
            const data = await axios.post(api.utils.download_excel, { "data_module": "conference" })
            exportToCSV(data?.data?.data, `Conference Booking ${moment().format("DD_MM_YYYY")}`)
        } catch (error) {
            console.log("error in exporting");
        }
    }

    return (
        <div >
            <div className='flex justify-between mt-20'>
                <BackArrow location={"/home"} title={"Conference Booking - Listing"} />
                <div className='flex gap-4 mt-3 mr-10'>
                    <BarSnack />
                    <TextField onChange={(e) => { _setSearch(e.target.value) }} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    <Divider orientation='vertical' />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography >All Bookings</Typography>
                        <FormControlLabel checked={_date} onChange={() => _setDate(!_date)} color="#555259" control={<Switch />} />
                        <Typography >Today's Bookings</Typography>
                    </Stack>
                    <ButtonComponent onClick={() => { window.location.href = "/conference/booking/new" }} icon={<GroupAddIcon sx={{ color: 'white' }} size={"23"} />} btnName={"Book Conference"} />
                    {isPermissionToView("usermanagement:export") && <ButtonComponent onClick={() => exportData()} icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />}
                </div>
            </div>
            {!isLoading ?
                <div className='mt-10 mx-10'>
                    <Table thead={thead} tbody={
                        data?.data.results.map((g, i) => {
                            return (
                                <tr className='p-10 mt-1 table-wrapper' key={i}>
                                    <td>{g.meeting_about}</td>
                                    <td>{moment(g.conf_end_date).format("DD MMM YYYY")}</td>
                                    <td>{moment(g.disp_conf_end_date).format("DD MMM YYYY")}</td>
                                    <td>{moment(g.conf_start_time, "HH:mm").format("hh:mm A")}</td>
                                    <td>{moment(g.conf_end_time, "HH:mm").format("hh:mm A")}</td>
                                    <td>{g.conf_room}</td>
                                    <td>{g.first_name}{" "}{g.last_name}</td>
                                    <td>{g.department}</td>
                                    <td className='delete'>
                                        {String(g.conf_by) === String(getCookies()[0]) ? <TipTool body={
                                            <IconButton onClick={() => handleDelete(g.id)}>
                                                <MdDeleteOutline color='#f08080' size={23} />
                                            </IconButton>
                                        } title={"Delete"} /> : <MdDeleteOutline className='' color='#ffff' size={35} />}
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


// const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
//     return (
//         <div
//             onClick={onClick}
//             {...props}
//             className='whitespace-nowrap no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
//             <div className='no-underline'>
//                 {icon}
//             </div>
//             {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2 '>{btnName}</span>}
//         </div>
//     )
// }