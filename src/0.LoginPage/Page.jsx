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
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div>

            <div className='sm:hidden md:hidden lg:hidden xl:block'>
                {/* <div className='sm:hidden md:hidden lg:hidden xl:block'> */}
                <div id="element" className='flex justify-center mt-[5rem] '>
                    <div className='w-[75%] '>
                        {!imageLoaded && <img loading='lazy' onLoad={() => handleImageLoad} className=' z-[10] rounded-3xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px] w-[100%]' src={IMAGES.login_img} />}
                        {/* {imageLoaded && <img loading='lazy' className='border z[-1]  rounded-3xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px] w-[100%]' src={IMAGES.login_smaller} />} */}
                    </div>
                    <div className=' ml-[-30rem] '>
                        <LoginBody />
                    </div>
                </div>
            </div>
        </div>
    )
}

// <div className='w-fit lg:block xl:hidden flex justify-center'>
//     {/* {!imageLoaded && <img loading='lazy' onLoad={() => handleImageLoad} className=' rounded-3xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px] w-[100%]' src={IMAGES.login_img} />} */}
//     <div>
//         <LoginBody />
//     </div>
// </div>


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
        <div className=''>
            <div  >
                <div className='flex justify-center p-5 gap-5 mb-9'>
                    <div className='flex justify-center'>
                        <img loading='lazy' style={{ fontFamily: "Archive" }} src={IMAGES.ador_star_logo} alt="Ador" width={"50"} />
                    </div>
                    <div className='px-1 py-2'>
                        <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                    </div>
                    <span align="center" style={{ fontFamily: "Archive" }} className=' text-[1.9rem] mt-1 text-[#555259] font-extrabold'>ADOR <span className='text-red-600 font-bold'>HUB</span></span>
                </div>
                <form onSubmit={onSubmit} >
                    <div className='grid gap-4  '>
                        <div>
                            <Typography className='text-[#212529]'>Email Address</Typography>
                            <div className='flex'>
                                <TextField helperText={error} error={error && true} name="email" size='small' placeholder="Email Address" variant="outlined" required onChange={handleOnChange} />
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
                            <TextField helperText={error} error={error && true} className='w-[25rem]' size='small' placeholder="Password" type='password' variant="outlined" required onChange={handleOnChange} name="password" />
                        </div>
                        <span className='text-center mt-5 mb-10 underline text-[#868E96] text-[0.8rem]' >
                            Forgot password? Contact HUB Admin
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
            </div>
            <p className='text-center text-[0.9rem] mt-3'>{moment().format('YYYY')} adorwelding.com</p>
        </div >
    )
}