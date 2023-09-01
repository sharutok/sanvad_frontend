import React from 'react'
import BackArrow from '../Helper Components/SideComponent'
import CPagination from '../Helper Components/Pagination'
import Table from '../Helper Components/Table'
import { Fab, TextField, Button, Divider, Autocomplete, Box } from '@mui/material'
import TipTool from '../Helper Components/TipTool'
import { MdClear } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { GiVideoConference } from 'react-icons/gi'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import moment from 'moment'
import '../../Style/conferenceListView.css'
import { api } from '../Helper Components/Api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Controller } from 'react-hook-form'
import { User } from 'tabler-icons-react'

export default function ConferenceBookingListView() {
    const thead = ["Conf No", "By", "Dept", "Start Date", "Start Time", "Conference Room", "End Date", "End Time",]
    const { isLoading, error, data } = useQuery(['conference-data'], async () => { return await axios.get(api.conference_booking.get_data) })
    const conferences = [
        { conf: 'Mula', no: "08" },
        { conf: 'Mutha', no: "08" },
        { conf: 'Ganga', no: "10" },
        { conf: 'Indrayani', no: "18" },
    ]
    return (
        <div>
            <BackArrow location={"/home"} title={"Conference Booking - Listing"} />
            <div className='flex gap-4'>
                <div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar />
                        </LocalizationProvider>
                    </div>
                    <div>
                        <CustomAutoCompleteWithIcon control={""} errors={""} name={"conference_rooms"} label={"Conference Rooms"} options={conferences} />
                    </div>
                </div>
                <div className='max-h-[40rem] overflow-y-scroll'>
                    {Array.from(Array(37).keys()).map(x => {
                        if ([2, 3, 1, 5, 20, 23, 24, 25, 30, 31, 32].includes(x)) {
                            return (
                                <div className='w-[100vw]'>
                                    <Divider orientation='horizontal' />
                                    <p className='indv bg-gray-300' key={x}>{moment("10/10/2023 09:00").add(15 * (x), 'minute').format("hh:mm A")}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div className='w-[100vw]'>
                                    <Divider orientation='horizontal' />
                                    <p className='indv' key={x}>{moment("10/10/2023 09:00").add(15 * (x), 'minute').format("hh:mm A")}</p>
                                </div>
                            )

                        }
                    })}

                </div>
            </div>
        </div>
    )
}
const CustomAutoCompleteWithIcon = ({ register, errors, name, label, obj, control, options }) => {
    return (
        <Autocomplete
            className='textfield'
            disablePortal
            id="combo-box-demo"
            options={options}
            getOptionLabel={(obj) => obj.conf}
            renderOption={(props, obj) => (
                <Box style={{ display: "flex", justifyContent: "space-between" }} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <div>
                        {obj.conf}
                    </div>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <User />
                        <div >
                            {obj.no}
                        </div>
                    </Box>
                </Box>
            )}
            onChange={(e, selectedValue) => {
                console.log(selectedValue);
            }}
            renderInput={(params) => <TextField
                key={name}
                {...params}
                size={"small"}
                label={label}
                variant="outlined"
            />
            }

        />

    )
}