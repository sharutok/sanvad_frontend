import React from 'react'
import TipTool from '../Helper Components/TipTool'
import { IconButton } from 'rsuite'
import { MdDeleteOutline } from 'react-icons/md'
import Table from '../Helper Components/Table'

export default function CapexListView() {
    const thead = ["Budget No", "Line No", "Purpose code", "Requisition Date", "Payback Period", "Return On Investment", "Budget Type", "Current At"]
    return (
        <div>
            <Table thead={thead} tbody={
                [1, 2, 3].map(i => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td>{"c.budget_no"}</td>
                            <td>{"c.purpose_code"}</td>
                            <td>{"c.line_no"}</td>
                            <td>{"c.purpose_description"}</td>
                            <td>{"c.dept"}</td>
                            <td>{"c.capex_group"}</td>
                            <td>{"c.capex_class"}</td>
                            <td>{"c.category"}</td>
                            <td>{"c.final_budget"}</td>
                            <td className='delete'>
                                <TipTool body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200'>
                                    <MdDeleteOutline color='#f08080' size={22} />
                                </div>} title={"Delete"} />
                            </td>
                        </tr>
                    )
                })
            } />
        </div>
    )
}
