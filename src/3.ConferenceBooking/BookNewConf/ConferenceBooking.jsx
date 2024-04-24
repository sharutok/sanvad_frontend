import {
    Box, Button, TextField, Radio, Autocomplete,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ConferenceErrorSchema } from '../../Form Error Schema/ConferenceErrorSchema';
import dayjs from 'dayjs';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../../App';
import { useMutation, useQueries } from '@tanstack/react-query';
import { api } from '../../Helper Components/Api';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import { getCookies } from '../../Helper Components/CustomCookies';



function ConferenceBooking({ fetchData }) {

    const { momentTime, setSnackBarPopUp, setBtnSaving, confTemp, disabledOptions, setDisabledOptions } = useContext(AppContext)
    const ErrorSchema = ConferenceErrorSchema
    const [data, setData] = useState({
        end_date: "",
        start_date: confTemp.conf_room_start_date,
        end_time: "",
        start_time: confTemp.conf_room_start_time,
        conf_room: confTemp.conf_room,

    })

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const _data = {
                ...data, conf_room: confTemp.conf_room,
                start_date_time: `${moment(data.start_date, "DD/MM/YYYY").format("YYYY-MM-DD")} ${data.start_time}`,
                end_date_time: `${moment(data.end_date || data.start_date, "DD/MM/YYYY").format("YYYY-MM-DD")} ${data.end_time}`,
                conf_by: getCookies()[0]
            }
            setBtnSaving(true)
            const response = await axios.post(api.conference_booking.create, _data)
            if (response.data.status === 200) {
                setSnackBarPopUp({ state: true, message: "Booked Conference", severity: "s" })
                window.location.href = "/conference/booking/list"
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "" })
                }, 1000)
            }
        } catch (error) {
            setBtnSaving(false)
            console.log(error);
        }
    }


    function blockTime() {
        let flag = []
        const rev_count_val = momentTime.indexOf(confTemp.conf_room_start_time)
        for (let i = rev_count_val; i >= 0; i--) {
            flag.push(moment("06/23/2023 08:00").add(15 * (i), 'minute').format("hh:mm A"))
        }
        setDisabledOptions([...disabledOptions, ...flag])
    }

    useEffect(() => {
        blockTime()
    }, [])

    function handleClickE(e) {
        e.preventDefault()
    }

    return (
        <form className='p-10' onSubmit={onSubmit}>
            <div className='grid grid-cols-1 gap-5'>
                <div className='grid grid-cols-1 gap-5'>
                    <TextField className="w-full" defaultValue={confTemp.conf_room} label="Conference Name*" size={"small"} disabled />
                    <TextField inputProps={{ maxLength: 40 }} value={data.meeting_about} onChange={(e) => setData({ ...data, meeting_about: e.target.value })} fullWidth multiline={true} rows={2} className='textfield' label="About Meeting " size={"small"} required />
                </div>
                <TextField name='start_date' fullWidth className='w-max' defaultValue={`${confTemp.conf_room_start_date} ${confTemp.conf_room_start_time}`} label="Start Date Time*" size={"small"} disabled />
                <div className='flex gap-4'>
                    <CustomDate label={"End Date"} name={"end_date"} data={data} setData={setData} />
                    <CustomAutoComplete name={"end_time"} label={"End Time"} options={[...momentTime]} data={data} setData={setData} confTemp={confTemp} />
                </div>
            </div>
            <div className='w-fit' >
                <LoadingButtonWithSnack beforeName={"Book Conference"} afterName={"Booking..."} />
            </div>
        </ form>
    )
}

export default ConferenceBooking




const CustomAutoComplete = ({ name, label, options, data, setData }) => {
    const { disabledOptions } = useContext(AppContext)
    return (
        <Autocomplete
            isOptionEqualToValue={(option, value) => (
                option.conf === value.conf && option.no === value.no
            )}
            getOptionDisabled={(option) => disabledOptions.includes(option)}
            key={name}
            className="textfield"
            disablePortal
            id="combo-box-demo"
            options={options}
            value={data.end_time}

            renderInput={(params) => (
                <TextField
                    key={name}
                    {...params}
                    size={"small"}
                    label={label}
                    variant="outlined"
                    required
                />
            )}
            onChange={(event, newValue) => {
                setData({ ...data, end_time: newValue })
            }}
        />

    )
}
const CustomDate = ({ name, label, data, setData }) => {
    const { confTemp, setConfTemp, } = useContext(AppContext)
    // console.log(dayjs(moment(confTemp.conf_room_start_date).format("YYYY-MM-DD")));
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                defaultValue={dayjs(confTemp.conf_room_start_date ? moment(confTemp.conf_room_start_date, "DD/MM/YYYY").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"))}
                minDate={dayjs(moment().format())}
                reduceAnimations
                slotProps={{
                    textField:
                    {
                        required: true,
                        format: 'DD/MM/YYYY',
                        size: 'small',
                    },
                }}
                label={label}
                onChange={(a) => {
                    setData({ ...data, end_date: a.$d })
                }}
            />
        </LocalizationProvider>
    )
}