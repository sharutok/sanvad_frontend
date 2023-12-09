import React, { useContext, useMemo, useRef, useState } from 'react'
import BackArrow from '../../Helper Components/SideComponent'
import { TextField, Divider, Autocomplete, Box } from '@mui/material'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import moment from 'moment'
import '../../../Style/conferenceListView.css'
import { api } from '../../Helper Components/Api'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { AppContext } from '../../App'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { User } from 'tabler-icons-react'
import ConferenceBooking from './ConferenceBooking'
import { IoMdArrowBack, IoMdRefresh } from 'react-icons/io'
import LoadingSpinner from '../../Helper Components/LoadingSpinner'
import Drawer from '@mui/material/Drawer';
import IMAGES from '../../assets/Image/Image'
import { MdDeleteOutline } from 'react-icons/md'
import dayjs from 'dayjs'
import { getCookies } from '../../Helper Components/CustomCookies'

export default function ConferenceBookingListView() {
    const { setMomentTime, dialogStatus, setDrawerStatus, confTemp, setConfTemp, disabledOptions, setDisabledOptions } = useContext(AppContext)
    const [error1, setError1] = useState(false)

    const value = useMemo(() => {
        return (Array.from(Array(41).keys()).map(x => {
            return (moment("06/23/2023 08:00").add(15 * (x), 'minute').format("hh:mm A"));
        }))
    }, [])

    const all_conference_rooms = useQuery(['all-conference-rooms'], async () => {
        return await axios.get(api.dynamic_values.conference_rooms)
    }, { staleTime: Infinity })

    const _conferences = () => {
        const val = all_conference_rooms?.data?.data.map((room) => {
            const data = (room.split("#"))
            return { conf: data[0], no: data[1] }
        })
        return (val);
    }

    const fetchData = async () => {
        const data = await axios.post(api.conference_booking.get_by_date_and_conf_room, {
            "conf_end_date": confTemp.conf_room_start_date ? moment(confTemp.conf_room_start_date, "DD/MM/YYYY").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            "conf_room": confTemp.conf_room ? confTemp.conf_room : "MULA"
        })
        return data
    }

    const prev_booked_list = useQuery(['prev-booked-list', confTemp.conf_room_start_date, confTemp.conf_room], fetchData, { staleTime: "300000" })



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
                return (
                    <div className='flex w-[100%] justify-between  px-5'>
                        <span className=''>{x.meeting_about}</span>
                        <div className='flex gap-3'>
                            <span className=''>{x.first_name} {x.last_name}  </span>
                            <div className='px-1 py-1'>
                                <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                            </div>
                            <span className=''>{x.department}</span>
                            {/* {String(x.conf_by) === String(getCookies()[0]) && <div className='cursor-pointer mt-[0.1rem]'>
                                <MdDeleteOutline onClick={() => { console.log("Hi"); }} color='#f08080' size={20} />
                            </div>} */}
                        </div>
                    </div>
                )
            }
            return false
        })

        return (header_data.filter(item => item)[0] && <>
            <span>{header_data.filter(item => item)[0]}</span>
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
        console.log(confTemp.conf_room_start_date, confTemp.conf_room);
        if (!confTemp.conf_room_start_date || !confTemp.conf_room) {
            setError1(true)
        } else {
            setDisabledOptions([..._flag])
            setDrawerStatus(true)
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
        <div className='mt-20'>
            <BackArrow location={"/conference/booking/list"} title={"Conference Booking"} />
            <div className='flex gap-5 mx-10 my-5'>
                <div className='w-fit px-4 bg-[#eeeeee] rounded-lg shadow-[rgba(149,157,165,0.2)_0px_8px_24px]'>
                    <div className='w-fit'>
                        <ButtonComponent onClick={handleClearBtn} icon={<IoMdRefresh color='white' size={"15"} />} btnName={"Clear All"} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                defaultValue={dayjs(moment().format("YYYY-MM-DD"))}
                                minDate={dayjs(moment().format("YYYY-MM-DD"))}
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
                        <AiOutlineInfoCircle color='#ff0000cc' size={"20"} className='mt-1' />
                        <span className='  p-1 text-sm   '>Select both<strong> Date</strong> and<strong> Conference Room</strong></span>
                    </div>}
                </div>
                <>
                    {!prev_booked_list.isLoading ? <div className='w-[100vw]'>
                        <div className='mb-4'>
                            <span className='text-2xl'>Timing Schedule</span>
                        </div>
                        <div className='max-h-[45rem] overflow-y-scroll '>
                            {!prev_booked_list.isLoading &&
                                value.map((x, i) => {
                                    if ([..._flag].includes(x)) {
                                        return (
                                            <div key={i} className='w-[100%]'>
                                                {getMeetingInfo(x) && <div className='pt-4'></div>}
                                                <div className='p-[1rem] bg-gray-100 cursor-not-allowed flex justify-between '>
                                                    <span className='text-sm mt-2'>{x}</span>
                                                    {getMeetingInfo(x) && <div style={{
                                                        borderLeft: "5px solid rgba(255, 0, 0,0.9)",
                                                        background: "rgba(255, 0, 0,0.1)",
                                                    }} className='p-1 w-[94%] '>
                                                        <div className='font-bold '>{getMeetingInfo(x)}</div>
                                                    </div>}
                                                </div>
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={i} className='w-[100%] hover:bg-red-100 cursor-pointer' onClick={handleDilogBox}>
                                                <Divider orientation='horizontal' />
                                                <p className='p-[1rem] text-sm font-medium' onClick={() =>
                                                    setConfTemp({ ...confTemp, conf_room_start_time: x })}
                                                    key={i}>{x}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                            <Divider orientation='horizontal' />
                            <TemporaryDrawer body={<ConferenceBooking fetchData={fetchData} />} />
                        </div>
                    </div>
                        : <div>
                            <LoadingSpinner />
                        </div>
                    }
                </>
            </div>
        </div>
    )


}



const CustomAutoCompleteWithIcon = ({ register, errors, name, label, obj, control, options }) => {
    const { confTemp, setConfTemp } = useContext(AppContext)
    return (
        <Autocomplete
            className='w-full'
            disablePortal
            id="combo-box-demo"
            value={options && options[0].conf}
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
    const { drawerStatus, setDrawerStatus } = useContext(AppContext)

    const list = (anchor) => (
        <Box
            role="presentation"
        >
            <div className='flex gap-5 ml-5'>
                <ButtonComponent icon={<IoMdArrowBack color='white' size={"15"} />} btnName={"Back"} onClick={() => setDrawerStatus(false)} />
                <span className='text-3xl mt-5'>Book a Conference</span>
            </div>
            {body}
            {/* <div className='absolute right-0 bottom-0 p-6 lg:hidden xl:block' >
                <img loading='lazy' width={"300px"} src={IMAGES.conf_img_i} />
            </div> */}
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={"right"}
                        open={drawerStatus}
                        onClose={() => setDrawerStatus(false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}