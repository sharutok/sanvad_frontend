import React, { useContext, useEffect, useState } from 'react'
import '../../Style/LoginPage.css'
import IconButton from '@mui/material/IconButton';

import IMAGES from '../assets/Image/Image';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../App'
import moment from 'moment';
import { static_val } from '../Static/StaticValues';
import axios from 'axios';
import { api } from '../Helper Components/Api';
import { deleteCookies, getCookies, setCookies } from '../Helper Components/CustomCookies';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import RememberMe from '../Helper Components/RememberMe';

const data = static_val.prefix_email_id

export default function Page() {
    const remember_me = getCookies()[3];
    const fetchData = async () => {
        ;
        try {
            const response = await axios.get(`${api.user.validate_token}?token=${remember_me}`);
            if (response?.data?.mess === 200) {
                const { emp_no, module_permission, initials } = (response?.data?.data);
                setCookies([emp_no, module_permission, initials, remember_me])
                window.location.href = "/home";
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div >
                <div id="element" className='flex justify-center mt-[5rem] relative p-5'>
                    <div className='w-[85rem] hidden  sm:block md:block lg:block xl:block 2xl:block'>
                        {<img loading='lazy' className='rounded-3xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px]' src={IMAGES.login_img} />}
                    </div>
                    <div className='absolute sm:right-[.2rem] sm:top-[-3rem] md:right-[1rem] md:top-[-1rem] lg:right-[5rem] lg:top-[1rem] xl:right-[5rem] 2xl:right-[20rem]'>
                        <LoginBody />
                    </div>
                </div>
            </div>
            <div className='block overflow-clip h-[20rem] bottom-0 sm:hidden absolute z-[-1]'>
                <img src={IMAGES.mobile_login_bg} />
            </div>
        </div>
    )
}

function LoginBody() {
    const [prefix, setPrefix] = useState(static_val.prefix_email_id[0])
    const { btnSaving, rememberCheck, userLogin, setUserLogin } = useContext(AppContext)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function onSubmit(e) {
        e.preventDefault()
        try {

            userLogin["prefix"] = prefix
            const response = await axios.post(api.user.log_check, { ...userLogin, remember_me: rememberCheck })
            if (response?.data?.status === 200) {
                const emp_no = response?.data?.emp_no
                const module_permission = response?.data?.module_permission
                const initials = response?.data?.initials
                const remember_me = response?.data?.remember_me
                setCookies([emp_no, module_permission, initials, remember_me])
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
        <div className='scale-[80%] sm:scale-[70%] md:scale-[80%] lg:scale-100 xl:scale-100 2xl:scale-100'>
            <div  >
                <div className='flex justify-center p-5 gap-5 mb-9'>
                    <div className='flex justify-center'>
                        <img loading='lazy' style={{ fontFamily: "Archive" }} src={IMAGES.ador_star_logo} alt="Ador" width={"50"} />
                    </div>
                    <div className='px-1 py-2'>
                        <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                    </div>
                    <span align="center" style={{ fontFamily: "Archive" }} className=' text-[1.9rem] mt-1 text-[#555259] font-extrabold'>ADOR<span className='text-red-600 font-bold'>HUB</span></span>
                </div>
                <form onSubmit={onSubmit} >
                    <div className='grid gap-4  '>
                        <div>
                            <Typography className='text-[#212529]'>Email Address</Typography>
                            <div className='flex'>
                                <TextField className='w-[13rem]' helperText={error} error={error && true} name="email" size='small' placeholder="Email Address" variant="outlined" required onChange={handleOnChange} />
                                <Autocomplete
                                    className='w-[12rem]'
                                    defaultValue={static_val.prefix_email_id[0]}
                                    disablePortal
                                    id="combo-box-demo"
                                    onChange={(e, i) => setPrefix(i)}
                                    options={data}
                                    renderInput={(params) => <TextField  {...params} size='small' />}
                                />
                            </div>
                        </div>
                        <div>
                            <Typography className='text-[#212529]'>Password</Typography>
                            <TextField
                                helperText={error}
                                error={error && true}
                                className='w-[25rem]'
                                size='small'
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined" InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="start"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                                required onChange={handleOnChange} name="password" />
                        </div>
                        <RememberMe />
                        <span className='text-center mb-5  text-[#868E96] text-[0.8rem]' >
                            Forgot password? Contact ADORHUB Admin
                        </span>
                    </div>
                    <div className='mt-5' >
                        <LoadingButton
                            fullWidth
                            size="small"
                            sx={{
                                bgcolor: "#555259", '&:hover': {
                                    background: "#555259",
                                },
                            }}
                            variant="contained"
                            type="submit"
                            loading={btnSaving}
                            loadingPosition="start"
                        >
                            <span className='p-1'>Sign in</span>
                        </LoadingButton>
                    </div>
                </form>
            </div>
            <p className='text-center text-[0.9rem] mt-3'>{moment().format('YYYY')} adorwelding.com</p>
        </div >
    )
}