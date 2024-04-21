import React, { useContext } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller, } from 'react-hook-form'
import { AiOutlineDownload } from 'react-icons/ai'
import dayjs from 'dayjs';
import DialogsBox from './DialogsBox';
import { AppContext } from '../App';
import LoadingButtonWithSnack from './LoadingButtonWithSnack';
import axios from 'axios';
import { exportToCSV } from '../Static/StaticValues';
import moment from 'moment';

export default function ExportXL({ api, request, title }) {
    const { setDialogStatus, setSnackBarPopUp, setBtnSaving } = useContext(AppContext)
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch, reset } = useForm({
        mode: "onTouched",
        defaultValues: {
            start_date: null
            , end_date: null
        },
    })

    const onSubmit = async (submit) => {
        try {
            submit.start_date = dayjs(submit.start_date).format("YYYY-MM-DD")
            submit.end_date = dayjs(submit.end_date).add(1, 'day').format("YYYY-MM-DD")
            const { start_date, end_date } = submit
            const response = await axios.post(api, { ...request, start_date, end_date })
            exportToCSV(response?.data?.data, `Ticket Export ${moment().format("DD_MM_YYYY")}`)
            setBtnSaving(true)
            if (response?.data.status == 200) {
                setSnackBarPopUp({ state: true, message: "File Downloaded", severity: 's' })
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "", severity: 's' })
                    setBtnSaving(false)
                    reset()
                }, 1 * 1000)
            }
        } catch (error) {
            setBtnSaving(false)
            console.log("err", error);
        }
    }

    return (
        <>
            <DialogsBox title={title || "Download Report"} body={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='m-10 grid gap-5 grid-cols-1'>
                        <CustomDate label={"From Date*"} name={"start_date"} errors={errors} control={control} watch={watch} register={register} />
                        <CustomDate label={"To Date*"} name={"end_date"} errors={errors} control={control} watch={watch} register={register} />
                        <LoadingButtonWithSnack beforeName={"Download File"} afterName={"Downloading...."} />
                    </div>
                </form>
            }>
            </DialogsBox>
            <ButtonComponent onClick={() => { setDialogStatus(true) }} icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />
        </>
    )
}

const ButtonComponent = ({ onChange, icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            onChange={onChange}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb]  text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}

const CustomDate = ({ register, name, label, errors, control, watch }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{ width: 320 }}
                    format="DD/MM/YYYY"
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
