import React, { useContext, useEffect, useState } from 'react'
import Table from '../Helper Components/Table'
import { Link } from 'react-router-dom';
import { api } from '../Helper Components/Api';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MdDeleteOutline, MdOutlineOpenInNew } from 'react-icons/md';
import TipTool from '../Helper Components/TipTool';
import CPagination from '../Helper Components/Pagination';
import LoadingSpinner from '../Helper Components/LoadingSpinner';
import { AppContext } from '../App';
import BarSnack from '../Helper Components/BarSnack';
import EditBudget from './EditBudget';
import { Box, Drawer, Tooltip } from '@mui/material';
import { IoMdArrowBack } from 'react-icons/io';
import IMAGES from '../assets/Image/Image';
import { isPermissionToView } from '../Static/StaticValues';
import { getCookies } from '../Helper Components/CustomCookies';

export default function BudgetListVIew({ _search, _setSearch }) {
    const thead = ["Budget No", "Purpose code", "Line No", "Purpose", "Department", "Capex Group", "Class", "Category", "No. Of Capex ", "Budget (Consumed v/s Remaining)", "Final Budget", "Budget Status"]
    const [budgetData, setBudgetData] = useState({})
    const { count, setCount, page, setDrawerStatus, drawerStatus, setSnackBarPopUp } = useContext(AppContext)
    const { isLoading, error, data } = useQuery(['budget-data', page, _search], async () => {
        return await axios.get(`${api.capex.get_budget_data}/?page=${page}&search=${_search}&woosee=${getCookies()[0]}`)
    })
    const queryClient = useQueryClient()
    useEffect(() => {
        setCount(Math.ceil(data?.data?.count / 10))
    })

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    function invalidateData() {
        queryClient.invalidateQueries(['budget-data'])
    }

    async function handleDelete(id) {
        const response = await axios.delete(api.capex.budget_by_id + "/" + id)
        response.data.status_code === 200 && setSnackBarPopUp({ state: true, message: "Deleted Entry", severity: "s" })
        invalidateData()
    }

    function handleSideDrawer(c) {
        setDrawerStatus(true)
        setBudgetData(c)
    }

    return (
        <div>
            <div className='mt-5'>
                <BarSnack />
                <TemporaryDrawer body={<EditBudget data={budgetData} invalidateData={invalidateData} />} />
                <Table thead={thead} tbody={
                    data?.data?.results.map((c, i) => {
                        return (
                            <Tooltip key={i} title={"Click to Update"} arrow disableInteractive followCursor={false} placement='top'>
                                <tr className='p-10 mt-1 table-wrapper' key={i}>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.budget_no}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.purpose_code}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.line_no}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.purpose_description}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.dept}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.capex_group}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.capex_class}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.category}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)} >{c.no_of_capex}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)}  >{<CProgressBar no_of_capex={c.no_of_capex} consumed={c.consumed} final_budget={c.final_budget} budget_remaining={c.budget_remaining} />}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)}>₹{c.final_budget}</td>
                                    <td onClick={() => isPermissionToView("capex:update") && handleSideDrawer(c)}>{BudgetStatus(c.is_active)}</td>
                                    <td className='delete w-fit'>
                                        {isPermissionToView("capex:create") && (c.is_active && <Link to={`/capex/${c.id}/?consumed=${c.consumed}&final-budget=${c.final_budget}&budget-remaining=${c.budget_remaining}`}>
                                            <TipTool title={"Create Capex"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200 w-fit'><MdOutlineOpenInNew color='#f08080' size={22} /></div>} />
                                        </Link>)}
                                    </td>
                                    {isPermissionToView("capex:delete") && <td onClick={() => handleDelete(c.id)} className='delete'>
                                        <TipTool title={"Delete"} body={<div className='hover:bg-[#f5f5f5] p-2 rounded-2xl active:bg-gray-200 w-fit'><MdDeleteOutline color='#f08080' size={22} /></div>} />
                                    </td>}
                                </tr>
                            </Tooltip>
                        )
                    })
                } />
                < CPagination />
            </div>

        </div>
    )
}

function BudgetStatus(val) {
    if (val === true) {
        return (<div className='flex justify-center '><p className='px-3 py-1 rounded-full  bg-green-100 mt-[0.1rem] text-center'>Active</p></div>)
    }
    if (val === false) {
        return (<div className='flex justify-center'><p className='px-3 py-1 rounded-full  bg-red-100 mt-[0.1rem] text-center'>Inactive</p></div>)
    }
}

function CProgressBar({ consumed, final_budget, budget_remaining }) {
    const val = 80
    const consumed_in_percentage = Math.ceil((100 * consumed) / final_budget) > 100 ? 100 : Math.ceil((100 * consumed) / final_budget)
    const remaining_in_percentage = 100 - consumed_in_percentage
    return (<div className=' '>
        <div className='flex justify-between'>
            <p className='text-right text-xs mt-[1rem]'>{`${consumed_in_percentage}%`}</p>
            <p className='text-left text-xs mt-[1rem]'>{`${remaining_in_percentage}%`}</p>
        </div>
        <div className='w-[100%] relative'>
            <div className='bg-[#e9a5a1] p-1 rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[10px]'></div>
            <div style={{ width: `${consumed_in_percentage}%` }} className='bg-[#8eccaa] p-1 rounded-tl-[10px] rounded-bl-[10px] absolute z-[1] left-0 top-0'></div>
        </div>
        <div className='flex justify-between'>
            <p className='text-right text-xs'>{`₹${consumed}`}</p>
            <p className='text-left text-xs mt-[-0.1rem]'>{`₹${budget_remaining}`}</p>
        </div>
    </div>)
}


function TemporaryDrawer({ body }) {
    const { drawerStatus, setDrawerStatus } = useContext(AppContext)

    const list = (anchor) => (
        <Box
            role="presentation"
        >
            <div className='flex gap-5 ml-5'>
                <ButtonComponent icon={<IoMdArrowBack color='white' size={"15"} />} btnName={"Back"} onClick={() => setDrawerStatus(false)} />
                <span className='text-3xl mt-5'>Update Budget</span>
            </div>
            {body}
            <div className='absolute right-0 bottom-0 p-6' >
                <img loading='lazy' width={"450px"} src={IMAGES.conf_img_i} />
            </div>
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={"right"}
                        open={drawerStatus}
                        onClose={() => setDrawerStatus(false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className=' w-fit mt-5 no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline mt-1'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}