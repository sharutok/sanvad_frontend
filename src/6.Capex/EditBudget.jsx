import React, { useContext, useEffect } from 'react'
import { Box } from 'tabler-icons-react';
import { AppContext } from '../App';
import { IoMdArrowBack } from 'react-icons/io';
import { Autocomplete, Drawer, FormControlLabel, Switch, TextField } from '@mui/material';
import IMAGES from '../assets/Image/Image';
import { useForm, Controller, get } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BudgetErrorSchema } from '../Form Error Schema/BudgetErrorSchema'
import LoadingButtonWithSnack from '../Helper Components/LoadingButtonWithSnack';
import axios from 'axios';
import { api } from '../Helper Components/Api';

export default function EditBudget({ data, invalidateData }) {
    const { setDrawerStatus, setSnackBarPopUp, setBtnSaving } = useContext(AppContext)
    const [checked, setChecked] = React.useState(true);
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
        mode: "onTouched",
        resolver: yupResolver(BudgetErrorSchema),
        defaultValues: {
            budget_no: "",
            purpose_code: "",
            purpose_description: "",
            line_no: "",
            plant: "",
            dept: "",
            capex_group: "",
            capex_class: "",
            category: "",
            asset_description: "",
            details: "",
            rate: "",
            qty: "",
            uom: "",
            final_budget: "",
            remarks: "",
            is_active: ""
        }
    })
    async function onSubmit(data) {
        try {
            const response = await axios.put(`${api.capex.budget_by_id}/${getValues('id')}/`, data)
            if (response?.data?.status_code === 200) {
                setSnackBarPopUp({ state: true, message: "Updated", severity: "s" })
                setBtnSaving(true)
                invalidateData()
                setTimeout(() => {
                    setSnackBarPopUp({ state: false, message: "" })
                    setDrawerStatus(false)
                    setBtnSaving(false)
                }, 2000)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        Object.entries(data).map(x => {
            setValue(x[0], x[1])
        })
        setChecked(getValues('is_active'))
    }, [])
    return (
        <div>
            <form className='p-5 ml-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-3 gap-5 mt-5 '  >
                    <CustomTextField label={"Budget Number"} name={"budget_no"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Purpose Code"} name={"purpose_code"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Purpose Description"} name={"purpose_description"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Line No"} name={"line_no"} errors={errors} register={register} watch={watch} />
                    {/* <CustomTextField label={"Plant"} name={"plant"} errors={errors} register={register} watch={watch} /> */}
                    {/* <CustomTextField label={"Department"} name={"dept"} errors={errors} register={register} watch={watch} /> */}
                    <CustomAutoComplete control={control} errors={errors} name={"plant"} label={"Plant"} options={['0', "1", "2", "3", "4"]} />
                    <CustomAutoComplete control={control} errors={errors} name={"dept"} label={"Department"} options={['0', "1", "2", "3", "4"]} />
                    <CustomTextField label={"Capex Group"} name={"capex_group"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Capex class"} name={"capex_class"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Category"} name={"category"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Asset description"} name={"asset_description"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Details"} name={"details"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Rate"} name={"rate"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Qantity"} name={"qty"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"UOM"} name={"uom"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Final budget"} name={"final_budget"} errors={errors} register={register} watch={watch} />
                    <CustomTextField label={"Remarks"} name={"remarks"} errors={errors} register={register} watch={watch} />
                    <div className='grid grid-cols-[repeat(1,1fr)]'>
                        <FormControlLabel {...register('user_status')} control={<Switch checked={checked}
                            onChange={(e) => {
                                setChecked(e.target.checked);
                                setValue("is_active", e.target.checked)
                            }} />
                        }
                            label="Status" />
                        {getValues("is_active") === true ? <p className='text-[0.8rem] text-[#3c993c] font-[bolder]'>Active</p> : <p className='text-[0.8rem] text-[red] font-[bolder]'>In Active</p>}
                    </div>
                </div>
                <LoadingButtonWithSnack beforeName={"Update"} afterName={"Updating..."} />
            </form>
        </div>
    )
}


const CustomTextField = ({ name, label, errors, register, watch }) => {
    return (
        <TextField key={label} className="w-[20rem]" value={watch(name)} label={label} size={"small"}  {...register(name)} error={!!errors[name]} helperText={errors[name] && errors[name].message} />
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