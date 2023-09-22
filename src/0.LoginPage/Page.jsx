import React, { useContext, useState } from 'react'
import '../../Style/LoginPage.css'
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Divider,
} from '@mantine/core';
import IMAGES from '../assets/Image/Image';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../App'
const data = [
    { value: '@adorians.com', label: '@adorians.com' },
    { value: '@adorfontech.com', label: '@adorfontech.com' },
    { value: '@flash.com', label: '@flash.com' },
];

import { NativeSelect, rem } from '@mantine/core';
import moment from 'moment';

export default function Page() {


    return (
        <div >
            <div className='flex justify-center py-10'>
                <div className='w-[65%] rounded-xl shadow-[rgba(149,157,165,0.2)_0px_8px_24px] '>
                    <img className=' h-[100%] rounded-xl ' src={IMAGES.login_img} />
                </div>
                <div className='ml-[-30rem]'>
                    <LoginBody />
                </div>
            </div>



        </div>
    )
}



function LoginBody() {
    const [prefix, setPrefix] = useState(data[0]['label'])
    const { btnSaving, setBtnSaving, userLogin, setUserLogin } = useContext(AppContext)

    function onSubmit(e) {
        e.preventDefault()
        console.log(userLogin, prefix);
        // window.location.href = "/home"
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
                <Paper p={20} radius="md">
                    <div className='flex justify-center p-5 gap-3'>
                        <div className='flex justify-center'>
                            <img src={IMAGES.ador_logo} alt="Ador" width={"100"} />
                        </div>
                        <Divider orientation='vertical' />
                        <Title align="center" sx={(theme) => ({ fontFamily: `'Cinzel Decorative', cursive, ${theme.fontFamily}`, fontWeight: 900, marginTop: "0.5rem" })}> Sanvad</Title>
                    </div>
                    <Text align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontSize: "1.5rem", margin: "0rem 0 2rem" })}> Login to your account</Text>
                    <form onSubmit={onSubmit} className='px-5'>
                        <div >
                            <TextInput sx={{ width: rem(350) }} onChange={handleOnChange} name="email" label="Email Address" placeholder="email address" required rightSection={select} />
                            {/* <TextInput onChange={handleOnChange} name="email" label="Email Address" placeholder="email address" required /> */}
                        </div>
                        <PasswordInput sx={{ width: rem(410) }} onChange={handleOnChange} name="password" label="Password" placeholder="your password" required mt="xl" />
                        <Text className='mt-5 underline' color="dimmed" size="sm" align="center">
                            Forgot password? Contact Sanvad Admin
                        </Text>

                        <div className='mt-5' >
                            <LoadingButton
                                fullWidth
                                size="small"
                                style={{ background: "rgb(22,106,209) linear-gradient(94deg, rgba(22,106,209,1) 0%, rgba(72,144,231,1) 100%, rgba(174,210,255,1) 100%)" }}
                                variant="contained"
                                type="submit"
                                loading={btnSaving}
                                loadingPosition="start"
                            >
                                <span className='p-1'>Sign in</span>
                            </LoadingButton>
                        </div>
                    </form>
                </Paper>
            </Container>
            <h1 className='text-center font-bold'>{moment().format('YYYY')} adorwelding.com</h1>
        </div >
    )
}