import { useParams } from 'react-router-dom'
import { api } from '../../Helper Components/Api';
import axios from 'axios'
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { CloudUpload } from 'tabler-icons-react';
import {
    styled, Stack, Typography, Card, CardContent, TextField, Divider, Button, Autocomplete, InputAdornment, IconButton
} from '@mui/material'

import { useForm, Controller, get } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../../Style/UserManagement.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppContext } from '../../App'
import BackArrow from '../../Helper Components/SideComponent'
import { CapexErrorSchema } from '../../Form Error Schema/CapexErrorSchema'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PreFilledSubForm from '../PreFilledSubForm';
import BudgetBar from '../BudgetBar';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Table from '../../Helper Components/Table';
import {
    TbMoneybag
} from 'react-icons/tb';
import TipTool from '../../Helper Components/TipTool';
import { MdDeleteOutline, MdRefresh } from 'react-icons/md';
import { asset_type, budgeted_type, nature_of_assets, payback_period_return_of_investment, static_val } from '../../Static/StaticValues';
import { RxCross2 } from 'react-icons/rx';
import { getCookies } from '../../Helper Components/CustomCookies';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Input = styled('input')({
    display: 'none',
});

export default function Form() {
    const { budget_id } = useParams()
    const { assets, setAssets, setBtnSaving, setSnackBarPopUp } = useContext(AppContext)
    const ErrorSchema = CapexErrorSchema
    const inputFile = useRef(null)
    const [preFilled, setPreFilled] = useState(true)
    const [tktFiles, setTKTFiles] = useState([])

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {
            nature_of_requirement: "",
            purpose: "",
            payback_period: "",
            return_on_investment: "",
            requisition_date: moment().format("YYYY-MM-DD"),
            capex_for_which_department: "",
            total_cost: "",
            site_delivery_date: "",
            installation_date: "",
            comment1: "",
            comment2: "",
            comment3: "",
            comment4: "",
            comment5: "",
            comment6: "",
            comment7: "",
            // nature_of_assets: "",
            // asset_type: "",
            // requirement: "",
            // justification: "",
            // present_status: "",
            // specification: "",
        }
    })

    const onSubmit = async (submit) => {
        try {
            const formData = new FormData();
            const data = ({
                ...submit,
                budget_id: budget_id,
                raised_by: getCookies()[0],
                requisition_date: moment(submit.requisition_date).format("YYYY-MM-DD"),
                site_delivery_date: moment(submit.site_delivery_date).format("YYYY-MM-DD"),
                installation_date: moment(submit.installation_date).format("YYYY-MM-DD"),
                asset_listings: JSON.stringify(assets),
            });
            console.log(JSON.stringify(data))
            tktFiles.forEach((file, index) => {
                formData.append(`user_file`, file);
                formData.append(`file${index + 1}`, file);
            });

            Object.entries(data).map((x) => {
                formData.append(x[0], x[1])
            })
            const res = await axios.post(api.capex.create_capex, formData)
            console.log({ res });
            if (res.data.status === 200) {
                setSnackBarPopUp({ state: true, message: "Capex Added", severity: 's' })
                setBtnSaving(true)
                setTimeout(() => {
                    window.location.href = "/capex/list"
                    setBtnSaving(false)
                    setSnackBarPopUp({ state: false, message: "" })
                }, 1000)
            }
        } catch (e) {
            console.log("error in sending data", e);
        }
    }

    const deleteFiles = (g) => {
        let arr = tktFiles.filter(function (item) {
            return item.name !== g
        })
        setTKTFiles((tktFiles) => {
            return [...arr]
        })
    }

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setTKTFiles(files);
    };

    const _plant_dept = useQuery(['plant_dept'], async () => {
        const data = axios.get(api.utils.dept_plant)
        return data
    })


    return (
        <div className='mt-20'>
            <BackArrow location={"/capex/list"} title={"Capex Form - Requester"} />
            <div className='p-10 grid gap-5'>
                <div>
                    <BudgetBar />
                </div>
                <Divider />
                <div className='w-fit p-4'>
                    <Button onClick={() => setPreFilled(!preFilled)} endIcon={preFilled ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />} fullWidth color="primary" variant="contained" type="submit">{preFilled ? "View More" : "View Less"} {"TO See Budget Details"}</Button>
                </div>
                <div className={`${preFilled && "hidden transition-opacity duration-[600ms]"}`}>
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Budget Details"}</span>
                    <PreFilledSubForm />
                    <Divider />
                </div>
                <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Fill in Capex Details"}</span>
                <form className='flex flex-wrap gap-5 p-4' onSubmit={handleSubmit(onSubmit)}>
                    <CustomTextField label={"Nature Of Requirement"} name={"nature_of_requirement"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Purpose"} name={"purpose"} errors={errors} register={register} watch={watch} />
                    <RequestionDate disabled={true} label={"Requisition Date*"} name={"requisition_date"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomAutoComplete control={control} errors={errors} label={"Capex For Which Department"} name={"capex_for_which_department"} options={_plant_dept?.data?.data?.plant_data || []} />
                    <CustomAutoComplete control={control} errors={errors} label={"Payback Period"} name={"payback_period"} options={payback_period_return_of_investment} />
                    <CustomAutoComplete control={control} errors={errors} label={"Return On Investment"} name={"return_on_investment"} options={payback_period_return_of_investment} />
                    {/* <CustomAutoComplete control={control} errors={errors} label={"Budget Type"} name={"budget_type"} options={budgeted_type} /> */}
                    <CustomTextField label={"Total Cost (₹ in Lakhs)"} name={"total_cost"} errors={errors} register={register} watch={watch} />
                    <CustomDate label={"Site Delivery Date*"} name={"site_delivery_date"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomDate label={"Installation Date*"} name={"installation_date"} errors={errors} control={control} watch={watch} register={register} />
                    <div className='grid gap-5'>
                        <div className='flex flex-wrap gap-5 '>
                            <CustomTextField multiline={true} label={"Functional Utility/Performance"} name={"comment1"} errors={errors} register={register} watch={watch} />
                            <CustomTextField multiline={true} label={"Brief Description of Assets"} name={"comment2"} errors={errors} register={register} watch={watch} />
                            <CustomTextField multiline={true} label={"Supplier's Name with Address"} name={"comment3"} errors={errors} register={register} watch={watch} />
                            <CustomTextField multiline={true} label={"Key User"} name={"comment4"} errors={errors} register={register} watch={watch} />
                            <CustomTextField multiline={true} label={"Additional Note"} name={"comment5"} errors={errors} register={register} watch={watch} />
                            <CustomTextField multiline={true} label={"LD Clause"} name={"comment6"} errors={errors} register={register} watch={watch} />
                        </div>
                        <Divider />
                        <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Add Assets"}</span>
                        <AssetListing control={control} errors={errors} register={register} watch={watch} getValues={getValues} setValue={setValue} />
                        <Divider />
                        <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Additionals"}</span>
                        <div className='flex gap-4 '>
                            <CustomTextField rows={4} multiline={true} label={"Short Attachment Description"} name={"comment7"} errors={errors} register={register} watch={watch} />
                            <div className='flex gap-4 '>
                                <Card onClick={onButtonClick} className="ts-card" style={{ cursor: "pointer" }} >
                                    <CardContent  >
                                        <Typography className="ts-card-typo" sx={{ fontSize: 12 }} >
                                            <CloudUpload
                                                size={35}
                                                strokeWidth={2}
                                                color={'grey'}
                                            />
                                        </Typography>
                                        <Typography className="ts-card-typo" variant="h5" component="div">
                                            <Stack direction="row" alignItems="center">
                                                <label htmlFor="contained-button-file">
                                                    <Input onChange={(e) => handleFileChange(e)} accept="image/jpeg,image/png,application/pdf" type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                                                    <Typography sx={{ fontWeight: "bold" }} className="ts-card-typo abs" variant="body2">
                                                        Upload files*
                                                    </Typography>
                                                </label>
                                            </Stack>
                                        </Typography>
                                        <Typography sx={{ fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
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
                        </div>
                    </div>
                    <div className='w-fit'>
                        <LoadingButtonWithSnack beforeName={"Submit"} afterName={"Submitting..."} />
                    </div>
                </form>
            </div>
        </div>
    )
}

const AssetListing = ({ control, errors, register, watch, getValues, setValue }) => {
    const { assets, setAssets } = useContext(AppContext)
    const thead = [
        "Nature of Assets",
        "Asset Type",
        "Requirement",
        "Justification",
        "Present Status",
        "Specification",
    ]
    let obj = {}
    function handleDelete(g) {
        let arr = assets.filter(function (item) {
            return item.requirement !== g
        })
        setAssets((assets) => {
            return [...arr]
        })
    }

    function handleAddAsset() {
        ["nature_of_assets",
            "asset_type",
            "requirement",
            "justification",
            "present_status",
            "specification"].map((val) => {
                if (val) {
                    obj[val] = getValues(val)
                }
            })
        const val = Object.values(obj).map(x => {
            if (x) {
                return x
            } return 0
        })
        !val.includes(0) && (setAssets([...assets, obj]), clearAll())
    }

    function clearAll() {
        ["nature_of_assets",
            "asset_type",
            "requirement",
            "justification",
            "present_status",
            "specification"].map((val) => {
                setValue(val, "")
            })

    }

    return (
        <div className='grid gap-5 ' >
            <div className='flex gap-5 flex-wrap shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px] p-5 rounded-2xl'>
                <CustomAutoComplete control={control} errors={errors} label={"Nature of Assets*"} name={"nature_of_assets"} options={nature_of_assets} />
                <CustomAutoComplete control={control} errors={errors} label={"Asset Type*"} name={"asset_type"} options={asset_type} />
                <CustomTextField label={"Requirement*"} name={"requirement"} errors={errors} register={register} watch={watch} />
                <CustomTextField label={"Justification*"} name={"justification"} errors={errors} register={register} watch={watch} />
                <CustomTextField label={"Present Status*"} name={"present_status"} errors={errors} register={register} watch={watch} />
                <CustomTextField label={"Specification*"} name={"specification"} errors={errors} register={register} watch={watch} />
                <ButtonComponent onClick={handleAddAsset} icon={<TbMoneybag color='white' size={"23"} />} btnName={"Add Assets"} />
                <ButtonComponent onClick={clearAll} icon={<MdRefresh color='white' size={"23"} />} btnName={"Clear All"} />
            </div>
            <div className='w-fit grid gap-5  '>
                <div className='w-fit '>
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[1.5rem]'>{"Asset List"}</span>
                </div>
                <Table thead={thead}
                    tbody={assets?.map((g, i) => {
                        return (
                            <tr className='table-wrapper' key={i}>
                                <td>{g.nature_of_assets}</td>
                                <td>{g.asset_type}</td>
                                <td>{g.requirement}</td>
                                <td>{g.justification}</td>
                                <td>{g.present_status}</td>
                                <td>{g.specification}</td>
                                <td className='delete' onClick={() => handleDelete(g.requirement)}>
                                    <TipTool body={< >
                                        <IconButton>
                                            <MdDeleteOutline color='#f08080' size={22} />
                                        </IconButton>
                                    </>} title={"Delete"} />
                                </td>
                            </tr>
                        )
                    })} />
            </div>
        </div>)
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
                    className="w-[20rem]"
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
const CustomTextField = ({ name, label, errors, register, watch, multiline, rows }) => {
    return (
        <TextField multiline={multiline || false} rows={rows || 2} key={label} className="w-[20rem]" value={watch(name)} label={label} size={"small"}  {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
    )
}
const CustomDate = ({ register, name, label, errors, control, watch }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className='w-[20rem]'
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
const RequestionDate = ({ register, name, label, errors, control, watch, disabled }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    disabled={disabled}
                    className='w-[20rem]'
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
const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='whitespace-nowrap no-underline rounded-full p-2 h-fit border-[#ffffff] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#fff] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}
































