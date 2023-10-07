import { useParams } from 'react-router-dom'
import { api } from '../../Helper Components/Api';
import axios from 'axios'
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import moment from 'moment';
import React, { useContext, useEffect, useState, useRef } from 'react'
import {
    styled, Stack, Typography, Card, CardContent, TextField, Divider, Button, Autocomplete, InputAdornment, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, FormHelperText, Radio
} from '@mui/material'
import { useForm, Controller, get } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../../Style/UserManagement.css'
import BackArrow from '../../Helper Components/SideComponent'
import { CapexErrorSchema } from '../../Form Error Schema/CapexErrorSchema'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Table from '../../Helper Components/Table';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { BiChevronDown } from 'react-icons/bi';
import PreFilledSubForm from '../PreFilledSubForm';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Input = styled('input')({
    display: 'none',
});

export default function Form() {
    const id = useParams()
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
        <div className='mt-5'>
            <BackArrow location={"/capex/list"} title={"Capex Form - Approver"} />
            <div className='p-10 grid grid-cols-[2fr_1fr] gap-20'>
                <div className='h-fit grid gap-5'>
                    <div className='grid grid-cols-[repeat(2,1fr)] gap-5'>
                        <CustomTextField label={"Nature Of Requirement"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                        <CustomTextField label={"Purpose"} name={"purpose"} errors={errors} register={register} watch={watch} />
                        <CustomTextField label={"Plant"} name={"purpose"} errors={errors} register={register} watch={watch} />
                        <CustomTextField label={"Department"} name={"purpose"} errors={errors} register={register} watch={watch} />
                        <CustomTextField label={"Budgeted Type"} name={"purpose"} errors={errors} register={register} watch={watch} />
                        <CustomTextField label={"Total Cost"} name={"purpose"} errors={errors} register={register} watch={watch} />
                    </div>
                    <div>
                        <strong>Uploaded files</strong>
                        <div className=' flex gap-3'>
                            {[1, 2, 3, 4].map((g, i) => {
                                return (
                                    <div className='flex gap-1 '>
                                        <a href=""><strong>{i + 1}.</strong> {"g.name"}</a>
                                    </div>)
                            })}
                        </div>
                    </div>
                    {preFilled ?
                        <ButtonComponent onClick={() => setPreFilled(!preFilled)} icon={<MdKeyboardDoubleArrowUp color='#fff' size={22} />} btnName={"Click for Less Information"} />
                        :
                        <ButtonComponent onClick={() => setPreFilled(!preFilled)} icon={<MdKeyboardDoubleArrowDown color='#fff' size={22} />} btnName={"Click for More Information"} />
                    }
                    {preFilled && <div >
                        <MoreInformation />
                    </div>}
                </div>
                <div className='grid grid-cols-[repeat(1,1fr)] gap-5 h-fit '>
                    <VerticalLinearStepper />
                    <Divider />
                    <ApprovalSection control={control} errors={errors} register={register} watch={watch} handleSubmit={handleSubmit} onSubmit={onSubmit} />
                    <CustomTextFieldWithIcon multiline={4} label={"Comments*"} name={"emp_no"} errors={errors} register={register} watch={watch} />
                    <div className='grid grid-cols-[repeat(3,1fr)] gap-3'>
                        <Button variant='contained' sx={{ background: "#9dbf9e", }}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MoreInformation = () => {
    return (
        <div className='grid grid-cols-1 gap-10'>
            <div className='grid grid-cols-1 gap-3'>
                <span className='text-xl font-bold'>Budget Details</span>
                <div className='rounded-xl p-1 border border-solid border-[grey]'>
                    <PreFilledSubForm />
                </div>
            </div>
            <div className='grid grid-cols-1 gap-3'>
                <span className='text-xl font-bold'>Capex Details</span>
                <div className='flex flex-wrap gap-5 p-5 border border-solid border-[grey] rounded-xl'>
                    <CustomValueTextField label={"Requisition Date"} value={""} />
                    <CustomValueTextField label={"Payback Period"} value={""} />
                    <CustomValueTextField label={"Return On Investment"} value={""} />
                    <CustomValueTextField label={"Site Delivery Date*"} value={""} />
                    <CustomValueTextField label={"Installation Date*"} value={""} />
                    <div className='flex flex-wrap gap-5'>
                        <CustomValueTextField multiline={true} label={"Functional Utility/Performance"} value={""} />
                        <CustomValueTextField multiline={true} label={"Brief Description of Assets"} value={""} />
                        <CustomValueTextField multiline={true} label={"Supplier's Name with Address"} value={""} />
                        <CustomValueTextField multiline={true} label={"Key User"} value={""} />
                        <CustomValueTextField multiline={true} label={"Additional Note"} value={""} />
                        <CustomValueTextField multiline={true} label={"LD Clause"} value={""} />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-3'>
                <span className='text-xl font-bold'>Asset's Listings</span>
                <AssetListing />
            </div>
        </div>
    )
}

const AssetListing = () => {
    const thead = [
        "Nature of Assets",
        "Asset Type",
        "Requirement",
        "Justification",
        "Present Status",
        "Specification",
    ]
    return (
        <div className='w-fit'>
            <Table thead={thead}
                tbody={[1, 2, 3, 4]?.map((g, i) => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td>{"Nature of Assets"}</td>
                            <td>{"Asset Type"}</td>
                            <td>{"Requirement"}</td>
                            <td>{"Justification"}</td>
                            <td>{"Present Status"}</td>
                            <td>{"Specification"}</td>
                        </tr>
                    )
                })} />
        </div>
    )
}


const ApprovalSection = ({ control, errors, register, watch, handleSubmit, onSubmit }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref },
                    fieldState: { isTouched, isDirty, error },
                }) => (
                    <FormControl error={!!errors.gender}>
                        <FormLabel className='mt-[-.6rem]' id="demo-row-radio-buttons-group-label">Status</FormLabel>
                        <RadioGroup
                            className='mt-[-.1rem]'
                            {...register('gender')}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}>
                            <FormControlLabel value="0" control={<Radio size='small' />} label="Ask Clarification" />
                            <FormControlLabel value="1" control={<Radio size='small' />} label="Reject" />
                            <FormControlLabel value="2" control={<Radio size='small' />} label="Approve" />
                        </RadioGroup>
                        <FormHelperText>{errors.gender && errors.gender.message}</FormHelperText>
                    </FormControl>
                )}
                name="gender"
                control={control}
                rules={{ required: true }}
            />
        </form>
    )
}

const CustomValueTextField = ({ label, value, multiline }) => {
    return (
        <TextField multiline={multiline || false} rows={2} className="w-[20rem]" value={value} label={label} size={"small"} />
    )
}

const CustomTextField = ({ name, label, errors, register, watch, multiline, rows }) => {
    return (
        <TextField multiline={multiline || false} rows={rows || 2} key={label} value={watch(name)} label={label} size={"small"}  {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
    )
}

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='w-fit no-underline rounded-full p-2 h-fit border-[#ffffff] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#fff] text-[15px] no-underline ml-2'>{btnName}</span>}
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

const CustomTextFieldWithIcon = ({ name, label, errors, register, watch, multiline }) => {
    return (
        <TextField
            // InputProps={{
            //     endAdornment: (
            //         <ButtonComponent icon={<AiOutlineUpload color='white' size={"23"} />} btnName={"Upload"} />
            //         // <Button variant='contained' startIcon={<SearchIcon />}>Upload </Button>
            //     ),
            // }}
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






















