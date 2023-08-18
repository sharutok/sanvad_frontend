import { useParams } from 'react-router-dom'
import { api } from '../Helper Components/Api';
import axios from 'axios'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LoadingSpinner from '../Helper Components/LoadingSpinner';
import moment from 'moment';

import dayjs from 'dayjs';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { CloudUpload } from 'tabler-icons-react';
import {
    styled, Stack, Typography, Card, CardContent, TextField, Divider, Button, Autocomplete, InputAdornment
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
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Input = styled('input')({
    display: 'none',
});

export default function Form() {
    const { id } = useParams()
    // const FormData = new FormData()
    const ErrorSchema = CapexErrorSchema
    const inputFile = useRef(null)
    const [preFilled, setPreFilled] = useState(true)
    const [uploadFIle, setUploadFile] = useState([])

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {
            requisition_date: "",
            site_delivery_date: "",
            installation_date: ""
        }
    })

    const onSubmit = async (submit) => {
        const data = ({
            ...submit,
            capex_id: id,
            requisition_date: moment(submit.requisition_date.$d).format("YYYY-MM-DD"),
            site_delivery_date: moment(submit.site_delivery_date.$d).format("YYYY-MM-DD"),
            installation_date: moment(submit.installation_date.$d).format("YYYY-MM-DD"),
        });
        console.log({ upload_file: uploadFIle });
        // const res = await axios.post(api.capex.create, data)
        // console.log(res.data);
    }
    const onButtonClick = () => {
        inputFile.current.click();
    };

    return (
        <div>
            <BackArrow location={"/capex/list"} title={"Capex Form"} />
            <div>
                <BudgetBar />
            </div>
            <span className='hr'></span>
            <div className='w-fit p-4'>
                <Button onClick={() => setPreFilled(!preFilled)} endIcon={preFilled ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />} fullWidth color="primary" variant="contained" type="submit">{preFilled ? "View More" : "View Less"}</Button>
            </div>
            <div className={`${preFilled && "hidden transition-opacity duration-[600ms]"}`}>
                <PreFilledSubForm />
                <span className='hr'></span>
            </div>
            <form className='flex flex-wrap gap-5 p-4' onSubmit={handleSubmit(onSubmit)}>
                <CustomTextField label={"Nature Of Requirement"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                <CustomTextField label={"Purpose"} name={"purpose"} errors={errors} register={register} watch={watch} />
                <CustomDate label={"Requisition Date*"} name={"requisition_date"} errors={errors} control={control} watch={watch} register={register} />
                <CustomAutoComplete control={control} errors={errors} label={"Payback Period"} name={"payback_period"} options={['0', "1", "2", "3", "4"]} />
                <CustomAutoComplete control={control} errors={errors} label={"Return On Investment"} name={"return_on_investment"} options={['0', "1", "2", "3", "4"]} />
                <CustomAutoComplete control={control} errors={errors} label={"Budget Type"} name={"budget_type"} options={['0', "1", "2", "3", "4"]} />
                <CustomTextField label={"Total Cost"} name={"total_cost"} errors={errors} register={register} watch={watch} />
                <CustomDate label={"Site Delivery Date*"} name={"site_delivery_date"} errors={errors} control={control} watch={watch} register={register} />
                <CustomDate label={"Installation Date*"} name={"installation_date"} errors={errors} control={control} watch={watch} register={register} />
                <div className='grid gap-5'>
                    <div className='flex flex-wrap gap-5'>
                        <CustomTextField multiline={true} label={"Functional Utility/Performance"} name={"comment1"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Brief Description of Assets"} name={"comment2"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Supplier's Name with Address"} name={"comment3"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Key User"} name={"comment4"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"Additional Note"} name={"comment5"} errors={errors} register={register} watch={watch} />
                        <CustomTextField multiline={true} label={"LD Clause"} name={"comment6"} errors={errors} register={register} watch={watch} />
                    </div>
                    <span className='hr'></span>
                    <div className='grid grid-cols-[repeat(2,20rem)] gap-4'>
                        <CustomTextField rows={4} multiline={true} label={"Short Attachment Description"} name={"comment7"} errors={errors} register={register} watch={watch} />
                        <div >
                            <Card onClick={onButtonClick} className="ts-card" style={{ cursor: "pointer" }} >
                                <CardContent  >
                                    <Typography className="ts-card-typo" sx={{ fontSize: 12 }} >
                                        <CloudUpload
                                            size={35}
                                            strokeWidth={2}
                                            color={'grey'}
                                        />
                                    </Typography>
                                    <Typography className="ts-card-typo" variant="h5" component="div">
                                        <Stack direction="row" alignItems="center">
                                            <label htmlFor="contained-button-file">
                                                <Input onChange={(e) => setUploadFile(e.target.files)} accept="image/jpeg,image/png,application/pdf" type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                                                <Typography sx={{ fontWeight: "bold" }} className="ts-card-typo abs" variant="body2">
                                                    Upload files
                                                </Typography>
                                            </label>
                                        </Stack>
                                    </Typography>
                                    <Typography sx={{ fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
                                        Upload files that are less than 30mb in size.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className='w-fit p-4'>
                    <Button fullWidth color="primary" variant="contained" type="submit">Create Capex</Button>
                </div>
            </form>
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
const CustomTextField = ({ name, label, errors, register, watch, multiline, rows }) => {
    return (
        <TextField multiline={multiline || false} rows={rows || 2} key={label} className="textfield" value={watch(name)} label={label} size={"small"}  {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
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































