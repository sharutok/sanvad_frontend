import {
    Box, Button, TextField, Radio, Autocomplete, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText
} from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { User } from 'tabler-icons-react';
import { yupResolver } from '@hookform/resolvers/yup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ConferenceErrorSchema } from '../../Form Error Schema/ConferenceErrorSchema';
import '../../../Style/ConferenceBooking.css'
import BackArrow from '../../Helper Components/SideComponent';
import dayjs from 'dayjs';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../../App';
import { useMutation, useQueries } from '@tanstack/react-query';
import { api } from '../../Helper Components/Api';
import { FaBeer } from 'react-icons/fa';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import LoadingSpinner from '../../Helper Components/LoadingSpinner';



function ConferenceBooking({ fetchData }) {
    const { momentTime, setSnackBarPopUp, setDialogStatus, usermanagement, setUsermanagement, btnSaving, setBtnSaving, confTemp, setConfTemp, disabledOptions, setDisabledOptions } = useContext(AppContext)
    const ErrorSchema = ConferenceErrorSchema
    const mutation = useMutation(fetchData);
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })

    const onSubmit = async (data) => {
        try {
            const _data = {
                ...data,
                conf_room: confTemp.conf_room,
                start_date_time: `${moment(confTemp.conf_room_start_date, "DD/MM/YYYY").format("YYYY-MM-DD")} ${confTemp.conf_room_start_time}`,
                end_date_time: `${moment(confTemp.conf_room_start_date, "DD/MM/YYYY").format("YYYY-MM-DD")} ${getValues("end_date_time")}`,
                conf_by: 15681
            }
            const response = await axios.post(api.conference_booking.create, _data)
            if (response.data.status === 200) {
                mutation.mutateAsync()
                // setBtnSaving(true)
                // setSnackBarPopUp({ state: true, message: "Booked Conference" })
                // if (mutation.isLoading) {
                //     setDialogStatus(false)
                //     setBtnSaving(false)
                // }
                // if (mutation.isError) { console.log("error in mutation"); }
                // setTimeout(() => {
                //     setSnackBarPopUp({ state: false, message: "" })
                // }, 2000)
            }
        } catch (error) {
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

    return (
        <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-5'>
                <div className='grid grid-cols-1 gap-5'>
                    <TextField className="w-full" defaultValue={confTemp.conf_room} label="Conference Name*" size={"small"} disabled />
                    <TextField fullWidth multiline={true} rows={2} className='textfield' label="Meeting About*" size={"small"} {...register('meeting_about')} error={errors.about} helperText={errors.about && errors.about.message} />
                </div>
                <div className='flex gap-4'>
                    <CustomDate label={"End Date*"} name={"end_date"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomAutoComplete control={control} errors={errors} name={"end_date_time"} label={"End Time"} options={[...momentTime]} />
                </div>
                <TextField fullWidth className='w-max' defaultValue={`${confTemp.conf_room_start_date} ${confTemp.conf_room_start_time}`} label="Start Date Time*" size={"small"} disabled />
                <div className='w-fit' >
                    <LoadingButtonWithSnack beforeName={"Book Conference"} afterName={"Booking..."} />
                </div>
            </div>
        </form >
    )
}

export default ConferenceBooking


const CustomDateTime = ({ register, name, label, errors, control, watch, disabled }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    disabled={disabled || false}
                    inputFormat='DD/MM/YYYY'
                    format='DD/MM/YYYY hh:mm A'
                    timeSteps={{ minutes: 15 }}
                    slotProps={{
                        textField:
                        {
                            size: 'small',
                            helperText: errors[name] && errors[name].message,
                            error: !!errors[name]
                        },
                    }}
                    {...register(name)}
                    label={label}
                    value={dayjs(watch(name))}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </LocalizationProvider>
        )}
            name={name}
            control={control}
            rules={{ required: true }}
        />
    )
}
const CustomAutoComplete = ({ name, label, options, control, errors }) => {
    const { disabledOptions } = useContext(AppContext)
    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    isOptionEqualToValue={(option, value) => (
                        option.conf === value.conf && option.no === value.no
                    )}
                    getOptionDisabled={(option) => disabledOptions.includes(option)}
                    key={name}
                    className="textfield"
                    disablePortal
                    id="combo-box-demo"
                    {...field}
                    options={options}

                    renderInput={(params) => (
                        <TextField
                            key={name}
                            {...params}
                            size={"small"}
                            label={label}
                            variant="outlined"
                            error={errors[name]} helperText={errors[name] && errors[name].message}
                        />
                    )}
                    onChange={(e, selectedValue) => {
                        field.onChange(selectedValue);
                    }}
                />
            )}
        />

    )
}
const CustomDate = ({ register, name, label, errors, control, watch }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    inputFormat='DD/MM/YYYY'
                    slotProps={{
                        textField:
                        {
                            size: 'small',
                            helperText: errors[name] && errors[name].message,
                            error: !!errors[name]
                        },
                    }}
                    {...register(name)}
                    label={label}
                    value={dayjs(watch(name))}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </LocalizationProvider>
        )}
            name={name}
            control={control}
            rules={{ required: true }}
        />
    )
}