import { useParams, useSearchParams } from 'react-router-dom'
import { api } from '../../Helper Components/Api';
import axios from 'axios'
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import moment from 'moment';
import React, { useContext, useEffect, useState, useRef } from 'react'
import {
    styled, Stack, Typography, Card, CardContent, TextField, Divider, Button, Autocomplete, InputAdornment, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, FormHelperText, Radio, Drawer
} from '@mui/material'
import { useForm, Controller, get } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../../Style/UserManagement.css'
import BackArrow from '../../Helper Components/SideComponent'
import { ApproverCapexErrorSchema } from '../../Form Error Schema/CapexErrorSchema'
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
import { MdBrowserUpdated, MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AppContext } from '../../App';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import { getCookies } from '../../Helper Components/CustomCookies';
import { forceDownload } from '../../Static/StaticValues';
import EditCapex from '../EditCapex';
import { IoMdArrowBack } from 'react-icons/io';
import IMAGES from '../../assets/Image/Image';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Input = styled('input')({
    display: 'none',
});

export default function Form() {
    const { budget_id, capex_id } = useParams()
    const { budget, setDrawerStatus, setBtnSaving, setSnackBarPopUp } = useContext(AppContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const capex_raised_by = searchParams.get('raised_by');

    const ErrorSchema = ApproverCapexErrorSchema
    const [preFilled, setPreFilled] = useState(true)
    const [capexDetail, setCapexDetail] = useState([])
    const [componentAccess, setComponentAccess] = useState({})
    const queryClient = useQueryClient()

    const response = useQuery(['capex-data'], async () => {
        const data = await axios.get(`${api.capex.capex_by_id}/${capex_id}/?woosee=${getCookies()[0]}`)
        setComponentAccess(data?.data?.view_access)
        setCapexDetail(data?.data?.data);
        return data
    }, { staleTime: Infinity })

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {
            capex_status: "",
            comments: ""
        }
    })
    const onSubmit = async (submit) => {
        const data = {
            budget_id, capex_id,
            approver_status: getValues('capex_status'),
            approver_comment: getValues('comments'),
            user_no: getCookies()[0]
        };

        const res = await axios.put(`${api.capex.capex_by_id}/${capex_id}/`, data)
        if (res.data.status_code === 200) {
            setSnackBarPopUp({ state: true, message: "Submitted" })
            setBtnSaving(true)
            setTimeout(() => {
                setSnackBarPopUp({ state: false, message: "" })
                window.location.href = "/capex/list"
            }, 2000)
        }
    }

    function invalidateData() {
        queryClient.invalidateQueries(['capex-data'])
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

    if (response?.isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <div className='mt-20 '>
            <BackArrow location={"/capex/list"} title={"Capex Form - Approver"} />
            <div className='p-10 grid grid-cols-[2fr_1fr] gap-20'>
                <div className='h-fit grid gap-5  '>
                    {!response.isLoading ? [{ ...response?.data?.data?.data, ...budget }].map((c, i) => {
                        return (
                            <div key={i} className=' grid grid-cols-[repeat(2,1fr)] gap-5 '>
                                <CustomValueTextField size={true} label={"Nature Of Requirement"} value={c.nature_of_requirement} />
                                <CustomValueTextField size={true} label={"Purpose"} value={c.purpose} />
                                <CustomValueTextField size={true} label={"Raised By"} value={capex_raised_by} />
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
                                        <span className='hover:underline hover:text-[blue] hover:cursor-pointer' onClick={() => downloadWithAxios(c.mod_file_path, c.mod_file_name)}>{c.mod_file_name}</span>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        {preFilled ?
                            <ButtonComponent onClick={() => setPreFilled(!preFilled)} icon={<MdKeyboardDoubleArrowUp color='#fff' size={22} />} btnName={"Click for Less Information"} />
                            :
                            <ButtonComponent onClick={() => setPreFilled(!preFilled)} icon={<MdKeyboardDoubleArrowDown color='#fff' size={22} />} btnName={"Click for More Information"} />
                        }
                        <div >
                            <TemporaryDrawer body={<EditCapex capexDetail={capexDetail} invalidateData={invalidateData} />} />
                        </div>
                        <ButtonComponent onClick={() => setDrawerStatus(true)} icon={<MdBrowserUpdated color='#fff' size={22} />} btnName={"Update Details"} />
                    </div>
                    {preFilled && <div >
                        <MoreInformation details={[{ ...capexDetail, ...budget }]} />
                    </div>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-[repeat(1,1fr)] gap-5 h-fit '>
                    <div className='grid grid-cols-[repeat(1,1fr)] pl-0 pr-4 pt-4 pb-0 gap-4'>
                        <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-lg p-2'>
                            <span className='text-lg'>Comment History</span>
                            <VerticalLinearStepper response={response.data?.data?.data?.approval_flow} />
                        </div>
                        <Divider />
                        {componentAccess.approval_status && <div className='grid gap-3'>
                            <Controller
                                render={({ field: { onChange, onBlur, value, name, ref },
                                    fieldState: { isTouched, isDirty, error },
                                }) => (
                                    <FormControl error={!!errors.capex_status}>
                                        <FormLabel className='mt-[-.6rem]' id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                        <RadioGroup
                                            className='mt-[-.1rem]'
                                            {...register('capex_status')}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}>
                                            <FormControlLabel value="0" control={<Radio size='small' />} label="Approve" />
                                            <FormControlLabel value="1" control={<Radio size='small' />} label="Reject" />
                                            <FormControlLabel value="2" control={<Radio size='small' />} label="Close" />
                                            <FormControlLabel value="3" control={<Radio size='small' />} label="Ask for justifcation" />
                                        </RadioGroup>
                                        <FormHelperText>{errors.capex_status && errors.capex_status.message}</FormHelperText>
                                    </FormControl>
                                )}
                                name="capex_status"
                                control={control}
                                rules={{ required: true }}
                            />
                        </div>}
                        {componentAccess.comments_box && <CustomTextFieldWithIcon multiline={4} label={"Comments*"} name={"comments"} errors={errors} register={register} watch={watch} />}
                        {componentAccess.submit_btn && <div >
                            <LoadingButtonWithSnack beforeName={"Submit"} afterName={"Submiting..."} />
                        </div>}
                    </div>
                </form>
            </div >
        </div >
    )
}

const MoreInformation = ({ details }) => {
    return (
        <div className='grid grid-cols-1 gap-10'>
            <div className='grid grid-cols-1 gap-3'>
                <Divider />
                <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Budget Details"}</span>
                <div className='rounded-xl p-1 '>
                    <PreFilledSubForm />
                </div>
            </div>
            {details.map((c, x) => {
                console.log(c);
                return (
                    <div key={x} className='grid grid-cols-1 gap-3'>
                        <Divider />
                        <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Capex Details"}</span>
                        <div className='flex flex-wrap gap-5 p-5 '>
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
                            <Divider />
                            <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Asset List"}</span>
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
            className=' w-fit mt-5 no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline '>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}


function VerticalLinearStepper({ response }) {
    return (
        <Box className=" max-h-[30vh] overflow-y-scroll" >
            <Stepper orientation="vertical">
                {response?.map((step, index) => (
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
    if (val === "3") {
        return (<div className='text-xs w-fit flex justify-center px-2 py-1 rounded-xl bg-orange-100'><p className='mt-[0.1rem]'>Ask For Justification</p></div>)
    }
    else {
        return "-"
    }
}

const CustomTextFieldWithIcon = ({ name, label, errors, register, watch, multiline }) => {
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





function TemporaryDrawer({ body }) {
    const { drawerStatus, setDrawerStatus } = useContext(AppContext)

    const list = (anchor) => (
        <Box
            role="presentation"
        >
            <div className=' w-[50rem]'>
                <div className='flex gap-5 ml-5 '>
                    <ButtonComponent icon={<IoMdArrowBack color='white' size={"15"} />} btnName={"Back"} onClick={() => setDrawerStatus(false)} />
                    <span className='text-3xl mt-5'>Update Capex</span>
                </div>
                {body}

            </div>
        </Box>
    );

    return (
        <div >
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={"right"}
                        open={drawerStatus}
                        onClose={() => setDrawerStatus(false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
















