import { api } from '../Helper Components/Api';
import axios from 'axios'
import moment from 'moment';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState, useMemo } from 'react'
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, Checkbox, Divider
} from '@mui/material'
import { useForm, Controller, get } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../Style/UserManagement.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch';
import { AppContext } from '../App'
import BackArrow from '../Helper Components/SideComponent'
import { UserErrorSchema } from '../Form Error Schema/UserErrorSchema'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab';
const ErrorSchema = UserErrorSchema
import LoadingButtonWithSnack from '../Helper Components/LoadingButtonWithSnack';
import { org } from '../Static/StaticValues';


function CreateUserForm() {
    const { usermanagement, setUsermanagement, setSnackBarPopUp, setBtnSaving } = useContext(AppContext)
    const [managerList, setManagerList] = useState([])

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: usermanagement,
    })

    const user_perm = useQuery(["user-permission"], async () => {
        return await axios.get(api.user.user_permissions)
    }, { staleTime: Infinity })

    const plant_dept = useQuery(['plant_dept'], async () => {
        const data = axios.get(api.utils.dept_plant)
        return data
    }, { staleTime: Infinity })



    const manager_list = useQuery(['manager_list'], async () => {
        const data = await axios.get(`${api.user.manager_list}/?department=${getValues('department')}`)
        setManagerList([...data?.data.map(x => { return x.name })])
    }, { staleTime: Infinity })



    const onSubmit = async (submit) => {
        try {
            const data = ({
                ...submit,
                dob: moment(submit.dob.$d).format("YYYY-MM-DD"),
                end_date: moment(submit.end_date.$d).format("YYYY-MM-DD"),
                start_date: moment(submit.start_date.$d).format("YYYY-MM-DD"),
                user_status: usermanagement.user_status,
                module_permission: usermanagement.module_permission
            });
            const response = await axios.post(api.user_management.post_data, data)
            console.log(response?.data);
            if (response?.data.status == 200) {
                setSnackBarPopUp({ state: true, message: "User Cretaed", severity: 's' })
                setBtnSaving(true)
                setTimeout(() => {
                    window.location.href = "/user/management/list"
                    setSnackBarPopUp({ state: false, message: "", severity: 's' })
                    setBtnSaving(false)
                }, 1 * 1000)
            }

        } catch (error) {
            console.log("err", error);
        }
    }


    useEffect(() => {
        setUsermanagement({ ...usermanagement, btn_type: "0" })
    }, [])

    return (
        <form className='mt-20' onSubmit={handleSubmit(onSubmit)}>
            <BackArrow title={"User Management - Create User"} location={'/user/management/list'} />
            <div className='grid grid-cols-[repeat(1,1fr)] gap-10 p-[3rem]'>
                <div className='flex flex-wrap gap-7'>
                    <CustomTextField label={"First Name*"} name={"first_name"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Last Name*"} name={"last_name"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Mobile Number*"} name={"ph_no"} errors={errors} register={register} watch={watch} />
                    <CustomDate label={"Date Of Birth*"} name={"dob"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomTextField label={"Emergency Contact*"} name={"emerg_contact"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Address*"} name={"address"} errors={errors} register={register} watch={watch} />

                    <Controller
                        render={({ field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                        }) => (
                            <FormControl error={!!errors.gender}>
                                <FormLabel className='mt-[-.6rem]' id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    className='mt-[-.1rem]'
                                    {...register('gender')}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}>
                                    <FormControlLabel value="0" control={<Radio size='small' />} label="Female" />
                                    <FormControlLabel value="1" control={<Radio size='small' />} label="Male" />
                                </RadioGroup>
                                <FormHelperText>{errors.gender && errors.gender.message}</FormHelperText>
                            </FormControl>
                        )}
                        name="gender"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
                <Divider textAlign='left'></Divider>
                <div className='flex flex-wrap gap-7'>
                    <CustomDate label={"End Date"} name={"end_date"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomDate label={"Start Date*"} name={"start_date"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomTextField label={"Employment Number*"} name={"emp_no"} errors={errors} register={register} watch={watch} />
                    <CustomAutoCompleteDepartment control={control} errors={errors} name={"department"} label={"Department"} options={plant_dept?.data?.data?.department || []} />
                    <CustomAutoComplete control={control} errors={errors} name={"plant_name"} label={"Plant Name"} options={plant_dept?.data?.data?.plant_data || []} />
                    <CustomAutoComplete control={control} errors={errors} name={"manager"} label={"Manager"} options={managerList} />
                    <CustomAutoComplete control={control} errors={errors} name={"job_type"} label={"Job Type"} options={['0', "1", "2", "3", "4"]} />
                    <CustomAutoComplete control={control} errors={errors} name={"organization"} label={"Organization"} options={org} />
                </div>
                <Divider textAlign='left'></Divider>
                <div className='flex flex-wrap gap-7'>
                    <CustomTextField label={"Employee Designation*"} name={"emp_designation"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Email*"} name={"email_id"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Password*"} name={"password"} errors={errors} register={register} watch={watch} />
                    <CustomAutoComplete control={control} errors={errors} name={"user_role"} label={"User Roles"} options={["0", "1", "3", "4"]} />
                    <div className='grid grid-cols-[repeat(1,1fr)]'>
                        <FormControlLabel {...register('user_status')} control={<Switch checked={usermanagement.user_status}
                            onChange={(e) => { setUsermanagement({ ...usermanagement, user_status: !usermanagement.user_status }) }} />
                        }
                            label="User Status" />
                        {usermanagement.user_status === true ? <p className='text-[0.8rem] text-[#3c993c] font-[bolder]'>Active</p> : <p className='text-[0.8rem] text-[red] font-[bolder]'>In Active</p>}
                    </div>

                    <div className='w-[50rem]'>
                        <Autocomplete
                            multiple
                            limitTags={5}
                            id="checkboxes-tags-demo"
                            options={
                                !user_perm.isLoading ? [...user_perm?.data?.data] : []
                            }
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            onChange={(e, x) => {
                                setUsermanagement({ ...usermanagement, module_permission: [...x] })
                            }}
                            value={usermanagement.module_permission}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option}
                                </li>
                            )}
                            size={"small"}
                            renderInput={(params) => (
                                <TextField {...params} label="Module Permission" placeholder="Module Permission"
                                />
                            )}
                        />
                    </div>

                </div>
                <LoadingButtonWithSnack beforeName={"Create User"} afterName={"Creating...."} />
            </div>
            <div>
            </div>
        </form>
    )
}

export default CreateUserForm

function handleOnChange() {
    const manager_list = useQuery(['manager_list'], async () => {
        const data = axios.get(`${api.user.manager_list}/?department=${getValues('department')}`)
        return data
    }, { staleTime: Infinity })
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
const CustomAutoCompleteDepartment = ({ name, label, options, control, errors }) => {

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

const CustomTextField = ({ name, label, errors, register, watch }) => {
    return (
        <TextField key={label} className="w-[20rem]" value={watch(name)} label={label} size={"small"}  {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
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
