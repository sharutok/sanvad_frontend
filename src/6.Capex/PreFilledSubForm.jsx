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
    const { setCapex } = useContext(AppContext)
    const { id } = useParams()
    const { data, isLoading, isError } = useQuery(['todos'], async () => { return await axios.get(`${api.capex.by_id}/${id}/`) });

    !isLoading && (
        setCapex(data.data.data)
    )

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    // useEffect(() => {
    // setCapex(...data.data)
    // }, [])

    return (
        <>
            <div >
                {!isLoading && <>
                    {
                        [data.data.data].map((c, i) => {
                            return (
                                <div key={i} className='flex flex-wrap gap-5 p-4'>
                                    <CustomTextField label={"Budget No"} value={c.budget_no} />
                                    <CustomTextField label={"Purpose_Code"} value={c.purpose_code} />
                                    <CustomTextField label={"Category"} value={c.category} />
                                    <CustomTextField label={"Dept"} value={c.dept} />
                                    <CustomTextField label={"Capex Class"} value={c.capex_class} />
                                    <CustomTextField label={"Capex Group"} value={c.capex_group} />
                                    <CustomTextField label={"Plant"} value={c.plant} />
                                    <CustomTextField label={"Details"} value={c.details} />
                                    <CustomTextField label={"Final Budget"} value={c.final_budget} />
                                    <CustomTextField label={"Line No"} value={c.line_no} />
                                    <CustomTextField label={"Quantity"} value={c.qty} />
                                    <CustomTextField label={"Rate"} value={c.rate} />
                                    <CustomTextField label={"UOM"} value={c.uom} />
                                    <div className='flex flex-wrap gap-5'>
                                        <CustomTextField multiline={true} label={"Purpose Description"} value={c.purpose_description} />
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
        <TextField multiline={multiline || false} rows={2} className="textfield" value={value} label={label} size={"small"} />
    )
}




