import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../Helper Components/Api'
import { TextField } from '@mui/material'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { AppContext } from '../App'
import { useEffect } from 'react'

export default function PreFilledSubForm() {
    const { setBudget } = useContext(AppContext)
    const { budget_id } = useParams()
    const { data, isLoading, isError } = useQuery(['budget-data'], async () => { return await axios.get(`${api.capex.budget_by_id}/${budget_id}/`) });


    useEffect(() => {
        setBudget(data?.data?.data)
    }, [!isLoading])


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }


    return (
        <>
            <div >
                {!isLoading && <>
                    {
                        [data.data.data].map((c, i) => {
                            return (
                                <div key={i} className='flex flex-wrap gap-5 p-4 '>
                                    <CustomTextField label={"Budget No"} value={c.budget_no} />
                                    <CustomTextField label={"Purpose Code"} value={c.purpose_code} />
                                    <CustomTextField label={"Line No"} value={c.line_no} />
                                    <CustomTextField label={"Purpose Description"} value={c.purpose_description} />
                                    <CustomTextField label={"Category"} value={c.category} />
                                    <CustomTextField label={"Capex Class"} value={c.capex_class} />
                                    <CustomTextField label={"Capex Group"} value={c.capex_group} />
                                    <CustomTextField label={"Details"} value={c.details} />
                                    <CustomTextField label={"Final Budget (₹ in Lakhs)"} value={c.final_budget} />
                                    <CustomTextField label={"Quantity"} value={c.qty} />
                                    <CustomTextField label={"UOM"} value={c.uom} />
                                    <CustomTextField label={"Rate (₹ in Lakhs)"} value={c.rate} />
                                    <div className='flex flex-wrap gap-5'>
                                        <CustomTextField multiline={true} label={"Asset Description"} value={c.asset_description} />
                                        <CustomTextField multiline={true} label={"Remarks"} value={c.remarks} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
                }
            </div>
        </>
    )
}
const CustomTextField = ({ label, value, multiline }) => {
    return (
        <TextField multiline={multiline && true} rows={2} className="w-[20rem]" value={value} label={label} size={"small"} />
    )
}
