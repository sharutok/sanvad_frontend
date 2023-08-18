import React from 'react'
import BackArrow from '../Helper Components/SideComponent'
import CPagination from '../Helper Components/Pagination'

export default function VisitManagementListView() {
    return (
        <div>
            <BackArrow location={"/home"} title={"Visitor's Management - Listing"} />
            <CPagination />
        </div>
    )
}                                                                                                                                       
