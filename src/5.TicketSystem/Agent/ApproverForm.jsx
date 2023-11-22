import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    styled, Stack, Typography, TextField, Divider, Button, Autocomplete, Checkbox, FormControlLabel, InputAdornment, FormControl, FormLabel, RadioGroup, Radio, FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApproverTicketErrorSchema } from '../../Form Error Schema/TicketSysytemErrorSchema';
import BackArrow from '../../Helper Components/SideComponent';
import { api } from '../../Helper Components/Api';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
const Input = styled('input')({
    display: 'none',
});

import { AiOutlineUpload } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { forceDownload, severity } from '../../Static/StaticValues';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import { AppContext } from '../../App';
import { getCookies } from '../../Helper Components/CustomCookies';

const formData = new FormData()

export default function ApproverForm() {

    const emp_id = getCookies()[0]

    const { setSnackBarPopUp, setBtnSaving } = useContext(AppContext)
    const ErrorSchema = ApproverTicketErrorSchema
    const [componentAccess, setComponentAccess] = useState({})
    const [tktFiles, setTKTFiles] = useState([])
    const [tktType, setTKTType] = useState({
        value: "",
        index: ""
    })
    const { id } = useParams()

    const response = useQuery(['get-ticket-data'], async () => {
        const data = await axios.get(api.ticket_system.by_id + id + `?woosee=${getCookies()[0]}`)
        Object.entries(data?.data?.form_data).map(x => {
            setValue(x[0], x[1])
            x[0] === "severity" && setValue(x[0], severity[x[1]])
        })
        setComponentAccess(data?.data?.view_access)
        return data
    })
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {
            tkt_type: "", tkt_title: "", req_type: '', tkt_description: "", severity: "",
            assign_ticket_to_user: "", approver_status: "", approver_comment: ""
        }
    })


    const onSubmit = async (data) => {
        data["id"] = id
        try {
            const formData = new FormData();
            tktFiles.length && tktFiles.forEach((file, index) => {
                formData.append(`file${index + 1}`, file);
            });
            formData.append('file_count', tktFiles.length)
            data["severity"] = severity.indexOf(data["severity"])
            Object.entries(data).map((x) => {
                formData.append(x[0], x[1])
            })
            formData.append('user_info', emp_id)

            const _response = await axios.put(api.ticket_system.by_id + id, formData)
            if (_response.data.status_code === 200) {
                setBtnSaving(true)
                setSnackBarPopUp({ state: true, message: "Created ticket", severity: "s" })
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "" })
                    window.location.href = "/ticket/sys/list"
                }, 2000)
            }
        } catch (error) {
            console.log("error in uploading", error);
        }
    }

    const tkt_type_lists = useQuery(['tkt-type-lists'], async () => {
        const data = await axios.get(`${api.dynamic_values.tkt_type}`)
        return data?.data
    }, { staleTime: "300000" })

    const req_type_lists = useQuery(['req-type-lists', tktType], async () => {
        const data = await axios.post(`${api.dynamic_values.requirement_type}`, { index: Number(tkt_type_lists?.data?.indexOf(tktType.index)) })
        return data
    }, { staleTime: "300000" })


    const list_of_users = useQuery(['list-of-users'], async () => {
        return await axios.get(api.ticket_system.get_all_user_list)
    }, { staleTime: "300000" })

    function deleteFiles(g) {
        let arr = tktFiles.filter(function (item) {
            return item.name !== g
        })
        setTKTFiles((tktFiles) => {
            return [...arr]
        })
    }

    const downloadWithAxios = async (url, file_name) => {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' })
            forceDownload(response, file_name)
        }
        catch (error) {
            console.log("error in getting file", error)
        }

    }


    return (
        <div className='mt-20'>
            <BackArrow location={"/ticket/sys/list"} title={`Ticket No - #${getValues("ticket_no")}`} />
            <form className='grid grid-cols-[2fr_1fr] gap-20 p-5' onSubmit={handleSubmit(onSubmit)}>
                <div >
                    <div className='grid grid-cols-2 ml-5'>
                        {(!response.isLoading && Object.entries(response?.data?.data?.user_info)?.map((u, i) => {
                            return (
                                <div key={i} className='flex gap-1'>
                                    <label className='font-bold'>{u[0]}</label>
                                    <label >{u[1]}</label>
                                </div>
                            )
                        }))}
                    </div>
                    <div className='grid grid-cols-[repeat(2,1fr)] p-5 gap-5'>
                        <div className='grid grid-cols-[repeat(1,1fr)] gap-5'>
                            <CustomTextField label="Ticket Title*" name={"tkt_title"} errors={errors} register={register} watch={watch} />
                            <CustomTextField multiline={4} label="Requirement Description*" name={"tkt_description"} errors={errors} register={register} watch={watch} />
                        </div>
                        <div className='grid grid-cols-[repeat(1,1fr)] gap-5'>
                            <CustomAutoComplete disabled={true} control={control} errors={errors} name={"tkt_type"} label={"Ticket Type"} options={tkt_type_lists.data || []} />
                            <CustomAutoComplete onFocus={() => setTKTType({ index: response?.data?.data?.form_data?.tkt_type })} control={control} errors={errors} name={"req_type"} label={"Requirement Type"} options={req_type_lists?.data?.data || []} />
                            <CustomAutoComplete disabled={!componentAccess.severity_component} control={control} errors={errors} name={"severity"} label={"Severity"} options={severity} />
                        </div>
                    </div>
                    <div className='px-5'>
                        <Divider />
                    </div>
                    <div className='p-5' >
                        <strong>Uploaded files</strong>
                        <div className='grid grid-cols-4 gap-1 '>
                            {!response.isLoading && response?.data?.data?.upload_data?.map((g, i) => {
                                return (
                                    <div className=''>
                                        <div key={i} className='flex gap-1 cursor-pointer '>
                                            <strong>{i + 1}.</strong>
                                            <span className='hover:underline hover:text-[blue]' onClick={() => downloadWithAxios(g.mod_file_path, g.mod_file_name)}>{g.mod_file_name}</span>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className='w-fit'>
                    </div>
                </div>
                <div className='grid grid-cols-[repeat(1,1fr)] pl-0 pr-4 pt-4 pb-0 gap-4 h-fit'>
                    {componentAccess.assign_ticket_comp &&
                        <>
                            <div>
                                <CustomAutoComplete control={control} errors={errors} name={"assign_ticket_to_user"} label={"Assign Ticket To Users"} options={list_of_users?.data?.data.map(x => { return `${x[2]}-${x[0]} ${x[1]}-${x[3]}` }) || []} />
                            </div>
                            <Divider />
                        </>
                    }
                    <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px]  rounded-lg p-2'>
                        <span className='text-lg'>Comment History</span>
                        <VerticalLinearStepper response={response} />
                    </div>
                    <Divider />
                    {componentAccess.approval_status && <div className='grid gap-3'>
                        <Controller
                            render={({ field: { onChange, onBlur, value, name, ref },
                                fieldState: { isTouched, isDirty, error },
                            }) => (
                                <FormControl error={!!errors.approver_status}>
                                    <FormLabel className='mt-[-.6rem]' id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                    <RadioGroup
                                        className='mt-[-.1rem]'
                                        {...register('approver_status')}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}>
                                        <FormControlLabel value="0" control={<Radio size='small' />} label="Approve" />
                                        <FormControlLabel value="1" control={<Radio size='small' />} label="Reject" />
                                        <FormControlLabel value="2" control={<Radio size='small' />} label="Close" />
                                    </RadioGroup>
                                    <FormHelperText>{errors.approver_status && errors.approver_status.message}</FormHelperText>
                                </FormControl>
                            )}
                            name="approver_status"
                            control={control}
                            rules={{ required: true }}
                        />
                    </div>}
                    {componentAccess.comments_box && <CustomTextFieldWithIcon uploadDocuments={componentAccess.upload_documents} tktFiles={tktFiles} setTKTFiles={setTKTFiles} multiline={4} label={"Comments*"} name={"approver_comment"} errors={errors} register={register} watch={watch} />}
                    <div>
                        <strong>Uploaded Files{" "}</strong>
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
                    {componentAccess.submit_btn && <div>
                        <LoadingButtonWithSnack beforeName={"Submit"} afterName={"Submiting..."} />
                    </div>}
                </div>
            </form>
        </div>
    )
}

function VerticalLinearStepper({ response }) {
    const [activeStep, setActiveStep] = React.useState(3);
    return (
        <Box className=" max-h-[30vh] overflow-y-scroll" >
            <Stepper orientation="vertical">
                {response?.data?.data?.form_data?.approval_flow.map((step, index) => (
                    <Step active expanded key={index}>
                        <StepLabel >
                            <div className='flex justify-between'>
                                <div>
                                    <span className='font-[500] uppercase'>{step.user_name} | </span>
                                    <span className='font-[500] uppercase'>{step.department} | </span>
                                    <span className='font-[500] uppercase'>{step.emp_id}</span>
                                </div>
                                <div>
                                    <span className='font-[500]'>{severityArrow(step.status)}</span>
                                </div>
                            </div>
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.comments}</Typography>
                            <div className='flex justify-end'>
                                <span className='font-[500] uppercase'>{step.time}</span>
                            </div>
                        </StepContent>
                    </Step >
                ))
                }
            </Stepper >
        </Box >
    );
}

