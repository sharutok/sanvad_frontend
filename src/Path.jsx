import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import UserManagement from './2.UserManagement/UserManagement';
import HomePage from './1.HomePage/HomePage';
import ErrorPage404NotFound from './ErrorPage404NotFound';
import ConferenceBooking from './3.ConferenceBooking/ConferenceBooking';
import VisitorMangement from './4.VIsitorManagement/VisitorManagement';
import TicketSystem from './5.TicketSystem/TicketSystem';
import ListView from './2.UserManagement/ListView';
import UpdateUserForm from './2.UserManagement/UpdateUserForm';
import CreateUserForm from './2.UserManagement/CreateUserForm';
import CListView from './6.Capex/ListView';
import CForm from './6.Capex/Form';
export default function Path() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/user/management/new' element={<CreateUserForm />} />
                <Route path='/user/management/indvi/:id' element={<UpdateUserForm />} />
                <Route path='/user/management/list' element={<ListView />} />
                <Route path='/conference/booking' element={<ConferenceBooking />} />
                <Route path='/vistors/management' element={<VisitorMangement />} />
                {/* <Route path='/user/management/indv' element={<CreateUserForm />} /> */}
                <Route path='/ticket/sys' element={<TicketSystem />} />
                <Route path='/capex/indvi/:id' element={<CForm />} />
                <Route path='/capex/list' element={<CListView />} />
                <Route path='*' element={<ErrorPage404NotFound />} />
            </Routes>
        </Router>
    )
}
