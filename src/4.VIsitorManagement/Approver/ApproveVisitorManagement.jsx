import React, { useContext, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Divider } from '@mui/material'
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup'
import Avatar from '@mui/material/Avatar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { HiOutlineViewGrid } from "react-icons/hi";
import { CiBoxList } from "react-icons/ci";
import * as yup from 'yup'
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, IconButton,
} from '@mui/material'
import '../../../Style/VisitManagement.css'
import { ApproverVisitorMangErrorSchema, VisitorMangErrorSchema } from '../../Form Error Schema/VisitorMangErrorSchema';
import BackArrow from '../../Helper Components/SideComponent';
import { BsCamera } from 'react-icons/bs';
import { AppContext } from '../../App';
import Table from '../../Helper Components/Table';
import { MdDeleteOutline, MdRefresh } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import { saveAs } from 'file-saver';
import TipTool from '../../Helper Components/TipTool';
import { AiOutlineCamera } from 'react-icons/ai';
import CustomPrint from '../../Helper Components/Printer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../../Helper Components/Api';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import moment from 'moment';
import { getCookies } from '../../Helper Components/CustomCookies';
import BarSnack from '../../Helper Components/BarSnack';
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ErrorSchema = ApproverVisitorMangErrorSchema
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
};

export default function ApproveVisitorManagement() {
    const { setDialogStatus, dialogStatus, setVisitorPass, visitors, setVisitors, setBtnSaving, setSnackBarPopUp } = useContext(AppContext)
    const { id } = useParams()
    const webcamRef = useRef(null);
    const [validError, setValidError] = useState("")
    const [componentAccess, setComponentAccess] = useState({})
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {
            punch_in_date_time: "",
            punch_out_date_time: "",
            status: "",
            start_date_time: "",
            end_date_time: "",
            v_company: "",
            reason_for_visit: "",
            more_info: "",
            veh_no: "",
            ppe: "", name: "",
            department: ""
        }
    })

    const data = useQuery(["visitor-data"], async () => {
        const response = await axios.get(api.visitor_management.by_id + id + `?woosee=${getCookies()[0]}`)
        Object.entries(response?.data?.data[0]).map(x => {
            setValue(x[0], x[1])
        })
        setComponentAccess(response?.data?.view_access);
        setVisitorPass(response?.data?.data)
        setVisitors(JSON.parse(response?.data?.data[0]?.visitors))
        return data
    }
    )

    const visitor_pic_data = useQuery(["visitor-pic"], async () => {
        const data = await axios.get(`${api.visitor_management.get_image}/?id=${id}`)
        return data
    })

    const onSubmit = async (data) => {
        try {
            const _data = {
                ...data,
                end_date_time: moment(data['end_date_time'].$d || data['end_date_time']).format(),
                start_date_time: moment(data['start_date_time'].$d || data['start_date_time']).format(),
                visitors: JSON.stringify(visitors)
            }
            const response = await axios.put(api.visitor_management.by_id + id, _data)
            if (response.data.status_code === 200) {
                setBtnSaving(true)
                setSnackBarPopUp({ state: true, message: "Updated Pass", severity: "s" })
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "", severity: "s" })
                    // window.location.href = "/vistors/management/list"
                }, 2000)
            }

        } catch (error) {
            console.log(error)

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
                v_name: yup.string().required("Visitor's Name is Required").matches(/^[A-Za-z\s]+$/, "Visitor's Name should be Only alphabets").max(30),
                v_mobile_no: yup.string().required("Visitor's Mobile No is Required").matches(/^[0-9]+$/, 'Mobile No must be numbers only').test('len', "Visitor's Mobile No must be exactly 10 characters", val => val && val.length === 10),
                v_desig: yup.string().required("Visitor's designation is Required"),

            });

            try {
                // Validate the JSON data against the schema
                const resp = await jsonDataSchema.validate(obj)
                if (Object.keys(errors).map(x => { return x }).length == 0 && !logs.includes("")) {
                    setVisitors(() => [...visitors, obj]),
                        clearAll(),
                        setValidError("")
                }
            }
            catch (error) {
                console.log(error);
                setValidError(error.errors[0])
            }


        }
        catch (error) {
            console.log("error", error);
        }
    }


    const captureImage = async (image_name) => {
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            const data = await axios.post(api.visitor_management.save_image, { byteArray: imageSrc, image_name })
            if (data?.data.status_code === 200) {
                setSnackBarPopUp({ state: true, message: "Image Taken", severity: "s" })
                queryClient.invalidateQueries(['visitor-pic'])
            }

        } catch (error) {
            console.log("error in downloading image", error);
        }
    };

    async function handlePunch() {
        const punch_in_date_time = getValues('punch_in_date_time')
        const punch_out_date_time = getValues('punch_out_date_time')
        const data = {
            punch_in_date_time,
            punch_out_date_time, visitor_status: getValues('status')
        };
        try {
            const response = await axios.put(`${api.visitor_management.punch}/?id=${id}`, data)
            console.log(response.data.status_code);
            if (response.data.status_code === 200) {
                setSnackBarPopUp({ state: true, message: "Updated Pass", severity: "s" })
                queryClient.invalidateQueries(['visitor-data'])
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "", severity: "s" })
                }, 2000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    function clearAll() {
        ["v_name", "v_mobile_no", "v_desig", "v_asset"].map((val) => {
            setValue(val, "")
        })

    }

    if (data.isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <div className='flex justify-around mt-20'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <BarSnack />
                    <BackArrow location={"/vistors/management/list"} title={`Visitor Details`} />
                    <div className='grid gap-5 p-10'>
                        <div className='flex flex-wrap gap-5'>
                            <CustomTextField disabled={true} errors={errors} register={register} watch={watch} name="name" label="To whom visitor meet*" />
                            <CustomTextField disabled={true} errors={errors} register={register} watch={watch} name="department" label="Department" />
                            <CustomDateTime register={register} name={"start_date_time"} label={"Start Date Time"} errors={errors} control={control} watch={watch} />
                            <CustomEndDateTime getValues={getValues} register={register} name={"end_date_time"} label={"End Date Time"} errors={errors} control={control} watch={watch} />
                            <div className='grid grid-cols-[repeat(2,auto)] gap-5'>
                                <CustomTextField multiline={4} errors={errors} register={register} watch={watch} name="reason_for_visit" label="Visitor's Reason For Visit" />
                                <div className='flex flex-wrap gap-5'>
                                    <CustomTextField errors={errors} register={register} watch={watch} name="v_company" label="Visitor's Company*" />
                                    <CustomTextField errors={errors} register={register} watch={watch} name="more_info" label="Visitor's Contact Info*" />
                                    <CustomTextField errors={errors} register={register} watch={watch} name="veh_no" label="Visitor's Vehicle No*" />
                                </div>
                            </div>
                        </div>
                        <div >
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
                        {!componentAccess.camera_component && <div className='grid gap-5'>
                            <Divider textAlign='left'></Divider>
                            <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Add Visitors"}</span>
                            {validError && <span className='text-[#ff3838]'>{validError}</span>}
                            <div className='w-fit'>
                                <div className='w-fit flex'>
                                    <div className='flex flex-wrap gap-5 '>
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_name" label="Visitor's Name*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_mobile_no" label="Visitor's Mobile No*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_desig" label="Visitor's Designation*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_asset" label="Visitor's Assets" />
                                        <ButtonComponent onClick={() => handleAddVisitor()} btnName={"Add Visitor"} icon={<AiOutlineUserAdd color='white' size={"23"} />} />
                                        <ButtonComponent onClick={clearAll} icon={<MdRefresh color='white' size={"23"} />} btnName={"Clear All"} />
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className='grid gap-5 w-fit'>
                            <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Visitor List"}</span>
                            <VisitorListing visitorPhoto={visitor_pic_data?.data?.data?.data} componentAccess={componentAccess} captureImage={captureImage} visitors={visitors} />
                        </div>
                    </div>
                    <div className='w-fit p-10'>
                        <div className=' w-fit'>
                            <div className='flex gap-20'>
                                {componentAccess.camera_component && <div className=''>
                                    <div className='mt-5'>
                                        {componentAccess.punch_in && <Button onClick={() => { setValue("status", 1), setValue("punch_in_date_time", moment().format()), handlePunch() }} variant="contained" sx={{ width: "10rem", bgcolor: "orange" }}>Punch In</Button>}
                                    </div>
                                    <div className='mt-5'>
                                        {componentAccess.punch_out && <Button onClick={() => { setValue("status", 2), setValue("punch_out_date_time", moment().format()), handlePunch() }} variant="contained" sx={{ width: "10rem", bgcolor: "cornflowerblue" }}>Punch Out</Button>}
                                    </div>
                                </div>}
                                {componentAccess.camera_component && (componentAccess.punch_out && <div >
                                    <LoadingButtonWithSnack beforeName={"Update Pass"} afterName={"Updating..."} />
                                </div>)}
                                {componentAccess.camera_component && (componentAccess.punch_in && <div >
                                    <LoadingButtonWithSnack beforeName={"Update Pass"} afterName={"Updating..."} />
                                </div>)}
                                {!componentAccess.camera_component && (componentAccess.punch_in && <div >
                                    <LoadingButtonWithSnack beforeName={"Update Pass"} afterName={"Updating..."} />
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
                {componentAccess.print_component && <div className='mt-20 p-5 grid gap-5'>
                    <Divider />
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem] ml-5'>{"Visitor Pass Preview"}</span>
                    <div><CustomPrint /></div>
                </div>}
            </form>
            {componentAccess.camera_component && <div className='-scale-x-100'>
                <div className='grid gap-5 p-5 '>
                    <Webcam
                        className='rounded-md'
                        audio={false}
                        height={500}
                        screenshotFormat="image/jpeg"
                        width={1200}
                        videoConstraints={videoConstraints}
                        ref={webcamRef}
                    />
                </div>
            </div>}
        </div>
    )
}


const CustomTextField = ({ name, label, errors, register, watch, multiline, disabled }) => {
    return (
        <TextField
            disabled={disabled || false}
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

const CustomDateTime = ({ register, name, label, errors, control, watch, disabled, }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
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

const VisitorListing = ({ captureImage, visitors, componentAccess, visitorPhoto }) => {
    const [alignment, setAlignment] = React.useState(true);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const { id } = useParams()

    const thead = [
        "Visitor's Name",
        "Visitor's Mob.No",
        "Visitor's Designation",
        "Assets",
    ]

    return (<div className=''>
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value={true} aria-label="left aligned">
                <HiOutlineViewGrid size={28} />
            </ToggleButton>
            <ToggleButton value={false} aria-label="centered">
                <CiBoxList size={28} />
            </ToggleButton>
        </ToggleButtonGroup>
        <div className='mt-5'>
            {!alignment &&
                <Table thead={thead}
                    tbody={
                        visitors?.length && visitors?.map((g, i) => {
                            return (
                                <tr className='table-wrapper' key={i}>
                                    <td>{g.v_name}</td>
                                    <td>{g.v_mobile_no}</td>
                                    <td>{g.v_desig}</td>
                                    <td>{g.v_asset}</td>
                                    {visitorPhoto[i] && visitorPhoto[i]?.mod_image && <td className='delete'>{
                                        <Avatar src={visitorPhoto[i]?.mod_image} sx={{ width: 50, height: 50 }} />
                                    }
                                    </td>}
                                    {componentAccess.camera_component && (!visitorPhoto[i]?.mod_image &&
                                        <td onClick={() => { captureImage(`${id}__${i}`) }} className='delete '>
                                            <TipTool body={
                                                <IconButton>
                                                    <AiOutlineCamera color='#555259' size={22} />
                                                </IconButton>
                                            } title={"Click Photo"} />
                                        </td>)
                                    }

                                </tr>
                            )
                        })
                    }
                />}

            {alignment && <div className='flex flex-wrap gap-5'>
                {visitors?.length && visitors?.map((g, i) => {
                    return (
                        <div className='grid gap-2 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 rounded-lg  w-[15rem] h-[16rem]' key={i}>
                            <div>
                                {visitorPhoto[i] && visitorPhoto[i]?.mod_image &&
                                    <>{
                                        <img className='rounded-lg' src={visitorPhoto[i]?.mod_image} alt="" width={300} />
                                    }</>}
                                {componentAccess.camera_component && (!visitorPhoto[i]?.mod_image &&
                                    <div onClick={() => { captureImage(`${id}__${i}`) }} className='flex justify-center '>
                                        <div className='grid grid-cols-1' >
                                            <IconButton>
                                                <AiOutlineCamera color='#555259' size={70} />
                                            </IconButton>
                                            <b>Click Photo </b>
                                        </div>
                                    </div>)
                                }
                            </div>
                            <div className='grid grid-cols-1 '>
                                <span className='text-[1.2rem] text-[#555259]' style={{ fontFamily: "Brandon Grotesque" }} >{g.v_name}</span>
                                <span className='text-[.9rem] text-[#808285]'>{g.v_mobile_no}</span>
                                <span className='text-[.9rem] text-[#808285]'>{g.v_desig}</span>
                                <span className='text-[1.2rem] text-[#555259]' style={{ fontFamily: "Brandon Grotesque" }} >{g.v_asset}</span>
                            </div>

                        </div>
                    )
                })}
            </div>}
        </div>
    </div>)

}


function CustomEndDateTime({ register, name, label, errors, control, watch, disabled, getValues }) {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    disabled={disabled || false}
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