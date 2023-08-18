import React, { useRef } from 'react'
import {
    styled, Stack, Typography, Card, CardContent, TextField, Divider, Button, Autocomplete
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { CloudUpload } from 'tabler-icons-react';
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../Style/TicketSystem.css'
import BackArrow from '../Helper Components/SideComponent';
const Input = styled('input')({
    display: 'none',
});

function Raiser() {
    const ErrorSchema = yup.object().shape({
        tkt_tittle: yup.string().required('Required Field'),
        tkt_type: yup.string("").required('Required Field').nullable(),
        tkt_reqmnt_type: yup.string().required('Required Field'),
        tkt_duend_date: yup.string().required('Required Field'),
        tkt_reqmnt_description: yup.string().required('Required Field'),
    })
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        mode: "onTouched",
        resolver: yupResolver(ErrorSchema),
    })
    const onSubmit = (data) => {
        console.log(data);
    }
    const inputFile = useRef(null)
    const onButtonClick = () => {
        inputFile.current.click();
    };
    return (
        <div className='ts-container'>
            <BackArrow title={"Raise a New Ticket"} />
            <form onSubmit={handleSubmit(onSubmit)}>

                <span className='hr'></span>
                <div className='ts-component'>
                    <TextField {...register('tkt_tittle')} error={!!errors.tkt_tittle} helperText={errors.tkt_tittle && errors.tkt_tittle.message} label="Ticket Title*" size={"small"}></TextField>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={["1", "2", "3", "4"]}
                        renderInput={(params) => <TextField {...params} label="Ticket Type*" size={"small"} {...register('tkt_reqmnt_type')} error={errors.tkt_reqmnt_type} helperText={errors.tkt_reqmnt_type && errors.tkt_reqmnt_type.message} />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={["1", "2", "3", "4"]}
                        renderInput={(params) => <TextField {...params} label="Requirement Type*" size={"small"} {...register('tkt_reqmnt_type')} error={errors.tkt_reqmnt_type} helperText={errors.tkt_reqmnt_type && errors.tkt_reqmnt_type.message} />}
                    />
                    <TextField label="Ticket Raised By*" defaultValue={"Self"} size={"small"}></TextField>
                    <TextField {...register('tkt_reqmnt_description')} error={!!errors.tkt_reqmnt_description} helperText={errors.tkt_reqmnt_description && errors.tkt_reqmnt_description.message} label="Requirement Description*" size={"small"} multiline fullWidth rows={"5"}></TextField>
                    <div className='ts-card-component'>
                        <Card onClick={onButtonClick} className="ts-card" style={{ cursor: "pointer " }} >
                            <CardContent  >
                                <Typography className="ts-card-typo" sx={{ fontSize: 14 }} >
                                    <CloudUpload
                                        size={38}
                                        strokeWidth={2}
                                        color={'grey'}
                                    />
                                </Typography>
                                <Typography className="ts-card-typo" sx={{ fontWeight: "bold" }} >
                                    Click Here to Upload Files
                                </Typography>
                                <Typography className="ts-card-typo" variant="h5" component="div">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <label htmlFor="contained-button-file">
                                            <Input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                                            {/* <Button onClick={onButtonClick}>
                                                Upload
                                            </Button> */}
                                        </label>
                                    </Stack>
                                </Typography>
                                <Typography sx={{ mt: 1, fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
                                    Upload files that are less than 30mb in size.
                                </Typography>
                            </CardContent>
                        </Card>
                        {/* <div>
                        <Divider sx={{ ml: 2, mr: 2 }} orientation="horizontal" flexItem></Divider>
                    </div> */}
                        {/* < Card className='ts-card-typo'>
                        <CardContent className="files">
                            <Typography className="ts-card-typo" sx={{ fontSize: 15 }} >
                            </Typography>
                        </CardContent>
                    </Card> */}
                    </div>
                </div>
                <span className='hr'></span>
                <div className='ts-button'>
                    <Button fullWidth color="primary" variant="contained" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Raiser