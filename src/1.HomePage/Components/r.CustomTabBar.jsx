import * as React from 'react';
import { TabBarlinks } from '../../Static/StaticValues';
import { AppContext } from '../../App';


export default function CustomTabBar() {
    const [btnBg, setBtnBg] = React.useState(1)
    const { collapse, setCollapse } = React.useContext(AppContext)

    function handleOnClick(index, whichFunction) {
        index === 0 && setCollapse(!collapse)
        index === 1 && (window.location.href = '/home')

    }
    return (
        <div className='fixed bottom-0 w-[100%] bg-[#ffff] overflow-y-hidden z-[60] shadow-[rgb(50,50,93)_0px_2px_5px_-1px,rgb(0,0,0)_0px_1px_3px_-1px]'>
            <div className='flex justify-between mx-10 my-1'>
                {TabBarlinks.map((x, i) => {
                    const { whichFunction } = x
                    return (
                        <div key={i} onClick={() => { handleOnClick(x.index, whichFunction), setBtnBg(x.index) }}>
                            <Icon icon={x.icon} index={x.index} btnBg={btnBg} />
                            <span style={{ fontWeight: x.index !== btnBg ? "300" : "700" }} className='text-center'>{x.label}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


function Icon({ icon: Icon, index, btnBg }) {
    return (
        <div className='flex justify-center w-auto h-auto'>
            <div style={{ borderRadius: '10px', padding: '0.3rem .5rem', backgroundColor: index === btnBg && "#e9ecef" }} >
                <Icon color="#555259" size="1.5rem" />
            </div>
        </div>
    )
}


