import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../Helper Components/LoadingSpinner'
import { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    useNodesState,
    useEdgesState,

} from 'reactflow';
import 'reactflow/dist/style.css';
import { api } from '../../Helper Components/Api'
import BackArrow from '../../Helper Components/SideComponent';

export default function WorkFlow() {
    const it_system = useQuery(['it-system'], async () => {
        return await axios.get(api.wf.it_system_ticket_wf)
    })

    const it_infra = useQuery(['it_infra'], async () => {
        return await axios.get(api.wf.it_infra_ticket_wf)
    })

    if (it_system.isLoading || it_infra.isLoading) {
        return (
            <>
                <LoadingSpinner />
            </>
        )
    }

    return (
        <>
            <div className='mt-20'>
                <BackArrow location={"/home"} title={"Ticket WorkFlow Configuration"} />
            </div>
            <div className='grid grid-cols-1 p-10 gap-10'>
                <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-lg border-[3px] border-solid border-[#e2e2e2]' >
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-lg p-2'>For IT Systems</span>
                    <div style={{ height: 400 }}>
                        <NestedFlowForSystems it_system={it_system} />
                    </div>
                </div>
                <div className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-lg border-[3px] border-solid border-[#e2e2e2]'  >
                    <span style={{ fontFamily: "Brandon Grotesque" }} className='text-lg p-2'>For IT Infra</span>
                    <div style={{ height: 400 }}>
                        <NestedFlowForInfra it_infra={it_infra} />

                    </div>
                </div>
            </div>
        </>
    )
}

const NestedFlowForSystems = ({ it_system }) => {
    let initialNodes = []
    let initialEdges = []

    for (let x = 1; x <= it_system?.data?.data?.length; x++) {
        initialNodes.push({
            id: `horizontal-${x + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `${String(it_system?.data?.data[x - 1]?.type).toUpperCase().replaceAll("_", " ")}` + `(${it_system?.data?.data[x - 1]?.user})` },
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
};



const NestedFlowForInfra = ({ it_infra }) => {
    let initialNodesOdd = []
    let initialNodesEven = []
    let initialNodes = []

    console.log(it_infra?.data?.data[0]['req1']);

    for (let x = 2; x <= it_infra?.data?.data[0]['req1']?.length; x++) {
        initialNodesEven.push({
            id: `horizontal-${(x - 1) * 2}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `${String(it_infra?.data?.data[0]['req1'][x - 1]?.type).toUpperCase().replaceAll("_", " ")}(${it_infra?.data?.data[0]['req1'][x - 1]?.user})` },
            position: { x: 250 * (x - 1), y: 0 },

        })
    }

    initialNodesOdd = [
        {
            id: 'horizontal-1',
            sourcePosition: 'right',
            type: 'input',
            data: { label: 'USER' },
            position: { x: 0, y: 80 },

        },

        {
            id: 'horizontal-3',
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `USERS'S MANAGER` },
            position: { x: 250, y: 160 },

        },

        {
            id: 'horizontal-5',
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: 'IT TICKET ADMIN' },
            position: { x: 500, y: 160 },

        },
        {
            id: 'horizontal-7',
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: 'IT HEAD' },
            position: { x: 750, y: 160 },

        },
        {
            id: 'horizontal-9',
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: 'TECHINICAL USER' },
            position: { x: 1000, y: 160 },

        },
    ];


    initialNodes = [...initialNodesOdd, ...initialNodesEven]

    const initialEdges = [
        {
            id: 'horizontal-e1-2',
            source: 'horizontal-1',
            type: 'smoothstep',
            target: 'horizontal-2',
            animated: true,
            label: 'Issues',
        },
        {
            id: 'horizontal-e1-3',
            source: 'horizontal-1',
            type: 'smoothstep',
            target: 'horizontal-3',
            animated: true,
            label: 'DataCenter/VPN/System Requirement',
        },
        {
            id: 'horizontal-e1-4',
            source: 'horizontal-2',
            type: 'smoothstep',
            target: 'horizontal-4',
            animated: true,
        },
        {
            id: 'horizontal-e3-5',
            source: 'horizontal-3',
            type: 'smoothstep',
            target: 'horizontal-5',
            animated: true,
        },
        {
            id: 'horizontal-e3-6',
            source: 'horizontal-3',
            type: 'smoothstep',
            target: 'horizontal-6',
            animated: true,
        },
        {
            id: 'horizontal-e5-7',
            source: 'horizontal-5',
            type: 'smoothstep',
            target: 'horizontal-7',
            animated: true,
        },
        {
            id: 'horizontal-e5-8',
            source: 'horizontal-9',
            type: 'smoothstep',
            target: 'horizontal-7',
            animated: true,
        },

    ];

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
            {/* <Controls /> */}
        </ReactFlow>
    );
}
