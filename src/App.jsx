import Homepage from './1.HomePage/HomePage'
import UserManagement from './2.UserManagement/UserManagement'
import Path from './Path'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react'
export const AppContext = React.createContext()
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()
import './App.css'
const theme = createTheme({
  palette: {
    primary: {
      main: "#ed1d24",
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function App() {
  const [usermanagement, setUsermanagement] = useState({
    go_back_loc: "",
    app_name: "",
    first_name: "",
    last_name: "",
    ph_no: "",
    dob: "",
    gender: "",
    emerg_contact: "",
    address: "",
    start_date: "",
    end_date: "",
    emp_no: "",
    department: "",
    plant_name: "",
    manager: "",
    job_type: "",
    employment_type: "",
    emp_designation: "",
    email_id: "",
    password: "",
    organization: "",
    user_status: false,
    user_role: "",
    btn_type: "0",
    module_permission: []
  })

  const [count, setCount] = useState(10)
  const [page, setPage] = useState(10)
  const [btnSaving, setBtnSaving] = useState(false)

  const contextValue = {
    usermanagement, setUsermanagement, count, setCount, page, setPage, btnSaving, setBtnSaving
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={contextValue}>
          <ThemeProvider theme={theme}>
            <Path />
          </ThemeProvider>
        </AppContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
