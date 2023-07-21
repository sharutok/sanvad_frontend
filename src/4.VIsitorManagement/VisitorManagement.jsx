import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import '../../Style/VisitManagement.css'
import { VisitorMangErrorSchema } from '../Form Error Schema/VisitorMangErrorSchema';
import BackArrow from '../Helper Components/SideComponent';

function VisitorMangement() {
    const ErrorSchema = VisitorMangErrorSchema
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <BackArrow title={"Visitor's Management"} />
                <div className='vm-guest-container'>

                    <TextField label="Person In-Charge*" disabled size={"small"}></TextField>
                    <TextField label="Department*" disabled size={"small"}></TextField>
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
                                    label="End Date-Time"
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
                </div>
                <div className='vm-guest-container'>
                    <TextField label="Visitor's Name*" size={"small"} {...register('g_name')} error={!!errors.g_name} helperText={errors.g_name && errors.g_name.message} ></TextField>
                    <TextField label="Visitor's Company*" size={"small"} {...register('g_company')} error={!!errors.g_company} helperText={errors.g_company && errors.g_company.message} ></TextField>
                    <TextField label="Visitor's Mobile No*" size={"small"} {...register('g_mobile_no')} error={!!errors.g_mobile_no} helperText={errors.g_mobile_no && errors.g_mobile_no.message} ></TextField>
                    <TextField label="Visitor's Designation*" size={"small"} {...register('g_desig')} error={!!errors.g_desig} helperText={errors.g_desig && errors.g_desig.message} ></TextField>
                    <TextField label="Visitor's Vehicle No*" size={"small"} {...register('veh_no')} error={!!errors.veh_no} helperText={errors.veh_no && errors.veh_no.message} ></TextField>
                    <TextField label="Visitor's Contact Info*" size={"small"} {...register('more_info')} error={!!errors.more_info} helperText={errors.more_info && errors.more_info.message} ></TextField>
                    <TextField label="Visitor's Reason For Vist*" size={"small"}{...register('reason_for_visit')} error={!!errors.reason_for_visit} helperText={errors.reason_for_visit && errors.reason_for_visit.message} ></TextField>
                    <TextField label="Visitor's Assests*" size={"small"}{...register('g_asset')} error={!!errors.g_asset} helperText={errors.g_asset && errors.g_asset.message} ></TextField>
                </div>
                <span className='hr'></span>
                <div className='vm-guest-container'>
                    <div >
                        <FormGroup >
                            <FormLabel >Meals</FormLabel>
                            <div className='radio-btn'>
                                <FormControlLabel control={<Checkbox />} label="Breakfast" />
                                <FormControlLabel control={<Checkbox />} label="Lunch" />
                                <FormControlLabel control={<Checkbox />} label="Snacks" />
                            </div>
                        </FormGroup>
                    </div>
                    <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                        <FormControl error={!!errors.ppe}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Personal Protective Equipment</FormLabel>
                            <RadioGroup
                                {...register('ppe')}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={onChange}
                                onBlur={onBlur}
                                inputRef={ref}
                                value={value}>
                                <FormControlLabel value="0" control={<Radio size='small' />} label="Provided" />
                                <FormControlLabel value="1" control={<Radio size='small' />} label="Returned" />
                            </RadioGroup>
                            <FormHelperText>{errors.ppe && errors.ppe.message}</FormHelperText>
                        </FormControl>
                    )}
                        name="ppe"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
            </div>
            <div className='vm-button'>
                <Button fullWidth variant="contained" type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default VisitorMangement