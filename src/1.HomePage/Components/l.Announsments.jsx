import { Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { CloudUpload, Search } from 'tabler-icons-react';
import { Card, CardContent, Divider, Input, Stack, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import IMAGES from '../../assets/Image/Image'
import moment from 'moment';
import { PiFlagBanner } from "react-icons/pi";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { TbSpeakerphone } from "react-icons/tb";
import TipTool from '../../Helper Components/TipTool';
import { AppContext } from '../../App';
import DialogsBox from '../../Helper Components/DialogsBox';
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack';
import { api } from '../../Helper Components/Api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { isPermissionToView } from '../../Static/StaticValues';
export default function Announsments() {
    const { dialogStatus, setDialogStatus } = useContext(AppContext)
    const getAllAnnouncements = useQuery(['get-announcements'], async () => {
        const data = await axios.get(api.utils.announcements)
        return data
    })
    const queryClient = useQueryClient()

    function invalidateData() {
        queryClient.invalidateQueries(['get-announcements'])
    }
    return (
        <div >
            <DialogsBox title={"Add Announcments"} body={<AddForm invalidateData={invalidateData} />} />
            <div className='p-3 bg-[#fff] rounded-t-xl  '>
                <div className='flex justify-between'>
                    <span className='text-[1.2rem] font-extrabold text-[#555259] '>Announcements</span>
                    <div className='w-fit mt-[-.6rem]'>
                        <div onClick={() => setDialogStatus(true)} className='pt-2'>
                            {isPermissionToView("announcement:add") && <div className='flex gap-2 px-2 rounded-lg  hover:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] cursor-pointer'>
                                <div >
                                    <TbSpeakerphone color='black' size={"23"} />
                                </div>
                                <span className='text-[#7e7e7e]'>Create</span>
                            </div>}
                        </div>
                    </div>
                </div>
                <div >
                    <Divider />
                </div>
            </div>
            <List sx={{ width: '100%', maxHeight: "10rem" }} className=' overflow-y-scroll rounded-b-xl bg-[#fff] '>
                {getAllAnnouncements?.data?.data?.data.length ? getAllAnnouncements?.data?.data?.data?.map((x, i) => {
                    return (
                        <div key={i} >
                            <ListItem className='flex justify-between'>
                                <ListItemAvatar>
                                    <div className='bg-[red] rounded-full w-fit h-fit p-2'>
                                        <img loading='lazy' src={IMAGES.announcement} alt="" width={25} />
                                    </div>
                                </ListItemAvatar>
                                <ListItemText primary={<span className='text-[14px] font-bold'>{x.announsments_description}</span>} secondary={<span className='text-[12px] flex justify-end'>{moment(x.created_at).format("DD MMM YYYY")}</span>} />

                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>)
                }) : <div >
                    <Stack spacing={1} alignItems={"center"} >
                        <img loading='lazy' src={IMAGES.no_announcement} alt="" width={150} />
                        <span className='font-bold'>NO ANNOUNCEMENT</span>
                    </Stack>
                </div>}
            </List>
        </div>
    );
}




const AddForm = ({ invalidateData }) => {
    const { setSnackBarPopUp, setBtnSaving, setDialogStatus } = useContext(AppContext)
    const [value, setValue] = useState({
        announsments_description: "",
    })


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(api.utils.announcements, value)
            console.log(response.data.status);
            if (response.data.status == 200) {
                setSnackBarPopUp({ state: true, message: "Announcement Created", severity: 's' })
                setBtnSaving(true)
                setTimeout(() => {
                    invalidateData()
                    setDialogStatus(false)
                    setSnackBarPopUp({ state: false, message: "", })
                    setBtnSaving(false)

                }, 1500)
            }
        }
        catch (error) {
            console.log(error);
            setSnackBarPopUp({ state: true, message: "Please Upload Correct File", severity: 'e' })
        }
    }

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    return (
        <div className='flex justify-center'>
            <div className='w-fit'>
                <div className='flex justify-center'>
                    <form className='flex justify-center' onSubmit={(e) => { onSubmit(e) }}>
                        <div className='p-5' >
                            <div className='grid gap-5 justify-center'>
                                {/* <TextField name="announsments_title" onChange={handleChange} required className="w-[20rem]" label={"Announsments Title"} size={"small"} /> */}
                                <TextField name="announsments_description" onChange={handleChange} required rows={4} multiline className="w-[20rem]" label={"Description"} size={"small"} />
                            </div>
                            <div className=''>
                                <LoadingButtonWithSnack beforeName={"Submit"} afterName={"Submitting..."} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}