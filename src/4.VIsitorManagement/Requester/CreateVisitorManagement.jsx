import React, { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, Divider, IconButton
} from '@mui/material'
import '../../../Style/VisitManagement.css'
import { VisitorMangErrorSchema } from '../../Form Error Schema/VisitorMangErrorSchema';
import BackArrow from '../../Helper Components/SideComponent';
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { AppContext } from '../../App';
import Table from '../../Helper Components/Table';
import TipTool from '../../Helper Components/TipTool';
import { MdDeleteOutline, MdRefresh } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { api } from '../../Helper Components/Api';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import IMAGES from '../../assets/Image/Image';
import { getCookies } from '../../Helper Components/CustomCookies';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import * as yup from 'yup'

export default function CreateVisitorMangement() {
    const ErrorSchema = VisitorMangErrorSchema
    const { setDialogStatus, dialogStatus, visitors, setVisitors, setBtnSaving, setSnackBarPopUp, btnSaving } = useContext(AppContext)
    const [tktFiles, setTKTFiles] = useState([])
    const [validError, setValidError] = useState("")
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(VisitorMangErrorSchema),
        defaultValues: {
            start_date_time: "",
            end_date_time: ""
        }
    })

    const onSubmit = async (data) => {
        data["visitors"] = visitors
        if (visitors.length >= 1) {
            data["start_date_time"] = moment(getValues("start_date_time")["$d"]).format()
            data["end_date_time"] = moment(getValues("end_date_time")["$d"]).format()
            data["raised_by"] = getCookies()[0]
            const response = await axios.post(api.visitor_management.create, data)
            if (response.data.status == 200) {
                setBtnSaving(true)
                setSnackBarPopUp({ state: true, message: "Created Visitor Pass", severity: "s" })
                window.history.back()
            }
        }
        else {
            return setSnackBarPopUp({ state: true, message: "Add Atlest 1 visitor Details", severity: 'e' })
        }
    }

    let obj = {}

    async function handleAddVisitor() {
        try {
            ["v_name", "v_mobile_no", "v_desig", "v_asset"].map((val) => {
                obj[val] = getValues(val)
                return
            })
            let logs = []

            Object.values(obj).map(x => {
                logs.push(x)
            })

            const jsonDataSchema = yup.object({
                v_name: yup.string().required("All Fields Required").max(20),
                v_mobile_no: yup.string().required('All Fields Required').matches(/^[0-9]+$/, 'Mobile No must be numbers only').test('len', 'Mobile No must be exactly 10 characters', val => val && val.length === 10),
                v_desig: yup.string().required("All Fields Required"),
                // v_asset: yup.string().required("All Fields Required"),

            });

            try {
                // Validate the JSON data against the schema
                const resp = await jsonDataSchema.validate(obj)
                // console.log(resp);
                if (Object.keys(errors).map(x => { return x }).length == 0 && !logs.includes("")) {
                    setVisitors([...visitors, obj]), clearAll(), setValidError("")
                }
            }
            catch (error) {
                console.log(error.errors);
                setValidError(error.errors[0])
            }

        }
        catch (error) {
            console.log("error", error);
        }
    }

    const deleteFiles = (g) => {
        let arr = visitors.filter(function (item) {
            return item.v_name !== g
        })
        setVisitors((visitors) => {
            return [...arr]
        })
    }

    function clearAll() {
        ["v_name", "v_mobile_no", "v_desig", "v_asset"].map((val) => {
            setValue(val, "")
        })

    }

    return (
        <div className='mt-20'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <BackArrow location={"/vistors/management/list"} title={"Visitor's Management - New Application"} />
                    <div className='grid gap-10 p-10'>
                        <div className='grid gap-5 '>
                            <div className='flex flex-wrap gap-5 '>
                                <CustomDateTime register={register} name={"start_date_time"} label={"Start Date Time"} errors={errors} control={control} watch={watch} />
                                <CustomEndDateTime getValues={getValues} register={register} name={"end_date_time"} label={"End Date Time"} errors={errors} control={control} watch={watch} />
                                <CustomTextField errors={errors} register={register} watch={watch} name="v_company" label="Visitor's Company*" />
                                <CustomTextField errors={errors} register={register} watch={watch} name="more_info" label="Visitor's Company Contact Info" />
                                <CustomTextField errors={errors} register={register} watch={watch} name="veh_no" label="Visitor's Vehicle No" />
                                <CustomTextField multiline={4} errors={errors} register={register} watch={watch} name="reason_for_visit" label="Visitor's Reason For Visit" />
                                <div >
                                    <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                                        <FormControl error={!!errors.ppe}>
                                            <FormLabel id="demo-row-radio-buttons-group-label"><span className='text-[black]'>Safety Shoes and Helmet required is only applicable for POWERGEN and FPED</span></FormLabel>
                                            <RadioGroup
                                                defaultValue="1"
                                                {...register('ppe')}
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}>
                                                <FormControlLabel value="0" control={<Radio size='small' />} label="Yes" />
                                                <FormControlLabel value="1" control={<Radio size='small' />} label="No" />
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
                        </div>
                        <div className='grid gap-5'>
                            <Divider textAlign='left'></Divider>
                            <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Add Visitors"}</span>
                            {validError && <span className='text-[#ff3838]'>{validError}</span>}
                            <div className='w-fit'>
                                <div className='w-fit flex'>
                                    <div className='flex flex-wrap gap-5 '>
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_name" label="Visitor's Name*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_mobile_no" label="Visitor's Mobile No*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_desig" label="Visitor's Designation*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_asset" label="Visitor's Assets*" />
                                        <ButtonComponent onClick={() => handleAddVisitor()} btnName={"Add Visitor"} icon={<AiOutlineUserAdd color='white' size={"23"} />} />
                                        <ButtonComponent onClick={clearAll} icon={<MdRefresh color='white' size={"23"} />} btnName={"Clear All"} />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-5'>
                            <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Visitors List"}</span>
                            <VisitorListing deleteFiles={deleteFiles} />
                        </div>
                    </div>
                </div>
                <div className='p-10'>
                    <LoadingButtonWithSnack beforeName={"Create Pass"} afterName={"Create...."} />
                </div>
            </form>
            {/* <div className='absolute right-0 bottom-0 p-6 lg:hidden xl:block' >
                <img className='w-[20rem]' loading='lazy' src={IMAGES.vistor_manage_i} />
            </div> */}
        </div>
    )
}

