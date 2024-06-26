import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { AppContext } from '../../App';
import { api } from '../../Helper Components/Api';
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import Table from '../../Helper Components/Table';
import CPagination from '../../Helper Components/Pagination';


function CapexWorkFlowList() {
    const { setCount, page } = useContext(AppContext)
    const tbody = ['Department', 'Plant', 'Flow Type', 'Approvers']
    const ticket_listing = useQuery(['capex-flow-list', page,], async () => {
        const data = await axios.get(`${api.wf.all_wf_capex_list}/?page=${page}`)
        return data
    })

    useEffect(() => {
        setCount(Math.ceil(ticket_listing?.data?.data?.count / 10))
    })

    if (ticket_listing?.isLoading) {
        return (
            <>
                <LoadingSpinner />
            </>
        )
    }
    const handleNav = (x) => {
        window.location.href = `/capex/wf/update/?department=${x.department}&first=${x._first}&fourth=${x._fourth}&fifth=${x._fifth}&plant=${x.plant}&role=${x.role}&second=${x._second}&third=${x._third}&which_flow=${x.which_flow}&id=${x.id}`
    }

    return (
        <>
            <div>
                <Table thead={tbody} tbody={
                    ticket_listing?.data?.data?.results?.map((x, i) => {
                        return (
                            <tr key={i} className='table-wrapper'>
                                <td onClick={() => handleNav(x)}>{x.department}</td>
                                <td onClick={() => handleNav(x)} >{x.plant || "ALL"}</td>
                                <td onClick={() => handleNav(x)}>{x.role}</td>
                                <td onClick={() => handleNav(x)}><Approver x={x} /></td>
                            </tr>
                        )
                    })
                } />
            </div>
            <CPagination />
        </>
    )
}
function Approver({ x }) {
    const { first, second, third, fourth,fifth } = x
    return (
        <div className='flex justify-center'>
            <div className="mr-2 flex items-center gap-1">{first}<BsArrowRight color='black' /></div>
            <div className="mr-2 flex items-center gap-1">{second}<BsArrowRight color='black' /></div>
            <div className="mr-2 flex items-center gap-1">{third} <BsArrowRight color='black' /></div>
            <div className="mr-2 flex items-center gap-1">{fourth}{fifth && <BsArrowRight color='black' />}</div>
            {fifth && <div className="mr-2 flex items-center gap-1">{fifth}</div>}
        </div>
    )
}
export default CapexWorkFlowList