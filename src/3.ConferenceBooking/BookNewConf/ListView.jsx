import React, { useContext, useMemo, useState } from 'react'
import BackArrow from '../../Helper Components/SideComponent'
import { TextField, Button, Divider, Autocomplete, Box, IconButton } from '@mui/material'
import { AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai'
import moment from 'moment'
import '../../../Style/conferenceListView.css'
import { api } from '../../Helper Components/Api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AppContext } from '../../App'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Controller } from 'react-hook-form'
import { User } from 'tabler-icons-react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ConferenceBooking from './ConferenceBooking'
import { IoMdArrowBack, IoMdRefresh } from 'react-icons/io'
import LoadingSpinner from '../../Helper Components/LoadingSpinner'

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IMAGES from '../../assets/Image/Image'
import { MdDeleteOutline } from 'react-icons/md'

export default function ConferenceBookingListView() {
    const { setMomentTime, dialogStatus, setDialogStatus, confTemp, setConfTemp, disabledOptions, setDisabledOptions } = useContext(AppContext)
    const [error1, setError1] = useState(false)
    const thead = ["Conf No", "By", "Dept", "Start Date", "Start Time", "Conference Room", "End Date", "End Time",]
    // const { isLoading, error, data } = useQuery(['conference-data'], async () => { return await axios.get(api.conference_booking.get_data) })

    const value = useMemo(() => {
        return (Array.from(Array(41).keys()).map(x => {
            return (moment("06/23/2023 08:00").add(15 * (x), 'minute').format("hh:mm A"));
        }))
    }, [])

    const all_conference_rooms = useQuery(['all-conference-rooms'], async () => {
        return await axios.get(api.dynamic_values.conference_rooms)
    })
    const _conferences = () => {
        const val = all_conference_rooms?.data?.data.map((room) => {
            const data = (room.split("#"))
            return { conf: data[0], no: data[1] }
        })
        return (val);
    }

    const prev_booked_list = useQuery(['prev-booked-list', confTemp.conf_room_start_date, confTemp.conf_room], async () => {
        const data = await axios.post(api.conference_booking.get_by_date_and_conf_room, {
            "conf_start_date": confTemp.conf_room_start_date ? moment(confTemp.conf_room_start_date, "DD/MM/YYYY").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            "conf_room": confTemp.conf_room ? confTemp.conf_room : "MULLA"
        })

        console.log({
            "conf_room": confTemp.conf_room ? confTemp.conf_room : setConfTemp({ ...confTemp, conf_room: "MUTHA" })
        });
        return data
    })
    const diff_numbered = (a, b) => {
        let flag = []
        for (let i = b; i <= a; i++) {
            flag.push(value[i])
        }
        return flag
    }

    function getMeetingInfo(what) {
        const header_data = !prev_booked_list.isLoading && prev_booked_list?.data?.data?.data?.map(x => {
            if (what === moment(x.conf_start_time, "HH:mm").format("hh:mm A")) {
                // return `${x.meeting_about} | ${x.conf_by} | ${"IT"}`
                return (
                    <div className='flex justify-between'>
                        <span>{x.meeting_about}</span>
                        <div className='grid grid-cols-3 gap-2'>
                            <span>{x.conf_by}</span>
                            <span>{"IT"}</span>
                            <div className='cursor-pointer'>
                                <MdDeleteOutline onClick={() => { console.log("Hi"); }} color='#f08080' size={20} />
                            </div>
                        </div>
                    </div>
                )
            }
            return false
        })

        return (header_data.filter(item => item)[0] && <>
            <span classname={"p-1"}>{header_data.filter(item => item)[0]}</span>
        </>)
    }


    const booked_dates = !prev_booked_list.isLoading && (prev_booked_list?.data?.data?.data?.map(x => {
        const _24_to_12hr = (val) => moment(val, "HH:mm").format("hh:mm A")
        return ({
            diff_numbered: diff_numbered(value.indexOf(_24_to_12hr(x.conf_end_time)), value.indexOf(_24_to_12hr(x.conf_start_time)))
        });
    }));

    let _flag = []

    booked_dates && booked_dates.map(y => {
        _flag.push(...y.diff_numbered)
    })

    function handleDilogBox() {
        if (!confTemp.conf_room_start_date || !confTemp.conf_room) {
            setError1(true)
        } else {
            setDisabledOptions([..._flag])
            setDialogStatus(true)
            setError1(false)
            setMomentTime(value)
        }
    }

    function handleClearBtn() {
        Object.keys(confTemp).map(x => setConfTemp({ [x]: "" }));
    }

    function handleDataChange(a) {
        setConfTemp({
            ...confTemp,
            conf_room_start_date: moment(a.$d).format("DD/MM/YYYY")
        })
    }

    return (
        <div >
            <BackArrow location={"/conference/booking/list"} title={"Conference Booking"} />

            <div className='flex gap-5 mx-10 my-5'>
                <div className=' w-fit px-4 bg-[#eeeeee] rounded-lg shadow-[rgba(149,157,165,0.2)_0px_8px_24px]'>
                    <div className='w-fit'>
                        <ButtonComponent onClick={handleClearBtn} icon={<IoMdRefresh color='white' size={"15"} />} btnName={"Clear All"} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                onChange={(a, b) => {
                                    handleDataChange(a)
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div >
                        <CustomAutoCompleteWithIcon control={""} errors={""} name={"conference_rooms"} label={"Conference Rooms"} options={_conferences()} />

                    </div>
                    {(error1) && <div className='rounded-md mt-5 flex justify-center bg-[#d8d8d8]'>
                        <AiOutlineInfoCircle size={"20"} className='mt-1' />
                        <span className='  p-1 text-sm  text-[#ff0000cc] '>Select both<strong> Date</strong> and<strong> Conference Room</strong></span>
                    </div>}
                </div>
                {!prev_booked_list.isLoading ? <div className='w-[100vw]'>
                    <div className='mb-4'>
                        <span className='text-2xl'>Timing Schedule</span>
                    </div>
                    <div className='max-h-[47rem] overflow-y-scroll '>
                        {!prev_booked_list.isLoading &&
                            value.map((x, i) => {
                                if ([..._flag].includes(x)) {
                                    return (
                                        <div key={i} className='w-[100%]'>
                                            {getMeetingInfo(x) && <div className='pt-4'></div>}
                                            <div className='p-[1rem] bg-gray-100 cursor-not-allowed flex justify-between '>
                                                <span>{x}</span>
                                                {getMeetingInfo(x) && <div style={{
                                                    borderLeft: "5px solid rgba(255, 0, 0,0.9)",
                                                    background: "rgba(255, 0, 0,0.1)",
                                                }} className='pl-4 pt-1 pb-1 w-[94%] '>
                                                    <div className='font-[900] '>{getMeetingInfo(x)}</div>
                                                </div>}
                                            </div>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div key={i} className='w-[100%]' onClick={handleDilogBox}>
                                            <Divider orientation='horizontal' />
                                            <p className='indv' onClick={() =>
                                                setConfTemp({ ...confTemp, conf_room_start_time: x })}
                                                key={i}>{x}</p>
                                        </div>
                                    )
                                }
                            })
                        }
                        <Divider orientation='horizontal' />
                        <TemporaryDrawer body={<ConferenceBooking />} />
                    </div>
                </div>
                    : <div>
                        <LoadingSpinner />
                    </div>
                }
            </div>
        </div>
    )


}

const CustomAutoCompleteWithIcon = ({ register, errors, name, label, obj, control, options }) => {
    const { dialogStatus, setDialogStatus, confTemp, setConfTemp } = useContext(AppContext)

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
                setConfTemp({ ...confTemp, conf_room: selectedValue.conf })

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

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className=' w-fit mt-5 no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline mt-1'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}



function TemporaryDrawer({ body }) {
    const { dialogStatus, setDialogStatus } = useContext(AppContext)

    const list = (anchor) => (
        <Box
            role="presentation"
        >
            <div className='flex gap-5 ml-5'>
                <ButtonComponent icon={<IoMdArrowBack color='white' size={"15"} />} btnName={"Back"} onClick={() => setDialogStatus(false)} />
                <span className='text-3xl mt-5'>Book a Conference</span>
            </div>
            {body}
            {/* <div className='absolute right-0 bottom-0 ' >
                <img width={"300px"} src={IMAGES.conf_img} />
            </div> */}
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={"right"}
                        open={dialogStatus}
                        onClose={() => setDialogStatus(false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}