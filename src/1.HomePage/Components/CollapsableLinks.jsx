import { useContext, useState } from 'react';
import { getCookies } from '../../Helper Components/CustomCookies';
import { AppContext } from '../../App';
import { isPermissionToView, links } from '../../Static/StaticValues';
import TipTool from '../../Helper Components/TipTool';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { PiFlowArrowBold } from 'react-icons/pi';
import AdvDropdown from './p.AdvDropdown';

export default function NavbarLinksGroup() {
    return (
        <>
            <SideLinkTag />
        </>
    )
}

function SideLinkTag() {
    const user_perm = getCookies()[1]
    const { collapse, setCollapse, setOpen } = useContext(AppContext)

    function handleNavigation(link) {
        window.location.href = link
    }

    return (

        <div className='h-max grid grid-cols-1 gap-3 px-5'>
            {links.map((x, i) => {
                return (
                    <div key={i}>
                        {isPermissionToView(x.index) && <div>
                            {!x.links ? <div onClick={() => handleNavigation(x.mainlink)} className='w-100 '>
                                <div className=' hover:bg-[#f7f7f7] cursor-pointer rounded-lg flex gap-3'>
                                    {collapse ? <TipTool position={"right"} title={x.label} body={
                                        <div className='p-3'>
                                            <Icon icon={x.icon} />
                                        </div>
                                    } /> : <div className='p-3' >
                                        <Icon icon={x.icon} />
                                    </div>}
                                    {!collapse && <span className='text-[#555259] p-3'>{x.label}</span>}
                                </div>
                            </div> : <AdvDropdown x={x} collapse={collapse} />}
                        </div>}
                    </div>
                )
            })}
        </div>
    );
}


function Icon({ icon: Icon }) {
    return (
        <div className='ml-1'>
            <Icon color="#555259" size="1.5rem" />
        </div>
    )
}
