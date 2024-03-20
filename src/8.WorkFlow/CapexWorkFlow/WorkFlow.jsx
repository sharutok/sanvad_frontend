import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useCallback } from 'react';
import { IoAdd } from "react-icons/io5";
import { MdBrowserUpdated } from "react-icons/md";
import ReactFlow, {
    MarkerType,
    addEdge,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { api } from '../../Helper Components/Api';
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import BackArrow from '../../Helper Components/SideComponent';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CWorkFlow = () => {
    const capex_wf_corporate = useQuery(['it-plant'], async () => {
        return await axios.get(api.wf.capex_wf_corporate)
    })

    const capex_wf_plant = useQuery(['it-corporate'], async () => {
        return await axios.get(api.wf.capex_wf_plant)
    })

    const _plant_dept = useQuery(['plant_dept'], async () => {
        const data = axios.get(api.utils.dept_plant)
        return data
    })

    if (capex_wf_corporate.isLoading || capex_wf_plant.isLoading) {
        return (
            <>
                <LoadingSpinner />
            </>
        )
    }

    return (
        <>
            <div className='mt-20'>
                <div className='flex justify-between mt-20'>
                    <BackArrow location={"/home"} title={"Capex WorkFlow Configuration"} />
                    <div className='flex gap-4 mt-3 mr-10'>
                        <ButtonComponent onClick={() => { window.location.href = "/capex/wf/create" }} icon={<IoAdd color='white' size={"23"} />} btnName={"Create Capex Flow"} />
                        <ButtonComponent onClick={() => { window.location.href = '/capex/wf/update' }} icon={<MdBrowserUpdated color='white' size={"23"} />} btnName={"Update Capex Flow"} />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 p-20 gap-20'>
                <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-lg border-[3px] border-solid border-[#e2e2e2]' >
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-lg p-2'>For Plant's</span>
                    <div style={{ height: 300 }}>
                        <NestedFlowForPlant capex_wf_plant={capex_wf_plant} />
                    </div>
                </div>
                <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-lg border-[3px] border-solid border-[#e2e2e2]' >
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-lg p-2'>For Corporate Office's</span>
                    <div style={{ height: 300 }}>
                        <NestedFlowForCorporateOffice capex_wf_corporate={capex_wf_corporate} />
                    </div>
                </div>
                {/* <div className='grid gap-5'>
                    <span>Select department which comes under <b>corporate flow</b>, unchecked will be considered as <b>plant flow</b></span>
                    <div className='w-[50rem] '>
                        <Autocomplete
                            multiple
                            limitTags={5}
                            id="checkboxes-tags-demo"
                            options={_plant_dept?.data?.data?.department || []}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            // onChange={(e, x) => {
                            //     setUsermanagement({ ...usermanagement, module_permission: [...x] })
                            // }}
                            // value={usermanagement.module_permission}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option}
                                </li>
                            )}
                            size={"small"}
                            renderInput={(params) => (
                                <TextField {...params} label="Flow under Corporate Office"
                                />
                            )}
                        />
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default CWorkFlow;



const NestedFlowForPlant = ({ capex_wf_plant }) => {
    let initialNodes = []
    let initialEdges = []

    for (let x = 1; x <= capex_wf_plant?.data?.data?.length; x++) {
        initialNodes.push({
            id: `horizontal-${x + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `${String(capex_wf_plant?.data?.data[x - 1]?.type).toUpperCase().replaceAll("_", " ")}` },
            position: { x: 300 * x, y: 0 },
        })
        initialEdges.push({
            id: `horizontal-e1-${x + 1}`,
            source: `horizontal-${x}`,
            type: 'smoothstep',
            target: `horizontal-${x + 1}`,
            animated: true,
        },)
    }


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection) => {
        setEdges((eds) => addEdge(connection, eds));
    }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            className="react-flow-subflows-example"
            fitView
        >
        </ReactFlow>
    );
}
const NestedFlowForCorporateOffice = ({ capex_wf_corporate }) => {
    let initialNodes = []
    let initialEdges = []

    for (let x = 1; x <= capex_wf_corporate?.data?.data?.length; x++) {
        initialNodes.push({
            id: `horizontal-${x + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `${String(capex_wf_corporate?.data?.data[x - 1]?.type).toUpperCase().replaceAll("_", " ")}` },
            markerEnd: {
                type: MarkerType.Arrow,
            },
            position: { x: 300 * x, y: 0 },
        })
        initialEdges.push({
            id: `horizontal-e1-${x + 1}`,
            source: `horizontal-${x}`,
            type: 'smoothstep',
            target: `horizontal-${x + 1}`,
            animated: true,
        },)
    }


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection) => {
        setEdges((eds) => addEdge(connection, eds));
    }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            className="react-flow-subflows-example"
            fitView
        >
        </ReactFlow>
    );
}


const ButtonComponent = ({ onClick, icon, btnName, ...props }) => {
    return (

        <div
            onClick={onClick}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}
