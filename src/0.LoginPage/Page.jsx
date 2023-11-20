import React, { useContext, useState } from 'react'
import '../../Style/LoginPage.css'

import IMAGES from '../assets/Image/Image';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../App'
import moment from 'moment';
import { static_val } from '../Static/StaticValues';
import axios from 'axios';
import { api } from '../Helper Components/Api';
import { setCookies } from '../Helper Components/CustomCookies';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const data = static_val.prefix_email_id

export default function Page() {

    return (
        <div >
            <div id="element" className='flex justify-center mt-10 pretty'>
                <div className='w-[80%] rounded-3xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px]'>
                    <img loading='lazy' className=' rounded-3xl' src={IMAGES.login_img} />
                </div>
                <div className='ml-[-33rem] mt-5'>
                    <LoginBody />
                </div>
            </div>
        </div>
    )
}



function LoginBody() {
    const [prefix, setPrefix] = useState(data[0]['label'])
    const { btnSaving, setBtnSaving, userLogin, setUserLogin } = useContext(AppContext)
    const [error, setError] = useState("")

    async function onSubmit(e) {
        e.preventDefault()
        try {
            userLogin["prefix"] = prefix
            const response = await axios.post(api.user.log_check, userLogin)
            if (response?.data?.status === 200) {
                const emp_no = response?.data?.emp_no
                const module_permission = response?.data?.module_permission
                const initials = response?.data?.initials
                setCookies([emp_no, module_permission, initials])
                setError("")
                window.location.href = "/home"
            } else {
                setError("Password or Email is Incorrect")
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleOnChange(e) {
        let name = e.target.name
        let value = e.target.value
        setUserLogin({ ...userLogin, [name]: value })
    }

    return (
        <div>
            <div size={650} >
                <div className='flex justify-center p-5 gap-5 mb-7'>
                    <div className='flex justify-center'>
                        <img src={IMAGES.ador_logo} alt="Ador" width={"100"} />
                    </div>
                    <div>
                        <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                    </div>
                    <span align="center" className='font-medium text-[1.9rem] text-[#555259]'>SANVAD</span>
                </div>
                {/* <Text align="center" sx={(theme) => ({ fontSize: "1.5rem", margin: "0rem 0 2rem" })}> Login to your account</Text> */}
                {/* <Typography align="center" sx={(theme) => ({ fontSize: "1.5rem", margin: "0rem 0 2rem" })}> Login to your account</Typography> */}
                <form onSubmit={onSubmit} className=''>
                    <div className='grid gap-4'>
                        <div>

                            <Typography className='text-[#212529]'>Email Address</Typography>
                            <div className='flex'>
                                <TextField helperText={error} error={error && true} name="email" size='small' id="outlined-basic" placeholder="Email Address" variant="outlined" required onChange={handleOnChange} />
                                <Autocomplete
                                    defaultValue={data[0]}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={data}
                                    className='w-[12rem]'
                                    renderInput={(params) => <TextField {...params} size='small' />}
                                />
                            </div>
                        </div>
                        <div>
                            <Typography className='text-[#212529]'>Password</Typography>
                            <TextField helperText={error} error={error && true} className='w-[25rem]' size='small' id="outlined-basic" placeholder="Password" type='password' variant="outlined" required onChange={handleOnChange} name="password" />
                        </div>
                        <span className='text-center mt-5 mb-10 underline text-[#868E96] text-[0.8rem]' >
                            Forgot password? Contact Sanvad Admin
                        </span>
                    </div>

                    <div className='mt-5' >
                        <LoadingButton
                            fullWidth
                            size="small"
                            sx={{ bgcolor: "#555259" }}
                            variant="contained"
                            type="submit"
                            loading={btnSaving}
                            loadingPosition="start"
                        >
                            <span className='p-1'>Sign in</span>
                        </LoadingButton>
                    </div>
                </form>
                {/* </Paper> */}
            </div>
            <p className='text-center text-[0.9rem] mt-3'>{moment().format('YYYY')} adorwelding.com</p>
        </div >
    )
}