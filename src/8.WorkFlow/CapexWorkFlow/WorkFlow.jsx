import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useCallback } from 'react';
import { api } from '../../Helper Components/Api'
import LoadingSpinner from '../../Helper Components/LoadingSpinner';
import BackArrow from '../../Helper Components/SideComponent';
import ReactFlow, {
    addEdge, MarkerType,
    useNodesState,
    useEdgesState,

} from 'reactflow';
import 'reactflow/dist/style.css';
const CWorkFlow = () => {
    const capex_wf_corporate = useQuery(['it-plant'], async () => {
        return await axios.get(api.wf.capex_wf_corporate)
    })

    const capex_wf_plant = useQuery(['it-corporate'], async () => {
        return await axios.get(api.wf.capex_wf_plant)
    })

    // console.log(capex_wf_corporate?.data?.data, capex_wf_plant?.data?.data)

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
                <BackArrow location={"/home"} title={"Capex WorkFlow Configuration"} />
            </div>
            <div className='grid grid-cols-1 p-20 gap-20'>
                <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-lg border-[3px] border-solid border-[#e2e2e2]' >
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-lg p-2'>For Plant</span>
                    <div style={{ height: 300 }}>
                        <NestedFlowForPlant capex_wf_plant={capex_wf_plant} />
                    </div>
                </div>
                <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-lg border-[3px] border-solid border-[#e2e2e2]' >
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-lg p-2'>For Corporate Office</span>
                    <div style={{ height: 300 }}>
                        <NestedFlowForCorporateOffice capex_wf_corporate={capex_wf_corporate} />
                    </div>
                </div>
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