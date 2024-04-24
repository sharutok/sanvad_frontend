import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IMAGES from '../../assets/Image/Image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../../Helper Components/Api';
import { FaCakeCandles } from 'react-icons/fa6';
import { Stack, } from '@mui/material';
import { getCookies } from '../../Helper Components/CustomCookies';
import { AppContext } from '../../App';
import BarSnack from '../../Helper Components/BarSnack';


export default function NewEmployee() {
    const { setSnackBarPopUp, setBtnSaving, setDialogStatus } = React.useContext(AppContext)

    const tkt_type_lists = useQuery(['tkt-type-lists'], async () => {
        return await axios.get(api.user.birthday_list)
    })

    async function handleWishes(x) {
        try {
            const response = await axios.get(`${api.utils.birthday_wish}/?woosee=${getCookies()[0]}&firstName=${x.first_name}&lastName=${x.last_name}`)
            console.log(response.data.status_code == 200);
            if (response.data.status_code == 200) {
                setSnackBarPopUp({ state: true, message: "Sent Wish 👍", severity: 's' })
                setBtnSaving(true)
                invalidateData()
                setTimeout(() => {
                    setDialogStatus(false)
                    setSnackBarPopUp({ state: false, message: "s", })
                    setBtnSaving(false)
                    setTKTFiles([])
                }, 1500)
            }
        }
        catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div >
            < div className='p-3 bg-[#fff] rounded-t-xl ' >
                <span className='text-[1.2rem] font-extrabold text-[#555259] '>Birthdays</span>
                <div >
                    <Divider />
                </div>
            </ div>
            <BarSnack />
            <List sx={{ width: '100%', maxHeight: '10rem' }} className='overflow-y-scroll rounded-b-xl bg-[#fff]'>
                {tkt_type_lists?.data?.data?.data?.length !== 0 ? <div>
                    {tkt_type_lists?.data?.data?.data?.map((x, i) => {
                        return (
                            <div key={i} >
                                {i !== 0 && <Divider variant="inset" component="li" />}
                                <ListItem className='flex justify-between'>
                                    <ListItemAvatar>
                                        {x.gender === "0" ? <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._girl_}></Avatar>
                                            : <Avatar sx={{ width: 50, height: 50 }} src={IMAGES._boy_}></Avatar>}
                                    </ListItemAvatar>
                                    <ListItemText className='inline-block max-w-xs truncate' primary={<span className='text-[13px] font-bold text-[#555259] '>{x.first_name + " " + x.last_name}</span>} secondary={<span className='text-[12px]'>{x.department !== "null" && x.department}</span>} />
                                    <div>
                                        <ButtonComponent onClick={() => handleWishes(x)} icon={<FaCakeCandles size={15} color='#ED1C24' />} btnName={"Send wishes"} />
                                    </div>
                                </ListItem>
                            </div>)
                    })}
                </div> : <div >
                    <Stack spacing={1} alignItems={"center"} >
                        <img loading='lazy' src={IMAGES.no_birthday} alt="" width={200} />
                        <span className='font-bold'>NO BIRTHDAYS</span>
                    </Stack>
                </div>}
            </List>
        </div >
    );
}
const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='whitespace-nowrap no-underline rounded-xl py-1 h-fit border-[3px] border-solid border-[#ED1C24] bg-[#ffffff] flex justify-between px-2 cursor-pointer hover:bg-[#e7e7e7] active:bg-[#eeeeee] transition-[1s]'>
            {icon && <div className='no-underline mt-[0.4rem]'>
                {icon}
            </div>}
            {btnName && <span className='text-[#ED1C24] font-bold text-[14px] no-underline ml-2 mt-1 pr-1'>{btnName}</span>}
        </div>
    )
}






