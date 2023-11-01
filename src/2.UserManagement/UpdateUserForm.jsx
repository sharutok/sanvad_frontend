import { useParams } from 'react-router-dom'
import { api } from '../Helper Components/Api';
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner';
import {
  Divider
} from '@mui/material'
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
import LoadingButtonWithSnack from '../Helper Components/LoadingButtonWithSnack';
import BarSnack from '../Helper Components/BarSnack';
import { useQuery } from '@tanstack/react-query';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UpdateUserForm() {
  const { id } = useParams()

  const { usermanagement, setUsermanagement, setBtnSaving, setSnackBarPopUp } = useContext(AppContext)
  const ErrorSchema = UserErrorSchema

  const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
    mode: "onTouched",
    resolver: yupResolver(ErrorSchema),
    defaultValues: usermanagement,
  })


  const getData = async () => {
    const data = await axios.get(`${api.user_management.get_data_id}/${id}`)
    const { first_name, last_name, ph_no, dob, gender, emerg_contact, address, start_date, end_date, emp_no, department, plant_name, manager, job_type, employment_type, emp_designation, email_id, password, organization, user_status, user_role, module_permission } = data.data.data
    setValue('first_name', first_name)
    setValue('last_name', last_name)
    setValue('ph_no', ph_no)
    setValue('gender', gender)
    setValue('emerg_contact', emerg_contact)
    setValue('address', address)
    setValue('dob', moment(dob).format('DD/MM/YYYY'))
    setValue('start_date', moment(start_date).format('DD/MM/YYYY'))
    setValue('end_date', moment(end_date).format('DD/MM/YYYY'))
    setValue('emp_no', emp_no)
    setValue('department', department + "")
    setValue('plant_name', plant_name + "")
    setValue('manager', manager + "")
    setValue('job_type', job_type + "")
    setValue('employment_type', employment_type + "")
    setValue('emp_designation', emp_designation)
    setValue('email_id', email_id)
    setValue('password', password)
    setValue('organization', organization + "")
    setValue('user_role', user_role + "")

    setUsermanagement({
      ...usermanagement,
      app_name: "User Management - Update User",
      btn_type: "1",
      go_back_loc: "/user/management/list",
      user_status, module_permission: [...module_permission],
    })
  }

  const onSubmit = async (submitData) => {

    const value = {
      ...usermanagement,
      first_name: getValues('first_name'),
      last_name: getValues('last_name'),
      ph_no: getValues('ph_no'),
      gender: getValues('gender'),
      emerg_contact: getValues('emerg_contact'),
      address: getValues('address'),
      dob: moment(getValues('dob').$d).format('YYYY-MM-DD'),
      start_date: moment(getValues('start_date').$d).format('YYYY-MM-DD'),
      end_date: moment(getValues('end_date').$d).format('YYYY-MM-DD'),
      emp_no: getValues('emp_no'),
      department: getValues('department'),
      plant_name: getValues('plant_name'),
      manager: getValues('manager'),
      job_type: getValues('job_type'),
      employment_type: getValues('employment_type'),
      emp_designation: getValues('emp_designation'),
      email_id: getValues('email_id'),
      password: getValues('password'),
      organization: getValues('organization'),
      user_role: getValues('user_role'),
    }
    try {
      const response = await axios.put(`${api.user_management.get_data_id}/${id}`, value)
      console.log(response.data);
      if (response.data.status_code === 200) {
        setBtnSaving(true)
        setSnackBarPopUp({ state: true, message: "User Updated " })
      }
      setTimeout(() => {
        window.history.back()
        setBtnSaving(false)
        setSnackBarPopUp({ state: false, message: "" })
      }, 1000)
    } catch (error) {
      console.log(error);
    }


  }

  const user_perm = useQuery(["user-permission"], async () => {
    return await axios.get(api.user.user_permissions)
  })


  useEffect(() => {
    getData()
  }, [])


  return (
    <form className='mt-10' onSubmit={handleSubmit(onSubmit)}>
      <BackArrow title={usermanagement.app_name} location={usermanagement.go_back_loc} />
      <BarSnack />
      <div className='grid grid-cols-[repeat(1,1fr)] gap-10 p-[3rem]'>
        <div className='flex flex-wrap gap-7'>
          <CustomTextField label={"First Name*"} name={"first_name"} errors={errors} register={register} watch={watch} />
          <CustomTextField label={"Last Name*"} name={"last_name"} errors={errors} register={register} watch={watch} />
          <CustomTextField label={"Mobile Number*"} name={"ph_no"} errors={errors} register={register} watch={watch} />
          <CustomDate label={"Date Of Birth*"} name={"dob"} errors={errors} control={control} watch={watch} register={register} />
          <Controller
            render={({ field: { onChange, onBlur, value, name, ref },
              fieldState: { isTouched, isDirty, error },
            }) => (
              <FormControl error={!!errors.gender}>
                <FormLabel className='mt-[-.1rem]' id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <div>
                  <RadioGroup
                    className='mt-[-.6rem]'
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
                </div>
              </FormControl>
            )}
            name="gender"
            control={control}
            rules={{ required: true }}
          />
          <CustomTextField label={"Emergency Contact*"} name={"emerg_contact"} errors={errors} register={register} watch={watch} />
          <CustomTextField label={"Address*"} name={"address"} errors={errors} register={register} watch={watch} />
        </div>
        <Divider textAlign='left'></Divider>
        <div className='flex flex-wrap gap-7'>
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
        <Divider textAlign='left'></Divider>
        <div className='flex flex-wrap gap-7'>
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
          <div className='w-[50rem]'>
            <Autocomplete
              multiple
              limitTags={5}
              id="checkboxes-tags-demo"
              options={!user_perm.isLoading ? [...user_perm?.data?.data] : []}
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
        <div className='w-fit'>
          <LoadingButtonWithSnack afterName={"Updating"} beforeName={"Update User"} />
        </div>
      </div>
    </form>
  )

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
    <TextField
      key={label}
      className="w-[20rem]"
      value={watch(name)}
      label={label}
      size={"small"}
      {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
  )
}
const CustomDate = ({ register, name, label, errors, control, watch }) => {
  return (
    <Controller render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { isTouched, isDirty, error }, }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: 320 }}
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