const CustomTextField = ({ name, label, errors, register, watch, multiline }) => {
    return (
        <TextField
            sx={{ width: "20rem" }}
            multiline={multiline ? true : false}
            rows={multiline}
            key={label}
            value={watch(name)}
            label={label}
            size={"small"}
            {...register(name)}
            error={!!errors[name]}
            helperText={errors[name] && errors[name].message} />
    )
}
const CustomTextFieldMobileNo = ({ name, label, errors, register, watch, multiline }) => {
    return (
        <TextField
            onChange={() => console.log("fff")}
            sx={{ width: "20rem" }}
            multiline={multiline ? true : false}
            rows={multiline}
            key={label}
            value={watch(name)}
            label={label}
            size={"small"}
            {...register(name)}
            error={!!errors[name]}
            helperText={errors[name] && errors[name].message} />
    )
}

const CustomDateTime = ({ register, name, label, errors, control, watch, disabled }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    minDate={dayjs(moment().format("YYYY-MM-DD"))}
                    disabled={disabled || false}
                    sx={{ width: "20rem" }}
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

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='whitespace-nowrap no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}

const VisitorListing = ({ deleteFiles }) => {
    const { visitors, setVisitors } = useContext(AppContext)
    const thead = ["Visitor's Name", "Visitor's Mob.No", "Visitor's Department", "Assets"]

    return (<div className='w-fit'>
        <Table thead={thead}
            tbody={visitors?.map((g, i) => {
                return (
                    <tr className='table-wrapper' key={i}>
                        <td>{g.v_name}</td>
                        <td>{g.v_mobile_no}</td>
                        <td>{g.v_desig}</td>
                        <td>{g.v_asset}</td>
                        <td onClick={() => deleteFiles(g.v_name)} className='delete'>
                            <TipTool body={< >
                                <IconButton>
                                    <MdDeleteOutline color='#f08080' size={22} />
                                </IconButton>
                            </>} title={"Delete"} />
                        </td>
                    </tr>
                )
            })} />
    </div>)
}

function CustomEndDateTime({ register, name, label, errors, control, watch, disabled, getValues }) {
    return (

        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    disabled={!getValues('start_date_time') ? true : false}
                    minDateTime={dayjs(getValues('start_date_time'))}
                    sx={{ width: "20rem" }}
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
