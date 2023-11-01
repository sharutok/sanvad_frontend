import React, { useContext, useState } from 'react'
import '../../Style/LoginPage.css'
import {
    TextInput,
    PasswordInput,
    Title,
    Text,
    Container,
    Divider,
} from '@mantine/core';
import IMAGES from '../assets/Image/Image';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../App'

import { NativeSelect, rem } from '@mantine/core';
import moment from 'moment';
import { static_val } from '../Static/StaticValues';
import axios from 'axios';
import { api } from '../Helper Components/Api';
import { setCookies } from '../Helper Components/CustomCookies';

const data = static_val.prefix_email_id

export default function Page() {

    return (
        <div >
            <div id="element" className='flex justify-center mt-10 pretty'>
                <div className='w-[80%] rounded-3xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px]'>
                    <img className=' rounded-3xl' src={IMAGES.login_img} />
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

    const select = (
        <NativeSelect
            defaultValue={data[0]['label']}
            onChange={(e) => setPrefix(e.target.value)}
            data={data}
            rightSectionWidth={28}
            styles={{
                input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    width: rem(150),
                    marginRight: rem(-2),
                },
            }}
        />
    );
    return (
        <div>
            <Container size={650} >
                {/* <Paper p={20} radius="md"> */}
                <div className='flex justify-center p-5 gap-3 mb-7'>
                    <div className='flex justify-center'>
                        <img src={IMAGES.ador_logo} alt="Ador" width={"100"} />
                    </div>
                    <Divider orientation='vertical' />
                    <Title align="center" sx={(theme) => ({ fontWeight: 900, marginTop: "0.5rem", textTransform: "uppercase" })}> Sanvad</Title>
                </div>
                {/* <Text align="center" sx={(theme) => ({ fontSize: "1.5rem", margin: "0rem 0 2rem" })}> Login to your account</Text> */}
                <form onSubmit={onSubmit} className='px-5'>
                    <div >
                        <TextInput error={error} sx={{ width: rem(350) }} onChange={handleOnChange} name="email" label="Email Address" placeholder="email address" required rightSection={select} />
                        {/* <TextInput onChange={handleOnChange} name="email" label="Email Address" placeholder="email address" required /> */}
                    </div>
                    <PasswordInput error={error} sx={{ width: rem(410) }} onChange={handleOnChange} name="password" label="Password" placeholder="your password" required mt="xl" />
                    <Text className='mt-5 mb-10 underline' color="dimmed" size="sm" align="center">
                        Forgot password? Contact Sanvad Admin
                    </Text>

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
            </Container>
            <h1 className='text-center'>{moment().format('YYYY')} adorwelding.com</h1>
        </div >
    )
}