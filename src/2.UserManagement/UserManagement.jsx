import React, { useContext, useEffect, useState } from 'react'
import {
    Box, Button, FormHelperText, TextField, Autocomplete, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, Checkbox
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
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
export default function UserManagement() {

    const { umStatus, setUMStatus } = useContext(AppContext)
    const [empID, setEmpID] = useState("")
    const ErrorSchema = UserErrorSchema



    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: {
            module_perm: [],
            first_name: "",
            last_name: "",
            ph_no: "",
            dob: "",
            gender: "",
            emerg_contact: "",
            addr: "",
            s_date: "",
            e_date: "",
            emp_no: "",
            dept: "",
            plant_name: "",
            manager: "",
            job_type: "",
            employment_type: "",
            emp_desig: "",
            email_id: "",
            password: "",
            user_stat: "",
        }
    })


    const onSubmit = (submitData) => {
        console.log(submitData);
    }

    return (
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
            <BackArrow title={"User Management - Create New User"} />
            <div className='user-management-container'>
                <div className='user-managment-component'>
                    <TextField className="textfield" label="First Name*" size={"small"}  {...register('first_name')} error={!!errors.first_name} helperText={errors.first_name && errors.first_name.message} />
                    <TextField className="textfield" label="Last Name*" size={"small"} {...register('last_name')} error={!!errors.last_name} helperText={errors.last_name && errors.last_name.message} />
                    <TextField className="textfield" {...register('ph_no')} error={!!errors.ph_no} helperText={errors.ph_no && errors.ph_no.message} label="Mobile Number*" size={"small"} />
                    <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{
                                    textField:
                                    {
                                        size: 'small',
                                        helperText: errors.dob && errors.dob.message,
                                        error: !!errors.dob
                                    },
                                }}
                                {...register('dob')}
                                label="Date Of Birth*"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                inputRef={ref}
                            />
                        </LocalizationProvider>
                    )}
                        name="dob"
                        control={control}
                        rules={{ required: true }}
                    />
                    <Controller
                        render={({
                            field: { onChange, onBlur, value, name, ref },
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
                                    inputRef={ref}
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
                    <TextField {...register('emerg_contact')} error={!!errors.emerg_contact} helperText={errors.emerg_contact && errors.emerg_contact.message} label="Emergency Contact*" size={"small"} />
                    <TextField {...register('addr')} error={!!errors.addr} helperText={errors.addr && errors.addr.message} label="Address*" size={"small"} />
                </div>
            </div>
            <span className='hr'></span>
            <div className='user-management-container'>
                <div className='user-managment-component'>
                    <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{
                                    textField:
                                    {
                                        size: 'small',
                                        helperText: errors.s_date && errors.s_date.message,
                                        error: !!errors.s_date
                                    },

                                }}
                                {...register('s_date')}
                                label="Start Date*"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                inputRef={ref}
                            />
                        </LocalizationProvider>
                    )}
                        name="s_date"
                        control={control}
                        rules={{ required: true }}
                    />
                    <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{
                                    textField:
                                    {
                                        size: 'small',
                                        helperText: errors.e_date && errors.e_date.message,
                                        error: !!errors.e_date
                                    },

                                }}
                                {...register('e_date')}
                                label="End Date*"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                inputRef={ref}
                            />
                        </LocalizationProvider>
                    )}
                        name="e_date"
                        control={control}
                        rules={{ required: true }}
                    />
                    <TextField {...register('emp_no')} error={!!errors.emp_no} helperText={errors.emp_no && errors.emp_no.message} label="Employment Number*" size={"small"} onChange={(e) => setEmpID(e.target.value)} />
                    <Autocomplete className="textfield" disablePortal id="combo-box-demo" options={["1", "2", "3", "4"]}
                        renderInput={(params) => <TextField {...params} label="Department*" size={"small"} {...register('dept')} error={errors.dept} helperText={errors.dept && errors.dept.message} />}
                    />
                    <Autocomplete className="textfield" disablePortal id="combo-box-demo" options={["1", "2", "3", "4"]}
                        renderInput={(params) => <TextField {...params} label="Plant Name*" size={"small"} {...register('plant_name')} error={errors.plant_name} helperText={errors.plant_name && errors.plant_name.message} />}
                    />
                    <Autocomplete className="textfield" disablePortal id="combo-box-demo" options={["1", "2", "3", "4"]}
                        renderInput={(params) => <TextField {...params} label="Manager*" size={"small"} {...register('manager')} error={errors.manager} helperText={errors.manager && errors.manager.message} />}
                    />
                    <Autocomplete className="textfield" disablePortal id="combo-box-demo" options={["1", "2", "3", "4"]}
                        renderInput={(params) => <TextField {...params} label="Employment Type*" size={"small"} {...register('employment_type')} error={errors.employment_type} helperText={errors.employment_type && errors.employment_type.message} />}
                    />
                    <Autocomplete className="textfield" disablePortal id="combo-box-demo" options={["1", "2", "3", "4"]}
                        renderInput={(params) => <TextField {...params} label="Job Type*" size={"small"} {...register('job_type')} error={errors.job_type} helperText={errors.job_type && errors.job_type.message} />}
                    />
                </div>
            </div>
            <span className='hr'></span>
            <div className='user-management-container'>
                <div className='user-managment-component'>
                    <TextField {...register('emp_desig')} error={!!errors.emp_desig} helperText={errors.emp_desig && errors.emp_desig.message} label="Employee Designation*" size={"small"} />
                    <TextField {...register('email_id')} error={!!errors.email_id} helperText={errors.email_id && errors.email_id.message} label="Email*" size={"small"} />
                    <TextField {...register('password')} error={!!errors.password} helperText={errors.password && errors.password.message} label="Password*" size={"small"} />
                    <div className='grid grid-cols-[repeat(1,1fr)]'>
                        <FormControlLabel {...register('user_stat')} control={<Switch checked={umStatus} onClick={() => setUMStatus(!umStatus)} />} label="User Status" />
                        {umStatus ? <p className='text-[0.8rem] text-[#3c993c] font-[bolder]'>Active</p> : <p className='text-[0.8rem] text-[red] font-[bolder]'>In Active</p>}
                    </div>
                    <div className='w-80'>
                        <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
                            <Autocomplete
                                multiple
                                limitTags={2}
                                id="checkboxes-tags-demo"
                                options={["1", "2", "3", "4", "5"]}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                getOptionSelected={(option, value) => option.value === value.value}
                                // onChange={(e, v) => console.log(v)}
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
                                        {...register('module_perm')}
                                        error={errors.module_perm}
                                        helperText={errors.module_perm && errors.module_perm.message}
                                    />
                                )}
                            />
                        )}
                            name="module_perm"
                            control={control}
                        />

                    </div>
                </div>
            </div>
            <div className='user-management-button'>
                <Button fullWidth color="primary" variant="contained" type="submit">Save & Send Credentials to User</Button>
            </div>
        </form>
    )
}
