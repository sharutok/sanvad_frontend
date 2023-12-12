import React, { useContext, useRef, useState, useEffect } from 'react'
import BackArrow from '../../Helper Components/SideComponent'
import Table from '../../Helper Components/Table'
import DialogsBox from '../../Helper Components/DialogsBox'
import LoadingButtonWithSnack from '../../Helper Components/LoadingButtonWithSnack'
import { RxCross2 } from 'react-icons/rx'
import { Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, Input, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { CgFolderAdd, CgImport } from 'react-icons/cg'
import { AppContext } from '../../App'
import { CloudUpload } from 'tabler-icons-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../Helper Components/Api'
import axios from 'axios'
import CPagination from '../../Helper Components/Pagination'
import { useSearchParams } from 'react-router-dom'
import { TbDownload } from 'react-icons/tb'
import TipTool from '../../Helper Components/TipTool'
import { forceDownload, isPermissionToView } from '../../Static/StaticValues'
import { FaEye } from 'react-icons/fa'

export default function Policies() {
    const thead = ["Policy Name", "Policy Type", "Policy Created Date"]
    const { setDialogStatus, setCount, page, setPage } = useContext(AppContext)
    const [_search, _setSearch] = useState("")
    const inputFile = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const response = useQuery(['get-data-policy', _search, page], async () => {
        const data = await axios.get(`${api.policies.get_all_data}/?search=${_search}&page=${page}&type=${searchParams.get('type')}`)
        return data
    }, { staleTime: 3000 })

    const queryClient = useQueryClient()

    function invalidateData() {
        queryClient.invalidateQueries(['get-data-policy'])
    }

    useEffect(() => {
        setCount(Math.ceil(response?.data?.data?.count / 10))
    })


    return (
        <div>
            <div className='flex justify-between mt-20'>
                <BackArrow location={"/home"} title={`${searchParams.get('type')} Policies`} />
                <div className='flex gap-4 mt-3 mr-20'>
                    <TextField onChange={(e) => _setSearch(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    {(searchParams.get('type') === "HR" && (isPermissionToView("policy:hr:add")) || (searchParams.get('type') === "IT" && isPermissionToView("policy:it:add"))) && <ButtonComponent onClick={() => { setDialogStatus(true) }} icon={<CgFolderAdd color='white' size={"20"} />} btnName={"Add Policy"} />}
                </div>
            </div>
            <DialogsBox inputFile={inputFile} title={"Upload Policy"} body={<UploadFiles invalidateData={invalidateData} />} />
            <div className='p-10'>
                <Table thead={thead} tbody={
                    response?.data?.data?.results?.map((g, i) => {
                        console.log(g.mod_file_path);
                        return (
                            <tr className='p-10 mt-1 table-wrapper' key={i}>
                                <td >{g.policy_name}</td>
                                <td >{PolicyType(g.policy_type)}</td>
                                <td >{g.mod_created_at}</td>
                                <td className='delete'>{
                                    <a target="_blank" href={g.mod_file_path}>
                                        <TipTool
                                            body={
                                                <IconButton>
                                                    <FaEye color="#555259" size="1.5rem" />
                                                </IconButton>
                                            } position={"top"} title={"View"} />
                                    </a>
                                }</td>
                            </tr>
                        )
                    })
                } />
            </div>
            < CPagination />
        </div>
    )
}

const UploadFiles = ({ invalidateData }) => {
    const { setSnackBarPopUp, setBtnSaving, setDialogStatus } = useContext(AppContext)
    const [tktFiles, setTKTFiles] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [obj, setObj] = useState({
        policy_name: "", policy_type: ""
    })
    const formData = new FormData()

    const onSubmit = async (e) => {
        try {
            e.preventDefault()
            formData.append("policy_file", tktFiles[0])
            Object.entries({ ...obj, policy_type: searchParams.get('type') }).map(x => {
                formData.append(x[0], x[1])
            })

            if (tktFiles[0]) {
                const response = await axios.post(api.policies.create_data, formData)
                if (response.data.status == 200) {
                    setSnackBarPopUp({ state: true, message: "Policy Created", severity: 's' })
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
        }
        catch (error) {
            console.log(error);
            setSnackBarPopUp({ state: true, message: `Please Upload Correct File: ${error}`, severity: 'e' })
        }
    }
    const deleteFiles = (g) => {
        let arr = tktFiles.filter(function (item) {
            return item.name !== g
        })
        setTKTFiles((tktFiles) => {
            return [...arr]
        })
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setTKTFiles(files);
    };

    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setObj({ ...obj, [name]: value })
    }

    return (
        <div className='p-5'>
            <div className='grid grid-cols-1 justify-center '>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(e) }}>
                    <div className='grid grid-cols-1 gap-5'>
                        <TextField sx={{ width: "20rem" }} onChange={handleOnChange} value={obj.policy_name} id="outlined-basic" label="Name of the policy" variant="outlined" size='small' required name="policy_name" />
                        <FormControl required>
                            <FormLabel className='mt-[-.6rem]' id="demo-row-radio-buttons-group-label">Policy Type</FormLabel>
                            <RadioGroup
                                className='mt-[-.1rem]'
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="policy_type"
                                onChange={handleOnChange}
                                value={obj.policy_type}
                            >
                                <FormControlLabel checked={searchParams.get('type') === "HR" ? true : false} value="HR" control={<Radio size='small' />} label="HR" />
                                <FormControlLabel checked={searchParams.get('type') === "IT" ? true : false} value="IT" control={<Radio size='small' />} label="IT" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='w-fit'>
                        <div className='gap-7 p-10' >
                            <div className=''>
                                <label for="file-input">
                                    <Card className="ts-card " style={{ cursor: "pointer" }} >
                                        <CardContent  >
                                            <Typography className="ts-card-typo " sx={{ fontSize: 12 }} >
                                                <CloudUpload
                                                    size={35}
                                                    strokeWidth={2}
                                                    color={'grey'}
                                                />
                                            </Typography>
                                            <Typography className="ts-card-typo" variant="h5" component="div">
                                                <Stack direction="row" alignItems="center">
                                                    <label htmlFor="contained-button-file">
                                                        <Typography sx={{ fontWeight: "bold" }} className="ts-card-typo abs" variant="body2">
                                                            Upload files
                                                        </Typography>
                                                    </label>
                                                </Stack>
                                            </Typography>
                                            <Typography sx={{ fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
                                                Upload files that are less than 30mb in size.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </label>
                                <input onChange={handleFileChange} id="file-input" type="file" style={{ display: "none" }} />
                                <div className='mt-2'>
                                    {tktFiles?.map((g, i) => {
                                        return (
                                            <div key={i} className='flex gap-2 break-all w-[20rem]'>
                                                <p><strong>{i + 1}.</strong> {g.name}</p>
                                                <RxCross2 onClick={() => { deleteFiles(g.name) }} className='text-[#ff2a2a] hover:text-[#ff6060] cursor-pointer active:text-[#ffa4a4] mt-1' />
                                            </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-fit'>
                        <LoadingButtonWithSnack beforeName={"Upload"} afterName={"uploading..."} />
                    </div>
                </form>
            </div>
        </div>
    )
}

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='w-fit no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}

const PolicyType = (val) => {
    return (
        <div className='flex justify-center'><p className='mt-[0.1rem] rounded-full px-4 py-1 bg-gray-200 font-semibold w-fit'>{val}</p></div>
    )
}