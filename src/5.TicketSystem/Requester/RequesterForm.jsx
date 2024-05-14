import React, { useContext, useRef, useState } from 'react'
import {
    styled, Stack, Typography, Card, CardContent, TextField, Divider, Button, Autocomplete
} from '@mui/material';
import { CloudUpload } from 'tabler-icons-react';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../../Style/TicketSystem.css'
import BackArrow from '../../Helper Components/SideComponent';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../Helper Components/Api';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx'
import { RequestTicketErrorSchema } from '../../Form Error Schema/TicketSysytemErrorSchema';
import { AppContext } from '../../App';
import BarSnack from '../../Helper Components/BarSnack';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import { getCookies } from '../../Helper Components/CustomCookies';
const Input = styled('input')({
    display: 'none',
});

function RequesterForm() {
    const { setSnackBarPopUp, } = useContext(AppContext)
    const emp_id = getCookies()[0]
    const [tktFiles, setTKTFiles] = useState([])
    const [tktType, setTKTType] = useState({
        value: "",
        index: ""
    })
    const { btnSaving, setBtnSaving } = useContext(AppContext)
    const ErrorSchema = RequestTicketErrorSchema

    const handleFileChange = (e) => {
        console.log(e.target.files);
        const files = Array.from(e.target.files);
        console.log(files);
        setTKTFiles(files);
    };


    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('requester_emp_no', emp_id)

            tktFiles.length && tktFiles.forEach((file, index) => {
                formData.append(`file${index + 1}`, file);
            });
            formData.append('file_count', tktFiles.length)
            Object.entries(data).map((x) => {
                formData.append(x[0], x[1])
            })
            setBtnSaving(true)
            const response = await axios.post(api.ticket_system.create, formData)
            if (response.data.status === 200) {
                setSnackBarPopUp({ state: true, message: "Created Ticket", severity: "s" })
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "" })
                    window.location.href = "/ticket/sys/list"
                }, 2000)
            }
        } catch (error) {
            setBtnSaving(false)
            console.log("error in uploading ", error);
        }
    }

    const inputFile = useRef(null)

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const tkt_type_lists = useQuery(['tkt-type-lists'], async () => {
        return await axios.get(`${api.dynamic_values.tkt_type}`)
    })

    const req_type_lists = useQuery(['req-type-lists', tktType.index], async () => {
        return await axios.post(`${api.dynamic_values.requirement_type}`, { index: Number(tktType.index) })
    })


    function tkt_type_op(e) {
        setTKTType({
            value: e,
            index: tkt_type_lists?.data?.data.indexOf(e)
        })
    }

    function deleteFiles(g) {
        let arr = tktFiles.filter(function (item) {
            return item.name !== g
        })
        setTKTFiles((tktFiles) => {
            return [...arr]
        })
    }

    return (
        <div className='mt-20'>
            <BackArrow location={"/ticket/sys/list"} title={"Raise a New Ticket"} />
            <BarSnack />
            <form className='grid grid-cols-[repeat(1,1fr)] p-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-[repeat(2,30vw)] gap-7 p-5'>
                    <div className='grid grid-cols-[repeat(1,30vw)] gap-7'>
                        <CustomTextField label="Ticket Title*" name={"tkt_title"} errors={errors} register={register} watch={watch} />
                        <Autocomplete
                            onChange={(x, e) => {
                                setValue("req_type", null)
                                tkt_type_op(e)
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={tkt_type_lists?.data?.data.map(x => { return x }) || []}
                            renderInput={(params) => <TextField {...params} label="Ticket Type*" size={"small"} {...register('tkt_type')} error={errors.tkt_type} helperText={errors.tkt_type && errors.tkt_type.message} />}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            disabled={tktType.value ? false : true}
                            options={req_type_lists?.data?.data.map(x => { return x }) || []}
                            renderInput={(params) => <TextField {...params} label="Requirement Type*" size={"small"} {...register('req_type')} error={errors.req_type} helperText={errors.req_type && errors.req_type.message} />}
                        />
                    </div>
                    <div className='grid grid-cols-[repeat(1,30vw)] gap-7'>
                        <CustomTextField multiline={7} label="Requirement Description*" name={"tkt_description"} errors={errors} register={register} watch={watch} />
                    </div>
                </div>
                <div className='flex gap-7 p-5' >
                    <Card onClick={onButtonClick} className="ts-card" style={{ cursor: "pointer " }} >
                        <CardContent  >
                            <Typography className="ts-card-typo" sx={{ fontSize: 14 }} >
                                <CloudUpload
                                    size={38}
                                    strokeWidth={2}
                                    color={'grey'}
                                />
                            </Typography>
                            <Typography className="ts-card-typo" sx={{ fontWeight: "bold" }} >
                                Click Here to Upload Files
                            </Typography>
                            <Typography className="ts-card-typo" variant="h5" component="div">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="contained-button-file">
                                        <Input type='file'
                                            multiple
                                            accept="image/jpeg,image/png,application/pdf"
                                            id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => {
                                                handleFileChange(e)
                                            }} />

                                    </label>
                                </Stack>
                            </Typography>
                            <Typography sx={{ mt: 1, fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
                                Upload files that are less than 10mb in size.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Divider orientation='vertical' />
                    <div className='max-h-[8rem] overflow-y-scroll'>
                        {tktFiles?.map((g, i) => {
                            return (
                                <div key={i} className='flex gap-2 '>
                                    <p><strong>{i + 1}.</strong> {g.name}</p>
                                    <RxCross2 onClick={() => { deleteFiles(g.name) }} className='text-[#ff2a2a] hover:text-[#ff6060] cursor-pointer active:text-[#ffa4a4] mt-1' />
                                </div>)
                        })}
                    </div>
                </div>
                <div className='p-5'>
                    <LoadingButtonWithSnack beforeName={"Create Ticket"} afterName={"Creating..."} />
                </div>
            </form>
            {/* <div className='absolute right-0 bottom-0 p-10 lg:hidden xl:block' >
                <img loading='lazy' width={"300px"} src={IMAGES.ticket_sys_i} />
            </div> */}
        </div>
    )
}

export default RequesterForm

const CustomTextField = ({ name, label, errors, register, watch, multiline }) => {
    return (
        <TextField
            multiline={multiline ? true : false}
            rows={multiline}
            key={label}
            // className='textfield'
            value={watch(name)}
            label={label}
            size={"small"}
            {...register(name)}
            error={!!errors[name]}
            helperText={errors[name] && errors[name].message} />
    )
}
