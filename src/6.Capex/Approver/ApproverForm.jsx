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
import { useQuery } from '@tanstack/react-query';
import { AppContext } from '../../App';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Input = styled('input')({
    display: 'none',
});

export default function Form() {
    const id = useParams()
    const { budget, setBudget } = useContext(AppContext)
    const ErrorSchema = CapexErrorSchema
    const inputFile = useRef(null)
    const [preFilled, setPreFilled] = useState(true)
    const [uploadFIle, setUploadFile] = useState([])
    const [capexDetail, setCapexDetail] = useState([])
    const { capex_id } = useParams()
    const { data, isLoading } = useQuery(['capex-data'], async () => {
        return await axios.get(`${api.capex.capex_by_id}/${capex_id}/`)
    })

    useEffect(() => {
        if (!isLoading) {
            setCapexDetail(data?.data?.data);
        }
    }, [!isLoading])

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {}
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


    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <div className='mt-5'>
            <BackArrow location={"/capex/list"} title={"Capex Form - Approver"} />
            <div className='p-10 grid grid-cols-[2fr_1fr] gap-20'>
                <div className='h-fit grid gap-5  '>
                    {!isLoading ? [{ ...capexDetail, ...budget }].map((c, i) => {
                        return (
                            <div key={i} className=' grid grid-cols-[repeat(2,1fr)] gap-5 '>
                                <CustomValueTextField size={true} label={"Nature Of Requirement"} value={c.nature_of_requirement} />
                                <CustomValueTextField size={true} label={"Purpose"} value={c.purpose} />
                                <CustomValueTextField size={true} label={"Plant"} value={c.plant} />
                                <CustomValueTextField size={true} label={"Department"} value={c.dept} />
                                <CustomValueTextField size={true} label={"Budgeted Type"} value={c.budget_type} />
                                <CustomValueTextField size={true} label={"Total Cost (₹ in Lakhs)"} value={c.total_cost} />
                            </div>
                        )
                    }) : <LoadingSpinner />}

                    <div>
                        <strong>Uploaded files</strong>
                        <div className=' flex gap-3'>
                            {[{ ...capexDetail, ...budget }].map((c, i) => {
                                return (
                                    <div key={i} className='flex gap-1 '>
                                        <a href={c.user_file}><strong>{i + 1}.</strong> {"file1"}</a>
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
                        <MoreInformation details={[{ ...capexDetail, ...budget }]} />
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

const MoreInformation = ({ details }) => {
    return (
        <div className='grid grid-cols-1 gap-10'>
            <div className='grid grid-cols-1 gap-3'>
                <span className='text-xl font-bold'>Budget Details</span>
                <div className='rounded-xl p-1 border border-solid border-[grey]'>
                    <PreFilledSubForm />
                </div>
            </div>
            {details.map((c, x) => {
                return (
                    <div key={x} className='grid grid-cols-1 gap-3'>
                        <span className='text-xl font-bold'>Capex Details</span>
                        <div className='flex flex-wrap gap-5 p-5 border border-solid border-[grey] rounded-xl'>
                            <CustomValueTextField className="w-[20rem]" label={"Requisition Date"} value={c.requisition_date} />
                            <CustomValueTextField className="w-[20rem]" label={"Payback Period"} value={c.payback_period} />
                            <CustomValueTextField className="w-[20rem]" label={"Return On Investment"} value={c.return_on_investment} />
                            <CustomValueTextField className="w-[20rem]" label={"Site Delivery Date*"} value={c.site_delivery_date} />
                            <CustomValueTextField className="w-[20rem]" label={"Installation Date*"} value={c.installation_date} />
                            <div className='flex flex-wrap gap-5'>
                                <CustomValueTextField className="w-[20rem]" multiline={true} label={"Functional Utility/Performance"} value={c.comment1} />
                                <CustomValueTextField className="w-[20rem]" multiline={true} label={"Brief Description of Assets"} value={c.comment2} />
                                <CustomValueTextField className="w-[20rem]" multiline={true} label={"Supplier's Name with Address"} value={c.comment3} />
                                <CustomValueTextField className="w-[20rem]" multiline={true} label={"Key User"} value={c.comment4} />
                                <CustomValueTextField className="w-[20rem]" multiline={true} label={"Additional Note"} value={c.comment5} />
                                <CustomValueTextField className="w-[20rem]" multiline={true} label={"LD Clause"} value={c.comment6} />
                                <CustomValueTextField className="w-[20rem]" multiline={true} label={"Short Description"} value={c.comment7} />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-3'>
                            <span className='text-xl font-bold'>Asset's Listings</span>
                            <AssetListing asset_listings={c.asset_listings} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const AssetListing = ({ asset_listings }) => {
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
                tbody={asset_listings && JSON.parse(asset_listings).map((g, i) => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td>{g.nature_of_assets}</td>
                            <td>{g.asset_type}</td>
                            <td>{g.justification}</td>
                            <td>{g.present_status}</td>
                            <td>{g.requirement}</td>
                            <td>{g.specification}</td>
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

const CustomValueTextField = ({ label, value, multiline, size, className, ...props }) => {
    return (
        <TextField multiline={multiline || false} rows={2} className={className} {...props} value={String(value)} label={label} size={"small"} />
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
        user: 'Avinash Attarde',
        department: 'IT',
        emp_id: '14112',
        comments: `Please Approve`,
        date: '23/12/2022'
    },
    {
        user: 'LP Bansod',
        department: 'IT',
        emp_id: '00547',
        comments:
            'Approved',
        date: '24/12/2022'
    },
    // {
    //     user: 'user',
    //     department: 'IT',
    //     emp_id: 'emp_id',
    //     comments: `Approved`,
    //     date: '26/12/2022'
    // },
    // {
    //     user: 'user',
    //     department: 'IT',
    //     emp_id: 'emp_id',
    //     comments: `Approved`,
    //     date: '27/12/2022'
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






















