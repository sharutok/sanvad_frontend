import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio, RadioGroup,
  TextField
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../../../Style/UserManagement.css';
import { AppContext } from '../../App';
import { CapexFlowErrorSchema } from '../../Form Error Schema/CapexFlowErrorSchema';
import { api } from '../../Helper Components/Api';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import BackArrow from '../../Helper Components/SideComponent';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const ErrorSchema = CapexFlowErrorSchema

function CreateFlowForm() {
  const { usermanagement, setUsermanagement, setSnackBarPopUp, setBtnSaving } = useContext(AppContext)
  const [managerList, setManagerList] = useState([])
  const [fouthApprover, setFouthApprover] = useState(false)
  const [capexMess, setCapexMess] = useState("")

  const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
    mode: "onTouched",
    resolver: yupResolver(yup.object().shape({
      department: yup.string().required('Required Field'),
      which_flow: yup.string().required('Required Field'),
      first_approver: yup.string().required('Required Field'),
      second_approver: yup.string().required('Required Field'),
      third_approver: yup.string().required('Required Field'),
      fourth_approver: !fouthApprover ? yup.string().required('Required Field') : "",
    })),
    defaultValues: {
      department: "",
      which_flow: 0,
      first_approver: "",
      second_approver: "",
      third_approver: "",
      fourth_approver: "",
    },
  })


  useQuery(['manager_list'], async () => {
    const data = await axios.get(`${api.capex.capex_flow_manager}`)
    setManagerList([...data?.data.map(x => { return x.name })])
    return data
  }, { staleTime: Infinity })

  const user_perm = useQuery(["user-permission"], async () => {
    return await axios.get(api.user.user_permissions)
  }, { staleTime: Infinity })

  const plant_dept = useQuery(['plant_dept'], async () => {
    const data = axios.get(api.utils.dept_plant)
    return data
  }, { staleTime: Infinity })



  const onSubmit = async (data) => {
    try {
      const response = await axios.post(api.wf.capex_create, { ...data, notify_user: usermanagement.module_permission })
      setCapexMess(response?.data?.mess)
      if (response?.data.status == 200) {
        setSnackBarPopUp({ state: true, message: "WF Created", severity: 's' })
        setBtnSaving(true)
        setTimeout(() => {
          window.location.href = "/workflow/capex-system"
          setSnackBarPopUp({ state: false, message: "", severity: 's' })
          setBtnSaving(false)
        }, 1 * 1000)
      }

    } catch (error) {
      console.log("err", error);
    }
  }

  return (
    // <form className='mt-20' onSubmit={handleSubmit(onSubmit)}>
    <form className='mt-20' onSubmit={handleSubmit(onSubmit)}>
      <BackArrow title={"Create Workflow - Capex"} location={'/workflow/capex-system'} />
      <div className='grid grid-cols-[repeat(1,1fr)] gap-10 p-[3rem]'>
        <div className='grid gap-7'>
          <CustomAutoCompleteDepartment control={control} errors={errors} name={"department"} label={"Department"} options={plant_dept?.data?.data?.department || []} />
          <Controller
            render={({ field: { onChange, onBlur, value, name, ref },
              fieldState: { isTouched, isDirty, error },
            }) => (
              <FormControl error={!!errors.which_flow}>
                <FormLabel className='mt-[-.6rem]' id="demo-row-radio-buttons-group-label">Which Flow</FormLabel>
                <RadioGroup
                  className='mt-[-.1rem]'
                  {...register('which_flow')}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(event) => {
                    onChange(event),
                      setFouthApprover(Boolean(Number(event.target.value)))
                  }
                  }
                  onBlur={onBlur}
                  value={value}>
                  <FormControlLabel value={0} control={<Radio size='small' />} label="For Plant" />
                  <FormControlLabel value={1} control={<Radio size='small' />} label="For Corporate" />
                </RadioGroup>
                <FormHelperText>{errors.which_flow && errors.which_flow.message}</FormHelperText>
              </FormControl>
            )}
            name="which_flow"
            control={control}
            rules={{ required: true }}
          />
        </div>
        <CustomAutoComplete control={control} errors={errors} name={"first_approver"} label={"First Approver"} options={managerList} />
        <CustomAutoComplete control={control} errors={errors} name={"second_approver"} label={"Second Approver"} options={managerList} />
        <CustomAutoComplete control={control} errors={errors} name={"third_approver"} label={"Third Approver"} options={managerList} />
        {!fouthApprover && <CustomAutoComplete control={control} errors={errors} name={"fourth_approver"} label={"Fourth Approver"} options={managerList} />}
        <div className='max-w-[30rem]'>
          <Autocomplete
            multiple
            limitTags={5}
            id="checkboxes-tags-demo"
            options={managerList}
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
              <TextField {...params} label="Send mail notification after approved by MD"
              />
            )}
          />
          <div className='mt-10 text-[1rem]'>
            {capexMess && <span className='text-[red] font-[1000]'>{capexMess}</span>}
          </div>
        </div>
        <LoadingButtonWithSnack beforeName={"Create Flow"} afterName={"Creating...."} />
      </div>
      <div>
      </div>
    </form>
  )
}

export default CreateFlowForm

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
