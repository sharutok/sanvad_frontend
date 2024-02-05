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

// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '&:hover': {
//             backgroundColor: 'transparent',
//         },
//         '&.Mui-focusVisible': {
//             backgroundColor: 'transparent',
//         },
//     },
// }));

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
                            </div> : !collapse && <MultiSelect x={x} collapse={collapse} />}
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


function MultiSelect({ x, collapse }) {

    return (
        <TreeView
            sx={{
                p: 1.5,
                flexGrow: 1, '&:hover': {
                    backgroundColor: 'white', // Change the background color to white on hover
                },
            }}
            className='hover:bg-[#f7f7f7] cursor-pointer rounded-lg'
            aria-label="file system navigator"
            defaultCollapseIcon={<PiFlowArrowBold size="1.5rem" />}
            defaultEndIcon={<PiFlowArrowBold size="1.5rem" />}
            defaultExpandIcon={<PiFlowArrowBold size="1.5rem" />}
        >
            <TreeItem sx={{
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            }} nodeId="1" label={<div onClick={() => handleNavigation(x.mainlink)} className='w-100 rounded-xl'>
                <div className='flex'>
                    {collapse ? <TipTool position={"right"} title={x.label} body={
                        <div className='p-3'>
                            <Icon icon={x.icon} />
                        </div>
                    } /> : <div className='p-4' >
                    </div>}
                    {!collapse && <span className='text-[#555259] '>{x.label}</span>}
                </div>
            </div>}>
                {x.links.map((y, i) => {
                    return (
                        <TreeItem sx={{
                            p: 1.5,
                            flexGrow: 1, '&:hover': {
                                backgroundColor: 'white', // Change the background color to white on hover
                            },
                        }}
                            onClick={() => window.location.href = y.link} nodeId={String(y + 1)} label={y.label} />
                    )
                })}
            </TreeItem>
        </TreeView>
    )
}