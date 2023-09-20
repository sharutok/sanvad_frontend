
import React, { useContext, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DialogsBox from '../../Helper Components/DialogsBox'
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
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

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
};


export default function ApproveVisitorManagement() {
    const ErrorSchema = VisitorMangErrorSchema
    const { setDialogStatus, dialogStatus } = useContext(AppContext)

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })

    const onSubmit = (data) => {
        console.log(data);
    }
    function handleAddVisitor() {
        setDialogStatus(!dialogStatus)
    }
    const { id } = useParams()
    return (
        <div className='flex justify-around'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <BackArrow title={`Visitor's Management - #${id.padStart(5, "0")}`} />
                    <div className='grid gap-5 p-5'>
                        <div className='flex flex-wrap gap-5'>
                            <TextField sx={{ width: "20rem" }} label="Person In-Charge*" disabled size={"small"}></TextField>
                            <TextField sx={{ width: "20rem" }} label="Department*" disabled size={"small"}></TextField>
                            <CustomDateTime register={register} name={"start_date_time"} label={"Start Date Time"} errors={errors} control={control} watch={watch} />
                            <CustomDateTime register={register} name={"end_date_time"} label={"End Date Time"} errors={errors} control={control} watch={watch} />
                            <div className='grid grid-cols-[repeat(2,auto)] gap-5'>
                                <div className='grid grid-cols-[repeat(2,1fr)] gap-5'>
                                    <CustomTextField errors={errors} register={register} watch={watch} name="v_company" label="Visitor's Company*" />
                                    <CustomTextField errors={errors} register={register} watch={watch} name="v_asset" label="Visitor's Assest*" />
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

                        {/* <div className='w-fit'>
                        <ButtonComponent onClick={handleAddVisitor} icon={<AiOutlineUsergroupAdd color='white' size={"23"} />} btnName={"Add Visitor"} />
                    </div> */}
                        <div className='flex justify-start'>
                            <VisitorListing />
                        </div>
                        <>
                            <DialogsBox title={"Manage Add Visitor"} body={
                                <div className='w-fit'>
                                    <div className='flex flex-wrap gap-5 p-5'>
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_name" label="Visitor's Name*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_mobile_no" label="Visitor's Mobile No*" />
                                        <CustomTextField errors={errors} register={register} watch={watch} name="v_desig" label="Visitor's Designation*" />
                                    </div>
                                    <div className='p-5'>
                                        <Button variant="contained" type="submit">Add</Button>
                                    </div>
                                </div>
                            } />
                        </>
                    </div>
                </div>
                <div className='vm-button'>
                    <Button fullWidth variant="contained" type="submit">Submit</Button>
                </div>
            </form>
            <div className='w-86'>
                <PhotoComponent />
            </div>
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

const CustomDateTime = ({ register, name, label, errors, control, watch, disabled }) => {
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
const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}

const VisitorListing = () => {
    const thead = [
        "Visitor's Company",
        "Visitor's Assest",
        "Visitor's Contact Info",
    ]


    return (<>
        <Table thead={thead} tbody={
            ["1"].map((g, i) => {
                return (
                    <tr key={i}>
                        <td>{"g.ticket_no"}</td>
                        <td>{"g.tkt_title"}</td>
                        <td>{"g.tkt_type"}</td>
                        {/* <td className='delete'>
                            <TipTool body={< >
                                <IconButton>
                                    <MdDeleteOutline color='#f08080' size={22} />
                                </IconButton>
                            </>} />
                        </td> */}
                    </tr>
                )
            })
        } />
    </>)
}




const PhotoComponent = () => {
    const webcamRef = useRef(null);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();

        // Convert the base64 image to a Blob
        const byteCharacters = atob(imageSrc.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        // Save the Blob to a folder (imag) using file-saver
        saveAs(blob, 'captured-image.jpg');
    };

    return (
        <div className='grid gap-5 p-5'>
            <Webcam
                className='rounded-md'
                audio={false}
                height={400}
                screenshotFormat="image/jpeg"
                width={700}
                videoConstraints={videoConstraints}
                ref={webcamRef}
            />
            <div className='flex justify-center'>
                <ButtonComponent onClick={captureImage} icon={<BsCamera color='white' size={"23"} />} btnName={"Capture Photo"} />
            </div>
        </div>
    );
};
