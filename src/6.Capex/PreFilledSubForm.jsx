import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../Helper Components/Api'
import { TextField } from '@mui/material'
import LoadingSpinner from '../Helper Components/LoadingSpinner'

export default function PreFilledSubForm() {
    const { id } = useParams()
    const { data, isLoading, isError } = useQuery(['todos'], async () => { return await axios.get(`${api.capex.by_id}/${id}/`) });
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    return (
        <>
            <div className='flex flex-wrap gap-5 p-4'>
                {!isLoading && <>
                    {
                        [data.data.data].map((c, i) => {
                            return (
                                <>
                                    <CustomTextField label={"BUDGET_NO"} value={c.budget_no} />
                                    <CustomTextField label={"CATEGORY"} value={c.category} />
                                    <CustomTextField label={"DEPT"} value={c.dept} />
                                    <CustomTextField label={"CAPEX_CLASS"} value={c.capex_class} />
                                    <CustomTextField label={"CAPEX_GROUP"} value={c.capex_group} />
                                    <CustomTextField label={"PLANT"} value={c.plant} />
                                    <CustomTextField multiline={true} label={"ASSET_DESCRIPTION"} value={c.asset_description} />
                                    <CustomTextField label={"DETAILS"} value={c.details} />
                                    <CustomTextField label={"FINAL_BUDGET"} value={c.final_budget} />
                                    <CustomTextField label={"LINE_NO"} value={c.line_no} />
                                    <CustomTextField label={"PURPOSE_CODE"} value={c.purpose_code} />
                                    <CustomTextField multiline={true} label={"PURPOSE_DESCRIPTION"} value={c.purpose_description} />
                                    <CustomTextField label={"QTY"} value={c.qty} />
                                    <CustomTextField label={"RATE"} value={c.rate} />
                                    <CustomTextField multiline={true} label={"REMARKS"} value={c.remarks} />
                                    <CustomTextField label={"UOM"} value={c.uom} />
                                </>
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
        <TextField multiline={multiline || false} rows={2} className="textfield" value={value} label={label} size={"small"} />
    )
}




