import Path from './Path'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react'
export const AppContext = React.createContext()
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()
import './App.css'
import { MantineProvider } from '@mantine/core';

const theme = createTheme({
  typography: {
    fontFamily: 'Source Sans Pro',
  },
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

  const [capex, setCapex] = useState({
    budget_no: "",
    purpose_code: "",
    category: "",
    dept: "",
    capex_class: "",
    capex_group: "",
    plant: "",
    asset_description: "",
    details: "",
    final_budget: "",
    line_no: "",
    purpose_description: "",
    qty: "",
    rate: "",
    uom: "",
    remarks: "",
  })

  const [userLogin, setUserLogin] = useState({
    email: "", password: ""
  })


  const [count, setCount] = useState(1)
  const [page, setPage] = useState(1)
  const [btnSaving, setBtnSaving] = useState(false)

  const [dialogStatus, setDialogStatus] = useState(false)

  const [confTemp, setConfTemp] = useState({
    conf_room_start_date: "",
    conf_room_start_time: "",
    conf_room: ""
  })

  const [momentTime, setMomentTime] = useState([])
  // const [disabledOptions, setDisabledOptions] = useState(["08:00 AM"])
  const [disabledOptions, setDisabledOptions] = useState([])
  const [snackBarPopUp, setSnackBarPopUp] = useState({
    state: false,
    message: ""
  })

  const [visitors, setVisitors] = useState([])

  const [cookie, setCookie] = useState({
    role_status: "",
    emp_code: "",
    user_role_id: "",
  })

  const contextValue = {
    momentTime, setMomentTime, usermanagement, setUsermanagement, count, setCount, page, setPage, btnSaving, setBtnSaving, capex, setCapex, userLogin, setUserLogin, dialogStatus, setDialogStatus, confTemp, setConfTemp
    , disabledOptions, setDisabledOptions, snackBarPopUp, setSnackBarPopUp, visitors, setVisitors, cookie, setCookie
  }

  return (
    <>
      <MantineProvider theme={{ fontFamily: 'Source Sans Pro' }}>
        <QueryClientProvider client={queryClient}>
          <AppContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
              <Path />
            </ThemeProvider>
          </AppContext.Provider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  )
}

export default App
