import { api } from '../Helper Components/Api';
import axios from 'axios'
import moment from 'moment';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react'
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, Checkbox
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
import { useMutation } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab';
const ErrorSchema = UserErrorSchema
import { FiSave } from "react-icons/fi";
import { Link } from 'react-router-dom';


function CreateUserForm() {
    const { usermanagement, setUsermanagement, btnSaving, setBtnSaving } = useContext(AppContext)

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: usermanagement,
    })

    const mutation = useMutation({
        mutationFn: async (newTodo) => {
            return await axios.post(api.user_management.post_data, newTodo)
        },
    })


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
            mutation.mutateAsync(data)
            setBtnSaving(true)
            setTimeout(() => {
                window.location.href = "/user/management/list"
            }, 1 * 1000)

        } catch (error) {
            console.log("err", error);
        }
    }


    useEffect(() => {
        setUsermanagement({ ...usermanagement, btn_type: "0", app_name: "User Management - Create User", go_back_loc: "/user/management/list" })
    }, [])

    return (
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
            <BackArrow title={usermanagement.app_name} location={usermanagement.go_back_loc} />
            <div className='user-management-container'>
                <div className='user-managment-component'>
                    <CustomTextField label={"First Name*"} name={"first_name"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Last Name*"} name={"last_name"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Mobile Number*"} name={"ph_no"} errors={errors} register={register} watch={watch} />
                    <CustomDate label={"Date Of Birth*"} name={"dob"} errors={errors} control={control} watch={watch} register={register} />
                    <Controller
                        render={({ field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                        }) => (
                            <FormControl error={!!errors.gender}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
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
                    <CustomTextField label={"Emergency Contact*"} name={"emerg_contact"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Address*"} name={"address"} errors={errors} register={register} watch={watch} />
                </div>
            </div>
            <span className='hr'></span>
            <div className='user-management-container'>
                <div className='user-managment-component'>
                    <CustomDate label={"End Date*"} name={"start_date"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomDate label={"Start Date*"} name={"end_date"} errors={errors} control={control} watch={watch} register={register} />
                    <CustomTextField label={"Employment Number*"} name={"emp_no"} errors={errors} register={register} watch={watch} />
                    <CustomAutoComplete control={control} errors={errors} name={"department"} label={"Department"} options={['0', "1", "2", "3", "4"]} />
                    <CustomAutoComplete control={control} errors={errors} name={"plant_name"} label={"Plant Name"} options={['0', "1", "2", "3", "4"]} />
                    <CustomAutoComplete control={control} errors={errors} name={"manager"} label={"Manager"} options={['0', "1", "2", "3", "4"]} />
                    <CustomAutoComplete control={control} errors={errors} name={"employment_type"} label={"Employment Type"} options={['0', "1", "2", "3", "4"]} />
                    <CustomAutoComplete control={control} errors={errors} name={"job_type"} label={"Job Type"} options={['0', "1", "2", "3", "4"]} />
                    <CustomAutoComplete control={control} errors={errors} name={"organization"} label={"Organization"} options={['0', "1", "2", "3", "4"]} />
                </div>
            </div>
            <span className='hr'></span>
            <div className='user-management-container'>
                <div className='user-managment-component'>
                    <CustomTextField label={"Employee Designation*"} name={"emp_designation"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Email*"} name={"email_id"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Password*"} name={"password"} errors={errors} register={register} watch={watch} />
                    <div className='grid grid-cols-[repeat(1,1fr)]'>
                        <FormControlLabel {...register('user_status')} control={<Switch checked={usermanagement.user_status}
                            onChange={(e) => { setUsermanagement({ ...usermanagement, user_status: !usermanagement.user_status }) }} />
                        }
                            label="User Status" />
                        {usermanagement.user_status === true ? <p className='text-[0.8rem] text-[#3c993c] font-[bolder]'>Active</p> : <p className='text-[0.8rem] text-[red] font-[bolder]'>In Active</p>}
                    </div>
                    <div className='w-80'>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            id="checkboxes-tags-demo"
                            options={["a", "b", "c", "d", "e"]}
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
                    <CustomAutoComplete control={control} errors={errors} name={"user_role"} label={"User Roles"} options={["0", "1", "3", "4"]} />
                </div>
            </div>
            {usermanagement.btn_type == "0" ?
                <div className='user-management-button'>
                    <LoadingButton
                        fullWidths
                        size="small"
                        color="primary" variant="contained" type="submit"
                        loading={btnSaving}
                        loadingPosition="start"
                        startIcon={<FiSave />}
                    >
                        <span className='p-1'>Save & Send Credentials to User</span>
                    </LoadingButton>
                </div> :
                <div className='user-management-button'>
                    <Button fullWidth color="primary" variant="contained" type="submit">Update User</Button>
                </div>
            }
        </form>
    )
}

export default CreateUserForm

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
                    className="textfield"
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
        <TextField key={label} className="textfield" value={watch(name)} label={label} size={"small"}  {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
    )
}
const CustomDate = ({ register, name, label, errors, control, watch }) => {
    return (
        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    inputFormat='DD/MM/YYYY'
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
