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
    const { count, setCount, page, setPage } = useContext(AppContext)
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

    return (
        <>
            <div>
                <Table thead={tbody} tbody={
                    ticket_listing?.data?.data?.results?.map((x, i) => {
                        return (
                            <tr key={i}>
                                <td>{x.department}</td>
                                <td >{x.plant}</td>
                                <td>{x.role}</td>
                                <td><Approver x={x} /></td>
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
    const { first, second, third, fourth } = x
    return (
        <div className='flex justify-center'>
            <div className="mr-2 flex items-center gap-1">{first}<BsArrowRight color='black' /></div>
            <div className="mr-2 flex items-center gap-1">{second}<BsArrowRight color='black' /></div>
            <div className="mr-2 flex items-center gap-1">{third}{fourth && <BsArrowRight color='black' />}</div>
            {fourth && <div className="mr-2 flex items-center gap-1">{fourth}</div>}
        </div>
    )
}
export default CapexWorkFlowList