const CustomAutoComplete = ({ name, label, options, control, errors, disabled, onFocus, onClick, ...props }) => {
    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    onFocus={onFocus}
                    {...props}
                    disabled={disabled}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    key={name}
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
const CustomTextField = ({ name, label, errors, register, watch, multiline, disabled }) => {
    return (
        <TextField
            multiline={multiline && true}
            rows={multiline}
            disabled={disabled}
            key={label}
            value={watch(name)}
            label={label}
            size={"small"}
            {...register(name)}
            error={!!errors[name]}
            helperText={errors[name] && errors[name].message} />
    )
}
const CustomTextFieldWithIcon = ({ name, label, errors, register, watch, multiline, uploadDocuments, setTKTFiles, }) => {
    const inputFile = useRef(null)

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setTKTFiles(files);
    };

    return (

        <TextField
            InputProps={{
                endAdornment: (
                    <div>
                        {uploadDocuments && <>
                            <label htmlFor="contained-button-file">
                                <Input type='file'
                                    multiple

                                    accept="image/jpeg,image/png,application/pdf"
                                    id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => {
                                        handleFileChange(e)
                                    }} />
                            </label>
                            <ButtonComponent onClick={onButtonClick} icon={<AiOutlineUpload color='white' size={"23"} />} btnName={"Upload"} />
                        </>}
                    </div>
                ),
            }}
            multiline={multiline && true}
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

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#ffffff] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}

function severityArrow(val) {
    if (val === "0") {
        return (<div className='text-xs w-fit flex justify-center px-2 py-1 rounded-xl bg-green-100'><p className='mt-[0.1rem]'>Approved</p></div>)
    }
    if (val === "1") {
        return (<div className='text-xs w-fit flex justify-center px-2 py-1 rounded-xl bg-red-100'><p className='mt-[0.1rem]'>Rejected</p></div>)
    }
    if (val === "2") {
        return (<div className='text-xs w-fit flex justify-center px-2 py-1 rounded-xl bg-blue-100'><p className='mt-[0.1rem]'>Closed</p></div>)
    }
    else {
        return "-"
    }
}
