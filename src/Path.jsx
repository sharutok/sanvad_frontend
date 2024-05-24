import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from './1.HomePage/HomePage';
import ErrorPage404NotFound from './Helper Components/ErrorPage404NotFound';

import VisitorMangement from './4.VIsitorManagement/Requester/CreateVisitorManagement';
import UpdateUserForm from './2.UserManagement/UpdateUserForm';
import CreateUserForm from './2.UserManagement/CreateUserForm';
import CListView from './6.Capex/ListView';
import CForm from './6.Capex/Requester/Form';
import Page from './0.LoginPage/Page';
import UserManagementListView from './2.UserManagement/ListView';
import ConferenceBookingListView from './3.ConferenceBooking/BookNewConf/ListView';
import VisitManagementListView from './4.VIsitorManagement/ListView';
import HeaderMegaMenu from './1.HomePage/Components/b.Header';
import TRequesterForm from './5.TicketSystem/Requester/RequesterForm';
import TApproverForm from './5.TicketSystem/Agent/ApproverForm';
import ApproveVisitorManagement from './4.VIsitorManagement/Approver/ApproveVisitorManagement';
import ListsView from './3.ConferenceBooking/ListsView';
import CApproverForm from './6.Capex/Approver/ApproverForm'
import CWorkFlow from './8.WorkFlow/CapexWorkFlow/WorkFlow';
import TWorkFlow from './8.WorkFlow/TicketWorkFlow/WorkFlow';
import Policies from './1.HomePage/Components/o.Policies';
import { getCookies } from './Helper Components/CustomCookies';
import TabList from './5.TicketSystem/ListTab/TabList';
import CreateFlowForm from './8.WorkFlow/CapexWorkFlow/CreateCapexFlowForm';
import UpdateCapexFlowForm from './8.WorkFlow/CapexWorkFlow/UpdateCapexFlowForm';
import TabBar from './1.HomePage/Components/r.CustomTabBar';
import CapexPDF from './6.Capex/Requester/CapexPDF';
export default function Path() {

    if (!getCookies()[0]) {
        return <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path='/login' element={<Page />} />
                    <Route path='*' element={<Page />} />
                </Routes>
            </Router>
        </>
    }

    return (
        <>
            {!["/", "/login"].includes(window.location.pathname) && <HeaderMegaMenu />}
            <div className=''>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path='/login' element={<Page />} />

                        <Route path='/home' element={<HomePage />} />

                        <Route path='/user/management/new' element={<CreateUserForm />} />
                        <Route path='/user/management/indvi/:id' element={<UpdateUserForm />} />
                        <Route path='/user/management/list' element={<UserManagementListView />} />

                        <Route path='/conference/booking/list' element={<ListsView />} />
                        <Route path='/conference/booking/new' element={<ConferenceBookingListView />} />

                        <Route path='/vistors/management/new' element={<VisitorMangement />} />
                        <Route path='/vistors/management/:id' element={<ApproveVisitorManagement />} />
                        <Route path='/vistors/management/list' element={<VisitManagementListView />} />

                        <Route path='/ticket/sys/list' element={<TabList />} />
                        {/* <Route path='/ticket/sys/list' element={<TicketSystemListView />} /> */}
                        <Route path='/ticket/sys/new' element={<TRequesterForm />} />
                        <Route path='/ticket/sys/:id' element={<TApproverForm />} />


                        <Route path='/capex/:budget_id' element={<CForm />} />
                        <Route path='/capex/appr/:budget_id/:capex_id' element={<CApproverForm />} />
                        <Route path='/capex/list' element={<CListView />} />
                        <Route path='/workflow/ticket-system' element={<TWorkFlow />} />
                        <Route path='/workflow/capex-system' element={<CWorkFlow />} />
                        <Route path='/capex/wf/create' element={<CreateFlowForm />} />
                        <Route path='/capex/wf/update' element={<UpdateCapexFlowForm />} />
                        <Route path='/capex/pdf/download' element={<CapexPDF />} />
                        <Route path='/policies' element={<Policies />} />
                        <Route path='*' element={<Page />} />
                    </Routes>
                </Router>
            </div>

        </>
    )
}
