import React, { useContext, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DialogsBox from '../../Helper Components/DialogsBox'
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, IconButton,
} from '@mui/material'
import '../../../Style/VisitManagement.css'
import { VisitorMangErrorSchema } from '../../Form Error Schema/VisitorMangErrorSchema';
import BackArrow from '../../Helper Components/SideComponent';
import { BsCamera } from 'react-icons/bs';
import { AppContext } from '../../App';
import Table from '../../Helper Components/Table';
import { MdDeleteOutline } from 'react-icons/md';
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
import { forceDownload } from '../../Static/StaticValues';
const ErrorSchema = VisitorMangErrorSchema


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
};


export default function ApproveVisitorManagement() {
    const { setDialogStatus, dialogStatus, setVisitors, setBtnSaving, setSnackBarPopUp } = useContext(AppContext)
    const { id } = useParams()
    const webcamRef = useRef(null);
    const [componentAccess, setComponentAccess] = useState({})
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {
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
        setVisitors(response?.data?.data)
        return data
    },
        { staleTime: 30000 }
    )

    const visitor_pic_data = useQuery(["visitor-pic"], async () => {
        const data = await axios.get(`${api.visitor_management.get_image}/?id=${id}`)
        return data
    }, { staleTime: 30000 })

    const onSubmit = async (data) => {
        try {
            const _data = {
                ...data,
                end_date_time: moment(data['end_date_time'].$d || data['end_date_time']).format(),
                start_date_time: moment(data['start_date_time'].$d || data['start_date_time']).format(),
            }
            const response = await axios.put(api.visitor_management.by_id + id, _data)
            if (response.data.status_code === 200) {
                setBtnSaving(true)
                setSnackBarPopUp({ state: true, message: "Updated Pass", severity: "s" })
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "", severity: "s" })
                    window.location.href = "/vistors/management/list"
                }, 2000)
            }

        } catch (error) {
            console.log(error)

        }
    }
    function handleAddVisitor() {
        setDialogStatus(!dialogStatus)
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

    return (
        <div className='flex justify-around mt-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <BackArrow location={"/vistors/management/list"} title={`Visitor Details`} />
                    <div className='grid gap-5 p-10'>
                        <div className='flex flex-wrap gap-5'>
                            <CustomTextField disabled={true} errors={errors} register={register} watch={watch} name="name" label="To whom visitor meet*" />
                            <CustomTextField disabled={true} errors={errors} register={register} watch={watch} name="department" label="Department" />
                            <CustomDateTime register={register} name={"start_date_time"} label={"Start Date Time"} errors={errors} control={control} watch={watch} />
                            <CustomDateTime register={register} name={"end_date_time"} label={"End Date Time"} errors={errors} control={control} watch={watch} />
                            <div className='grid grid-cols-[repeat(2,auto)] gap-5'>
                                <div className='grid grid-cols-[repeat(2,1fr)] gap-5'>
                                    <CustomTextField errors={errors} register={register} watch={watch} name="v_company" label="Visitor's Company*" />
                                    <CustomTextField errors={errors} register={register} watch={watch} name="more_info" label="Visitor's Contact Info*" />
                                    <CustomTextField errors={errors} register={register} watch={watch} name="veh_no" label="Visitor's Vehicle No*" />
                                </div>
                                <CustomTextField multiline={4} errors={errors} register={register} watch={watch} name="reason_for_visit" label="Visitor's Reason For Visit" />
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
                        <div className='flex justify-start'>
                            <VisitorListing visitorPhoto={visitor_pic_data?.data?.data?.data} componentAccess={componentAccess} captureImage={captureImage} visitors={getValues("visitors") && JSON.parse(getValues("visitors"))} />
                        </div>
                    </div>
                    <div className='vm-button ml-5'>
                        <LoadingButtonWithSnack beforeName={"Update Pass"} afterName={"Updating..."} />
                    </div>
                </div>
                {componentAccess.print_component && <div className='mt-20 p-5'>
                    <span className='ml-5 text-3xl flex justify-left'>VISITOR PASS Preview</span>
                    <div><CustomPrint /></div>
                </div>}
            </form>
            {componentAccess.camera_component && <div className='-scale-x-100'>
                <div className='grid gap-5 p-5 '>
                    <Webcam
                        className='rounded-md'
                        audio={false}
                        height={400}
                        screenshotFormat="image/jpeg"
                        width={700}
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
                    inputFormat='DD/MM/YYYY'
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
    const { id } = useParams()

    const thead = [
        "Visitor's Name",
        "Visitor's Mob.No",
        "Visitor's Department",
        "Assets",
    ]
    const downloadWithAxios = async (url, file_name) => {
        console.log(url, file_name);
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' })
            forceDownload(response, file_name)
        }
        catch (error) {
            console.log("error in getting file", error)
        }

    }
    return (<>
        <Table thead={thead}
            tbody={

                visitors?.length && visitors?.map((g, i) => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td>{g.v_name}</td>
                            <td>{g.v_mobile_no}</td>
                            <td>{g.v_desig}</td>
                            <td>{g.v_asset}</td>
                            {visitorPhoto[i] && <td className='delete'>{
                                <TipTool body={
                                    <a target="_blank" href={visitorPhoto[i]?.mod_image}>{`Vistor ${i + 1}`}</a>
                                }
                                    title={`View Vistor ${i + 1} photo `} />
                            }
                            </td>}
                            {componentAccess.camera_component &&
                                <td onClick={() => { captureImage(`${id}__${i}`) }} className='delete'>
                                    <TipTool body={
                                        <IconButton>
                                            <AiOutlineCamera color='#555259' size={22} />
                                        </IconButton>
                                    } title={"Click Photo"} />
                                </td>}

                        </tr>
                    )
                })
            }
        />
    </>)
}
