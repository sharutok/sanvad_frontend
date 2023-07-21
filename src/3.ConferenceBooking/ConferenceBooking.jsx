import {
    Box, Button, TextField, Radio, Autocomplete, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText
} from '@mui/material'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { User } from 'tabler-icons-react';
import { yupResolver } from '@hookform/resolvers/yup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ConferenceErrorSchema } from '../Form Error Schema/ConferenceErrorSchema';
import '../../Style/ConferenceBooking.css'
import BackArrow from '../Helper Components/SideComponent';
function ConferenceBooking() {

    const ErrorSchema = ConferenceErrorSchema

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })

    const conferences = [
        { no: '06', conf: 'Mulla', },
        { no: '06', conf: 'Mutta', },
        { no: '18', conf: 'Ganga', },]

    const onSubmit = (data) => {
        console.clear()
        console.log(data);
    }
    return (
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
            <BackArrow title={"Conference Booking"} />
            <div className='conf-book-component '>
                <div className='conf_book-container'>
                    <TextField className='textfield' label="Book By*" size={"small"} disabled />
                    <TextField className='textfield' label="Department*" size={"small"} disabled />
                    <TextField className='textfield' label="Plant Name*" size={"small"} disabled />
                </div>
                <div>
                    <span className='hr'></span>
                </div>
                <div className='conf_book-container'>
                    <Controller
                        defaultValue={() => { setValue("start_date_time", "") }}
                        render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    slotProps={{
                                        textField:
                                        {
                                            size: 'small',
                                            helperText: errors.start_date_time && errors.start_date_time.message,
                                            error: !!errors.start_date_time
                                        },

                                    }}
                                    {...register('start_date_time')}
                                    label="Start Date-Time"
                                    value={value}
                                    onChange={(newValue) => {
                                        onChange(new Date(newValue._d).toISOString())
                                        console.log(new Date(newValue._d).toISOString());
                                        setValue('start_date_time', new Date(newValue._d).toISOString())
                                    }}
                                    onBlur={onBlur}
                                    inputRef={ref}
                                />
                            </LocalizationProvider>
                        )}
                        name="start_date_time"
                        control={control}
                        rules={{ required: true }}
                    />
                    <Controller
                        defaultValue={() => { setValue("end_date_time", "") }}
                        render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    slotProps={{
                                        textField:
                                        {
                                            size: 'small',
                                            helperText: errors.end_date_time && errors.end_date_time.message,
                                            error: !!errors.end_date_time
                                        },

                                    }}
                                    {...register('end_date_time')}
                                    label="End Date-Time"
                                    value={value}
                                    onChange={(newValue) => {
                                        onChange(new Date(newValue._d).toISOString())
                                        console.log(new Date(newValue._d).toISOString());
                                        setValue('end_date_time', new Date(newValue._d).toISOString())
                                    }}
                                    onBlur={onBlur}
                                    inputRef={ref}
                                />
                            </LocalizationProvider>
                        )}
                        name="end_date_time"
                        control={control}
                        rules={{ required: true }}
                    />
                    <Autocomplete
                        className='textfield'
                        disablePortal
                        id="combo-box-demo"
                        options={conferences}
                        getOptionLabel={(option) => option.conf}
                        renderOption={(props, option) => (
                            <Box style={{ display: "flex", justifyContent: "space-between" }} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <div>
                                    {option.conf}
                                </div>
                                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                    <User />
                                    <div >
                                        {option.no}
                                    </div>
                                </Box>
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} label="Conference Room*" size={"small"} {...register('conf_room')} error={errors.conf_room} helperText={errors.conf_room && errors.conf_room.message} />}
                    />
                </div>
                <TextField className='textfield' label="Meeting About*" size={"small"} {...register('about')} error={errors.about} helperText={errors.about && errors.about.message} />
            </div>
            <Box className="conf-book-button" sx={{ mt: 2 }}>
                <Button fullWidth color="primary" variant="contained" type="submit">Submit</Button>
            </Box>
        </form>
    )
}

export default ConferenceBooking
