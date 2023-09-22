import React from 'react'
import Table from '../Helper Components/Table'
import { Link } from 'react-router-dom';
import { api } from '../Helper Components/Api';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteOutline, MdOutlineOpenInNew } from 'react-icons/md';
import TipTool from '../Helper Components/TipTool';
import { IconButton } from 'rsuite';
import CPagination from '../Helper Components/Pagination';
import LoadingSpinner from '../Helper Components/LoadingSpinner';
export default function BudgetListVIew() {
    const thead = ["Budget No", "Purpose code", "Purpose", "Line No", "Department", "Capex Group", "Class", "Category", "No. Of Capex ", "Budget (Remaining v/s Consumed)", "Final Budget"]

    function handleNav(c) {
        window.location.href = `/capex/${c.id}`
    }

    const { isLoading, error, data } = useQuery(['sales-data'], async () => {
        return await axios.get(api.capex.get_data)
    })

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <div>
            {/* {!isLoading && <Table thead={thead} tbody={
                data?.data?.map((c, i) => {
                    return (
                        <tr className='table-wrapper' key={i}>
                            <td >{c.budget_no}</td>
                            <td >{c.purpose_code}</td>
                            <td >{c.purpose_description}</td>
                            <td >{c.line_no}</td>
                            <td >{c.dept}</td>
                            <td >{c.capex_group}</td>
                            <td >{c.capex_class}</td>
                            <td >{c.category}</td>
                            <td >{Math.floor(Math.random() * 5)}</td>
                            <td  >{<CProgressBar />}</td>
                            <td onClick={() => handleNav(c)}>{c.final_budget}</td>
                            <td className='delete' onClick={() => handleNav(c)}>
                                <TipTool title={"Create Capex"} body={<IconButton><MdOutlineOpenInNew color='#f08080' size={22} /></IconButton>} />
                            </td>
                            <td className='delete'>
                                <TipTool title={"Delete"} body={<IconButton ><MdDeleteOutline color='#f08080' size={22} /></IconButton>} />
                            </td>
                        </tr>
                    )
                })
            } />} */}
            {!isLoading ?
                <div className='mt-10'>
                    <Table thead={thead} tbody={
                        data?.data?.map((c, i) => {
                            return (
                                <tr className='p-10 mt-1 table-wrapper' key={i}>
                                    <td >{c.budget_no}</td>
                                    <td >{c.purpose_code}</td>
                                    <td >{c.purpose_description}</td>
                                    <td >{c.line_no}</td>
                                    <td >{c.dept}</td>
                                    <td >{c.capex_group}</td>
                                    <td >{c.capex_class}</td>
                                    <td >{c.category}</td>
                                    <td >{Math.floor(Math.random() * 5)}</td>
                                    <td  >{<CProgressBar />}</td>
                                    <td onClick={() => handleNav(c)}>{c.final_budget}</td>
                                    <td className='delete' onClick={() => handleNav(c)}>
                                        <TipTool title={"Create Capex"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200'><MdOutlineOpenInNew color='#f08080' size={22} /></div>} />
                                    </td>
                                    <td className='delete'>
                                        <TipTool title={"Delete"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200'><MdDeleteOutline color='#f08080' size={22} /></div>} />
                                    </td>
                                </tr>
                            )
                        })
                    } />
                    < CPagination />
                </div>
                : <LoadingSpinner />}
        </div>
    )
}


function CProgressBar() {
    const val = 80
    return (<div className=' '>
        {/* <div className='w-[100%]'>
            <div className=' bg-[#60d394] p-1 rounded-tl-[10px] rounded-bl-[10px]'></div>
        </div> */}
        <div className='flex justify-between'>
            <p className='text-right text-xs mt-[1rem]'>{`${val}%`}</p>
            <p className='text-left text-xs mt-[1rem]'>{`${100 - val}%`}</p>
        </div>
        <div className='w-[100%] relative'>
            <div className='bg-[#ee6055] p-1 rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[10px]'></div>
            <div style={{ width: `${val}%` }} className='bg-[#60d394] p-1 rounded-tl-[10px] rounded-bl-[10px] absolute z-[1] left-0 top-0'></div>
        </div>
    </div>)
}