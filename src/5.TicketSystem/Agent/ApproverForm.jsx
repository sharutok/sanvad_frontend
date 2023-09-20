import React, { useRef, useState } from 'react'
import {
    styled, Stack, Typography, Card, CardContent, TextField, Divider, Button, Autocomplete, Checkbox, FormControlLabel, InputAdornment
} from '@mui/material';
import { CloudUpload } from 'tabler-icons-react';
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TickErrorSchema } from '../../Form Error Schema/TicketSysytemErrorSchema';
import TipTool from '../../Helper Components/TipTool';
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

const formData = new FormData()

export default function ApproverForm() {
    const [tktFiles, setTKTFiles] = useState(null)
    const [tktType, setTKTType] = useState({
        value: "",
        index: ""
    })


    const ErrorSchema = TickErrorSchema

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('user_file', tktFiles, tktFiles.name)
            Object.entries(data).map(x, i => {
                console.log(x, i);
            })
            await axios.post(api.ticket_system.create, formData)
        } catch (error) {
            console.log("error in uploading ");
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

    function deleteFiles() {
        tktFiles.pop(globalThis)
        setTKTFiles((tktFiles) => {
            return [...tktFiles]
        })
    }

    return (
        <div className='ts-container'>
            <BackArrow title={"Ticket No - #007"} />
            <form className='grid grid-cols-[2fr_1fr] gap-20' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className='grid grid-cols-[repeat(2,1fr)] p-5 gap-5'>
                        <div className='grid grid-cols-[repeat(1,1fr)] gap-5'>
                            <CustomTextField label="Ticket Title*" name={"tkt_title"} errors={errors} register={register} watch={watch} />
                            <CustomTextField multiline={4} label="Requirement Description*" name={"tkt_descrption"} errors={errors} register={register} watch={watch} />
                        </div>
                        <div className='grid grid-cols-[repeat(1,1fr)] gap-5'>
                            <Autocomplete
                                onChange={(x, e) => {
                                    setValue("req_type", null)
                                    tkt_type_op(e)
                                }}
                                disablePortal
                                id="combo-box-demo"
                                options={tkt_type_lists?.data?.data.map(x => { return x })}
                                renderInput={(params) => <TextField {...params} label="Ticket Type*" size={"small"} {...register('tkt_type')} error={errors.tkt_type} helperText={errors.tkt_type && errors.tkt_type.message} />}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                disabled={tktType.value ? false : true}
                                options={req_type_lists?.data?.data.map(x => { return x })}
                                renderInput={(params) => <TextField {...params} label="Requirement Type*" size={"small"} {...register('req_type')} error={errors.req_type} helperText={errors.req_type && errors.req_type.message} />}
                            />
                            <CustomAutoComplete control={control} errors={errors} name={"department"} label={"Severity"} options={['Low🔥', "Medium🔥🔥", "High🔥🔥🔥"]} />
                        </div>
                    </div>
                    <div className='ts-card-component flex gap-3 ml-5 mt-5' >
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
                                            <Input type='file' multiple accept="image/jpeg,image/png,application/pdf" id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => setTKTFiles(e.target.files[0])} />
                                        </label>
                                    </Stack>
                                </Typography>
                                <Typography sx={{ mt: 1, fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
                                    Upload files that are less than 30mb in size.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Divider orientation='vertical' />
                        <div className='p-[1px] bg-neutral-200'>
                        </div>
                        <div>
                            {[1, 2, 3, 4].map((g, i) => {
                                return (
                                    <div className='flex gap-2 '>
                                        <p><strong>{i + 1}.</strong> {"g.name"}</p>
                                        <RxCross2 onClick={() => { deleteFiles(g) }} className='hover:text-[#ff6060] mt-1 cursor-pointer active:text-[#ffa4a4]' />
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className='w-fit'>
                    </div>
                    <div className='ts-button'>
                        <Button fullWidth color="primary" variant="contained" type="submit">Submit</Button>
                    </div>
                </div>
                <div className='grid grid-cols-[repeat(1,1fr)] pl-0 pr-4 pt-4 pb-0 gap-4'>
                    <div>
                        <CustomAutoComplete control={control} errors={errors} name={"department"} label={"Assign Ticket To Users"} options={['User1', "User2", "User3"]} />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Assign to User" />
                    </div>
                    <VerticalLinearStepper />
                    <CustomTextFieldWithIcon multiline={4} label={"Comments*"} name={"emp_no"} errors={errors} register={register} watch={watch} />
                    <div>
                        <strong>Files{" "}</strong>
                        {[1, 2, 3, 4].map((g, i) => {
                            return (
                                <div className='inline-block gap-5'>
                                    <div className='flex gap-1'>
                                        <a className='cursor-pointer'> {"g.name"}</a>
                                        <RxCross2 onClick={() => { deleteFiles(g) }} className='hover:text-[#ff6060] mt-[0.35rem] cursor-pointer active:text-[#ffa4a4]' />
                                    </div>
                                </div>)
                        })}
                    </div>
                    <div className='grid grid-cols-[repeat(3,1fr)] gap-3'>
                        <Button variant='contained' sx={{ background: "#9dbf9e", }}>Approve</Button>
                        <Button variant='contained' sx={{ background: "#9dbf9e", }}>Close</Button>
                        <Button variant='contained' sx={{ background: "#ee7674" }}>Reject</Button>
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
    {
        user: 'user',
        department: 'department',
        emp_id: 'emp_id',
        comments:
            'An ad group contains one or more ads which target a shared set of keywords.',
        date: '23/12/2022'
    },
    {
        user: 'user',
        department: 'department',
        emp_id: 'emp_id',
        comments: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.`,
        date: '23/12/2022'
    },
    {
        user: 'user',
        department: 'department',
        emp_id: 'emp_id',
        comments: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.`,
        date: '23/12/2022'
    },

];
function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(3);

    return (
        <Box className="max-h-[50vh] overflow-y-scroll" >
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
        <TextField
            multiline={multiline && multiline}
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
const CustomTextFieldWithIcon = ({ name, label, errors, register, watch, multiline }) => {
    return (
        <TextField
            InputProps={{
                endAdornment: (
                    <ButtonComponent icon={<AiOutlineUpload color='white' size={"23"} />} btnName={"Upload"} />
                    // <Button variant='contained' startIcon={<SearchIcon />}>Upload </Button>
                ),
            }}
            multiline={multiline && multiline}
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

