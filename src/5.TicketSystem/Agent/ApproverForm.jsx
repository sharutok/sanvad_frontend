import React, { useContext, useRef, useState } from 'react'
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
import { severity } from '../../Static/StaticValues';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import { AppContext } from '../../App';

const formData = new FormData()

export default function ApproverForm() {
    const { setSnackBarPopUp } = useContext(AppContext)
    const ErrorSchema = ApproverTicketErrorSchema
    const [tktFiles, setTKTFiles] = useState(null)
    const [tktType, setTKTType] = useState({
        value: "",
        index: ""
    })
    const { id } = useParams()

    const response = useQuery(['get-ticket-data'], async () => {
        const data = await axios.get(api.ticket_system.by_id + id)
        Object.entries(data?.data?.form_data).map(x => {
            setValue(x[0], x[1])
            x[0] === "severity" && setValue(x[0], severity[x[1]])
        })
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
        console.log(data);
        setSnackBarPopUp({ state: true, message: "Created ticket" })
        try {
            const formData = new FormData();
            tktFiles?.length >= 0 && formData.append('user_file', tktFiles, tktFiles.name)
            data["severity"] = severity.indexOf(data["severity"])
            Object.entries(data).map((x) => {
                formData.append(x[0], x[1])
            })
            const response = await axios.put(api.ticket_system.by_id + id, formData)
            console.log(response);
        } catch (error) {
            console.log("error in uploading", error);
        }
    }

    const tkt_type_lists = useQuery(['tkt-type-lists'], async () => {
        return await axios.get(`${api.dynamic_values.tkt_type}`)
    })

    const req_type_lists = useQuery(['req-type-lists', tktType.index], async () => {
        return await axios.post(`${api.dynamic_values.requirement_type}`, { index: Number(tkt_type_lists?.data?.data.indexOf(getValues("tkt_type"))) })
    })

    const list_of_users = useQuery(['list-of-users'], async () => {
        return await axios.get(api.ticket_system.get_all_user_list)
    })


    function deleteFiles(g) {
        let arr = tktFiles.filter(function (item) {
            return item.name !== g
        })
        setTKTFiles((tktFiles) => {
            return [...arr]
        })
    }


    return (
        <div className='mt-10'>
            <BackArrow location={"/ticket/sys/list"} title={`Ticket No - #${getValues("ticket_no")}`} />
            <form className='grid grid-cols-[2fr_1fr] gap-20 p-5' onSubmit={handleSubmit(onSubmit)}>
                <div >
                    <div className='grid grid-cols-2 ml-5'>
                        {(!response.isLoading && Object.entries(response.data.data.user_info).map((u, i) => {
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
                            <CustomAutoComplete disabled={true} control={control} errors={errors} name={"tkt_type"} label={"Ticket Type"} options={tkt_type_lists?.data?.data.map(x => { return x }) || []} />
                            <CustomAutoComplete control={control} errors={errors} name={"req_type"} label={"Requirement Type"} options={req_type_lists?.data?.data.map(x => { return x }) || []} />
                            <CustomAutoComplete control={control} errors={errors} name={"severity"} label={"Severity"} options={severity} />
                        </div>
                    </div>
                    <div className='px-5'>
                        <Divider />
                    </div>
                    <div className='p-5' >
                        <strong>Uploaded files</strong>
                        <div className='flex gap-3'>
                            {!response.isLoading && response.data.data.upload_data.map((g, i) => {
                                return (
                                    <div key={i} className='flex gap-1 '>
                                        <strong>{i + 1}.</strong>
                                        <a href={g.user_file}>File</a>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className='w-fit'>
                    </div>
                </div>
                <div className='grid grid-cols-[repeat(1,1fr)] pl-0 pr-4 pt-4 pb-0 gap-4'>
                    <div>
                        <CustomAutoComplete control={control} errors={errors} name={"assign_ticket_to_user"} label={"Assign Ticket To Users"} options={list_of_users?.data?.data.map(x => { return `${x[2]} - ${x[0]} ${x[1]}` }) || []} />
                    </div>
                    <Divider />
                    <span className='text-lg'>Comments</span>
                    <VerticalLinearStepper />
                    <Divider />
                    <div className='grid gap-3'>
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
                                    </RadioGroup>
                                    <FormHelperText>{errors.approver_status && errors.approver_status.message}</FormHelperText>
                                </FormControl>
                            )}
                            name="approver_status"
                            control={control}
                            rules={{ required: true }}
                        />
                    </div>
                    <CustomTextFieldWithIcon tktFiles={tktFiles} setTKTFiles={setTKTFiles} multiline={4} label={"Comments*"} name={"approver_comment"} errors={errors} register={register} watch={watch} />
                    <div>
                        <strong>Files{" "}</strong>
                        {/* {[1, 2, 3, 4].map((g, i) => {
                            return (
                                <div key={i} className='inline-block gap-5'>
                                    <div className='flex gap-1'>
                                        <a className='cursor-pointer'> {"g.name"}</a>
                                        <RxCross2 onClick={() => { deleteFiles(g) }} className='hover:text-[#ff6060] mt-[0.35rem] cursor-pointer active:text-[#ffa4a4]' />
                                    </div>
                                </div>)
                        })} */}
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
                    <div>
                        <LoadingButtonWithSnack beforeName={"Submit"} afterName={"Submiting..."} />
                    </div>
                </div>
            </form>
        </div>
    )
}


const steps = [
    {
        user: 'user',
        department: 'department',
        emp_id: 'emp_id',
        comments: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.`,
        date: '23/12/2022'
    },
    // {
    //     user: 'user',
    //     department: 'department',
    //     emp_id: 'emp_id',
    //     comments:
    //         'An ad group contains one or more ads which target a shared set of keywords.',
    //     date: '23/12/2022'
    // },
    // {
    //     user: 'user',
    //     department: 'department',
    //     emp_id: 'emp_id',
    //     comments: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.`,
    //     date: '23/12/2022'
    // },
    // {
    //     user: 'user',
    //     department: 'department',
    //     emp_id: 'emp_id',
    //     comments: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.`,
    //     date: '23/12/2022'
    // },

];
function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(3);

    return (
        <Box className="max-h-[40vh] overflow-y-scroll" >
            <Stepper orientation="vertical">
                {steps.map((step, index) => (
                    <Step active expanded key={index}>
                        <StepLabel >
                            <div className='flex justify-between px-2'>
                                <div>
                                    <span className='font-[700] uppercase'>{step.user} | </span>
                                    <span className='font-[700] uppercase'>{step.department} | </span>
                                    <span className='font-[700] uppercase'>{step.emp_id}</span>
                                </div>
                                <div>
                                    <span className='font-[700] uppercase'>{step.date}</span>
                                </div>
                            </div>
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.comments}</Typography>
                        </StepContent>
                    </Step >
                ))
                }
            </Stepper >
        </Box >
    );
}

const CustomAutoComplete = ({ name, label, options, control, errors, disabled, onClick, ...props }) => {
    return (
        <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
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
const CustomTextFieldWithIcon = ({ name, label, errors, register, watch, multiline, tktFiles, setTKTFiles }) => {
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
                        <label htmlFor="contained-button-file">
                            <Input type='file'
                                multiple
                                accept="image/jpeg,image/png,application/pdf"
                                id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => {
                                    handleFileChange(e)
                                }} />
                        </label>
                        <ButtonComponent onClick={onButtonClick} icon={<AiOutlineUpload color='white' size={"23"} />} btnName={"Upload"} />
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

