import {
    Box, Button, TextField, Radio, Autocomplete, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText
} from '@mui/material'
import React, { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { User } from 'tabler-icons-react';
import { yupResolver } from '@hookform/resolvers/yup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ConferenceErrorSchema } from '../Form Error Schema/ConferenceErrorSchema';
import '../../Style/ConferenceBooking.css'
import BackArrow from '../Helper Components/SideComponent';
import dayjs from 'dayjs';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../App';

const conferences = [
    { conf: 'Mula', no: "08" },
    { conf: 'Mutha', no: "08" },
    { conf: 'Ganga', no: "10" },
    { conf: 'Indrayani', no: "18" },
]

function ConferenceBooking() {
    const { usermanagement, setUsermanagement, btnSaving, setBtnSaving } = useContext(AppContext)
    const ErrorSchema = ConferenceErrorSchema

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })


    const onSubmit = (data) => {
        console.clear()
        console.log(data);
        const _data = { ...data, start_date_time: moment(data.start_date_time.$d).format("YYYY-MM-DD hh:mm A"), end_date_time: moment(data.end_date_time.$d).format("YYYY-MM-DD hh:mm A") }
        console.log(_data);
        console.log(Date.parse(_data.start_date_time), Date.parse(_data.end_date_time), _data.start_date_time, _data.end_date_time, Date.parse(_data.start_date_time) < Date.parse(_data.end_date_time));

    }
    return (
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
            <BackArrow location={"/conference/booking/list"} title={"Conference Booking - Book a New Conference"} />
            <div className='conf-book-component '>
                <div className='conf_book-container'>
                    <TextField multiline={true} rows={2} className='textfield' label="Meeting About*" size={"small"} {...register('about')} error={errors.about} helperText={errors.about && errors.about.message} />
                    <Controller
                        render={({ field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                        }) => (
                            <FormControl error={!!errors.occupancy}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Occupancy</FormLabel>
                                <RadioGroup
                                    {...register('occupancy')}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}>
                                    <FormControlLabel value="0" control={<Radio size='small' />} label="< 2" />
                                    <FormControlLabel value="1" control={<Radio size='small' />} label="< 5" />
                                    <FormControlLabel value="2" control={<Radio size='small' />} label="< 7" />
                                    <FormControlLabel value="3" control={<Radio size='small' />} label="All" />
                                </RadioGroup>
                                <FormHelperText>{errors.occupancy && errors.occupancy.message}</FormHelperText>
                            </FormControl>
                        )}
                        name="occupancy"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
                <div className='conf_book-container'>
                    <CustomDateTime label={"Start Date Time*"} name={"start_date_time"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomDateTime label={"End Date Time*"} name={"end_date_time"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomAutoCompleteWithIcon name={"conf_room"} label={"Conference Room*"} control={control} obj={conferences} register={register} errors={errors} />
                </div>
            </div>
            <Box className="conf-book-button" >
                <LoadingButton
                    fullWidth
                    size="small"
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={btnSaving}
                    loadingPosition="start"
                >
                    <span className='p-1'>Submit</span>
                </LoadingButton>
            </Box>
        </form>
    )
}

export default ConferenceBooking

const CustomAutoCompleteWithIcon = ({ register, errors, name, label, obj, control }) => {
    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    className='textfield'
                    disablePortal
                    id="combo-box-demo"
                    options={conferences}
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
                        field.onChange(selectedValue.conf);
                    }}
                    renderInput={(params) => <TextField
                        key={name}
                        {...params}
                        size={"small"}
                        label={label}
                        variant="outlined"
                        error={errors[name]} helperText={errors[name] && errors[name].message}
                    />
                    }

                />
            )}
        />

    )
}

const CustomDateTime = ({ register, name, label, errors, control, watch }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
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