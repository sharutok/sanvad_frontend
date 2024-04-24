import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import React from 'react';
import { IoAdd } from "react-icons/io5";
import { MdBrowserUpdated } from "react-icons/md";
import 'reactflow/dist/style.css';
import BackArrow from '../../Helper Components/SideComponent';
import CapexWorkFlowList from './CapexWorkFlowList';
import ButtonComponent from '../../Helper Components/ButtonComponent';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CWorkFlow = () => {
    return (
        <>
            <div className='mt-20'>
                <div className='flex justify-between '>
                    <BackArrow location={"/home"} title={"Capex WorkFlow Configuration"} />
                    <div className='flex gap-4 mt-3 mr-10'>
                        <ButtonComponent onClick={() => { window.location.href = "/capex/wf/create" }} icon={<IoAdd color='white' size={"23"} />} btnName={"Create Capex Flow"} />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 mt-20 mx-10'>
                <CapexWorkFlowList />
            </div>
        </>
    );
}

export default CWorkFlow;

