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

// function UserManagement({ createData }) {
function UserManagement({ first_name, last_name, ph_no, }) {

    const { usermanagement, setUsermanagement } = useContext(AppContext)

    const ErrorSchema = UserErrorSchema

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
        defaultValues: usermanagement
    })


    const onSubmit = async (submitData) => {
        console.log(usermanagement);
        console.log(getValues('dob'));

        // createData()
    }

    useEffect(() => {
        // setValue('first_name', 'usermanagement.first_name')
        // setValue('dob', '07/06/1996')
    }, [])


    const CustomAutoComplete = ({ name, label, options }) => {
        return (
            <Controller
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
                                error={errors.name} helperText={errors.name && errors.name.message}
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

    return (
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
            <BackArrow title={usermanagement.app_name} location={usermanagement.go_back_loc} />
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
                            />
                        </LocalizationProvider>
                    )}
                        name="dob"
                        control={control}
                        rules={{ required: true }}
                    />
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
                    <TextField {...register('emerg_contact')} error={!!errors.emerg_contact} helperText={errors.emerg_contact && errors.emerg_contact.message} label="Emergency Contact*" size={"small"} />
                    <TextField {...register('address')} error={!!errors.address} helperText={errors.address && errors.address.message} label="addressess*" size={"small"} />
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
                                        helperText: errors.start_date && errors.start_date.message,
                                        error: !!errors.start_date
                                    },

                                }}
                                {...register('start_date')}
                                label="Start Date*"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        </LocalizationProvider>
                    )}
                        name="start_date"
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
                                        helperText: errors.end_date && errors.end_date.message,
                                        error: !!errors.end_date
                                    },

                                }}
                                {...register('end_date')}
                                label="End Date*"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        </LocalizationProvider>
                    )}
                        name="end_date"
                        control={control}
                        rules={{ required: true }}
                    />
                    <TextField className='textfield' label="Employment Number*" size={"small"} {...register('emp_no')} error={!!errors.emp_no} helperText={errors.emp_no && errors.emp_no.message} />

                    <CustomAutoComplete name={"department"} label={"Department"} options={["1", "2", "3", "4"]} />
                    <CustomAutoComplete name={"plant_name"} label={"Plant Name"} options={["1", "2", "3", "4"]} />
                    <CustomAutoComplete name={"manager"} label={"Manager"} options={["1", "2", "3", "4"]} />
                    <CustomAutoComplete name={"employment_type"} label={"Employment Type"} options={["1", "2", "3", "4"]} />
                    <CustomAutoComplete name={"job_type"} label={"Job Type"} options={["1", "2", "3", "4"]} />
                </div>
            </div>
            <span className='hr'></span>
            <div className='user-management-container'>
                <div className='user-managment-component'>
                    <TextField {...register('emp_designation')} error={!!errors.emp_designation} helperText={errors.emp_designation && errors.emp_designation.message} label="Employee Designation*" size={"small"} />
                    <TextField {...register('email_id')} error={!!errors.email_id} helperText={errors.email_id && errors.email_id.message} label="Email*" size={"small"} />
                    <TextField {...register('password')} error={!!errors.password} helperText={errors.password && errors.password.message} label="Password*" size={"small"} />
                    <div className='grid grid-cols-[repeat(1,1fr)]'>
                        <FormControlLabel {...register('user_status')} control={<Switch checked={usermanagement.user_status} onClick={(e) => {
                            setUsermanagement({ ...usermanagement, user_status: !usermanagement.user_status })
                        }} />} label="User Status" />
                        {usermanagement.user_status ? <p className='text-[0.8rem] text-[#3c993c] font-[bolder]'>Active</p> : <p className='text-[0.8rem] text-[red] font-[bolder]'>In Active</p>}
                    </div>
                    <div className='w-80'>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            id="checkboxes-tags-demo"
                            options={["Capex", "User Management"]}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            // getoptionselected={(option, value) => option.value === value.value}
                            onChange={(e, x) => {
                                // setUserPermission([...x])
                                // console.log([...x]);
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
                    <CustomAutoComplete name={"user_role"} label={"User Roles"} options={["User", "Ticket Admin", "Sanvad Admin", "Super Admin"]} />
                </div>
            </div>
            {usermanagement.btn_type == "0" ?
                <div className='user-management-button'>
                    <Button fullWidth color="primary" variant="contained" type="submit">Save & Send Credentials to User</Button>
                </div> :
                <div className='user-management-button'>
                    <Button fullWidth color="primary" variant="contained" type="submit">Update User</Button>
                </div>
            }
        </form>
    )
}

export default UserManagement