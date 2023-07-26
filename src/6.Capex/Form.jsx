import { useParams } from 'react-router-dom'
import { api } from '../Helper Components/Api';
import axios from 'axios'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LoadingSpinner from '../Helper Components/LoadingSpinner';
import moment from 'moment';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react'
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, Checkbox
} from '@mui/material'
import { useForm, Controller, get } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../Style/UserManagement.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch';
import { AppContext } from '../App'
import BackArrow from '../Helper Components/SideComponent'
import { CapexErrorSchema } from '../Form Error Schema/CapexErrorSchema'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PreFilledSubForm from './PreFilledSubForm';
import BudgetBar from './BudgetBar';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Form() {
    const { id } = useParams()
    const ErrorSchema = CapexErrorSchema

    // const { } = useContext(AppContext)

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: []
    })

    const onSubmit = async (submit) => {

    }

    return (
        <div>
            <BackArrow location={"/capex/list"} title={"Capex Form"} />
            <div>
                <BudgetBar />
            </div>
            <span className='hr'></span>
            <div>
                <PreFilledSubForm />
            </div>
            <span className='hr'></span>
            {/* <form className='grid grid-cols-[repeat(6,1fr)] gap-4' onSubmit={handleSubmit(onSubmit)}> */}
            <form className='flex flex-wrap gap-5 p-4' onSubmit={handleSubmit(onSubmit)}>
                <CustomTextField label={"Nature Of Requirement"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                <CustomTextField label={"Purpose"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                {/* <CustomTextField label={"Plant"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} /> */}
                {/* <CustomTextField label={"Department"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} /> */}

                <CustomDate label={"Requisition Date*"} name={"requisition_date"} errors={errors} control={control} watch={watch} register={register} />
                {/* <CustomAutoComplete control={control} errors={errors} label={"Capex Group"} name={"nature_of_requirement"} options={['0', "1", "2", "3", "4"]} /> */}
                <CustomAutoComplete control={control} errors={errors} label={"Payback Period"} name={"nature_of_requirement"} options={['0', "1", "2", "3", "4"]} />
                <CustomAutoComplete control={control} errors={errors} label={"Return on Investment"} name={"nature_of_requirement"} options={['0', "1", "2", "3", "4"]} />
                <CustomAutoComplete control={control} errors={errors} label={"Budget Type"} name={"nature_of_requirement"} options={['0', "1", "2", "3", "4"]} />

                <CustomTextField label={"Total Cost"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                <CustomDate label={"Site Delivery Date*"} name={"requisition_date"} errors={errors} control={control} watch={watch} register={register} />
                <CustomDate label={"Installation Date*"} name={"requisition_date"} errors={errors} control={control} watch={watch} register={register} />
                <div className='grid gap-5'>
                    <div className='flex flex-wrap gap-5'>
                        <CustomTextField multiline={true} label={"Functional Utility/Performance"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Brief Description of Assets"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Supplier's Name with Address"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Key User"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Additional Note"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"LD Clause"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                    </div>
                    {/* <div className='flex flex-wrap gap-5'>
                        <CustomTextField multiline={true} label={"Key User"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Additional Note"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"LD Clause"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                    </div> */}
                    <span className='hr'></span>
                    <div className='flex flex-wrap gap-5'>
                        <CustomTextField multiline={true} label={"Short Attachment Description"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <Button variant="contained" >Attachment Documents</Button>
                    </div>
                </div>
            </form>
            <div className='w-fit p-4'>
                <Button fullWidth color="primary" variant="contained" type="submit">Create Capex</Button>
            </div>
        </div>
    )
}

const CustomAutoComplete = ({ name, label, options, control, errors }) => {
    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    isOptionEqualToValue={(option, value) => option.value === value.value}
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
const CustomTextField = ({ name, label, errors, register, watch, multiline }) => {
    return (
        <TextField multiline={multiline || false} rows={3} key={label} className="textfield" value={watch(name)} label={label} size={"small"}  {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
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































