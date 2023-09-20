import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import UserManagement from './2.UserManagement/UserManagement';
import HomePage from './1.HomePage/HomePage';
import ErrorPage404NotFound from './Helper Components/ErrorPage404NotFound';
import ConferenceBooking from './3.ConferenceBooking/BookNewConf/ConferenceBooking';

import VisitorMangement from './4.VIsitorManagement/CreateVisitorManagement';
// import RequesterForm from './5.TicketSystem/Requester/RequesterForm';
import UpdateUserForm from './2.UserManagement/UpdateUserForm';
import CreateUserForm from './2.UserManagement/CreateUserForm';
import CListView from './6.Capex/ListView';
import CForm from './6.Capex/Form';
import Page from './0.LoginPage/Page';
import UserManagementListView from './2.UserManagement/ListView';
import ConferenceBookingListView from './3.ConferenceBooking/BookNewConf/ListView';
import TicketSystemListView from './5.TicketSystem/ListView';
import VisitManagementListView from './4.VIsitorManagement/ListView';
import HeaderMegaMenu from './1.HomePage/Components/b.Header';
import TicketSys from './7.ModuleConfig/TicketSys';
import RequesterForm from './5.TicketSystem/Requester/RequesterForm';
import ApproverForm from './5.TicketSystem/Agent/ApproverForm';
import ApproveVisitorManagement from './4.VIsitorManagement/Approver/ApproveVisitorManagement';
import ListsView from './3.ConferenceBooking/ListsView';

export default function Path() {
    return (
        <>
            <HeaderMegaMenu />
            {/* <SideBar /> */}
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

                    <Route path='/ticket/sys/list' element={<TicketSystemListView />} />
                    <Route path='/ticket/sys/new' element={<RequesterForm />} />
                    <Route path='/ticket/sys/approver' element={<ApproverForm />} />


                    <Route path='/capex/:id' element={<CForm />} />
                    <Route path='/capex/list' element={<CListView />} />

                    <Route path='/module-config/ticket-system' element={<TicketSys />} />

                    <Route path='*' element={<ErrorPage404NotFound />} />
                </Routes>
            </Router>
        </>
    )
}
