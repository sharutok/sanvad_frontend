import * as React from "react";
import { AppContext } from "../App";
import Divider from '@mui/material/Divider';
import IMAGES from "../assets/Image/Image";
import moment from "moment";


export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { checked: false };
    }

    canvasEl;

    componentDidMount() {
        const ctx = this.canvasEl.getContext("2d");
        if (ctx) {
            ctx.beginPath();
            ctx.arc(95, 50, 40, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = "rgb(200, 0, 0)";
            ctx.fillRect(85, 40, 20, 20);
            ctx.save();
        }
    }

    handleCheckboxOnChange = () =>
        this.setState({ checked: !this.state.checked });
    setRef = (ref) => (this.canvasEl = ref);

    render() {
        const { text } = this.props;

        return (
            <div >
                <style type="text/css" media="print">
                </style>
                <div >
                    <canvas className="hidden" ref={this.setRef} >
                        Your browser does not support the HTML5 canvas tag.
                    </canvas>
                    <div >
                        <div className="w-100%">
                            <PrintBody />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
    // eslint-disable-line max-len
    return <ComponentToPrint ref={ref} text={props.text} />;
});



function PrintBody() {
    const { visitors, visitorPass } = React.useContext(AppContext)
    return (
        <div>
            {
                visitorPass?.length && visitorPass?.map((y, i) => {
                    const t_assets = JSON.parse(y['visitors'])?.map(h => { return h?.v_asset ? h?.v_asset?.toUpperCase() : "" })
                    const assets = t_assets.join(', ') && []
                    return (
                        <div key={i} className="border-[10px] border-solid border-[black] ">
                            <div className="flex justify-between p-2 w-full">
                                <div className='flex gap-2'>
                                    <img src={IMAGES.ador_logo} alt="Ador" width={"85"} />
                                </div>
                                <strong className="text-2xl">VISITOR PASS</strong>
                                <div></div>
                            </div>
                            <Divider />
                            <div className="flex justify-start px-5">
                                <div className="flex gap-2 ">
                                    <span className="font-bold">Visitor Ref No:</span>
                                    <b>{(y.id)}</b>
                                </div>
                                {/* <div className="flex gap-2">
                                    <span className="font-bold">Visitor Pass</span>
                                    <span>{moment(y.created_at).format("DDMMYYYY")}</span>
                                </div> */}
                            </div>
                            <div className="grid grid-cols-2 p-5 mt-5 justify-around">
                                <div className="w-[25rem]">
                                    <div className="grid grid-cols-2 ">
                                        <span className="font-bold">Person In Charge</span>
                                        <label>{y.name}</label>
                                    </div>
                                    <div className="grid grid-cols-2  ">
                                        <span className="font-bold">Department</span>
                                        <label className="">{y.department}</label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 ">
                                    <div className="grid grid-cols-2  ">
                                        <span className="font-bold">Start Date</span>
                                        <label>{(y?.start_date_time).substring(0, 10)}</label>
                                    </div>
                                    <div className="grid grid-cols-2  ">
                                        <span className="font-bold">End Date</span>
                                        <label>{(y?.end_date_time).substring(0, 10)}</label>
                                    </div>
                                    <div className="grid grid-cols-2  ">
                                        <span className="font-bold">Start Time</span>
                                        <label>{moment(y.start_date_time).format("hh:mm a")}</label>
                                    </div>
                                    <div className="grid grid-cols-2  ">
                                        <span className="font-bold">End Time</span>
                                        <label>{moment(y.end_date_time).format("hh:mm a")}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid justify-around mb-3">
                                <div className="grid grid-cols-2 gap-20 w-100%">
                                    <div className="border border-solid border-[black] rounded-xl">
                                        <div className="grid grid-cols-2 w-100% ">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2 rounded-tl-[10px]">Visitor's Name</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black] rounded-tr-[10px]" >{(JSON.parse(y['visitors']) && (JSON.parse(y['visitors'])[0]['v_name']))}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2 ">Mobile No</span>
                                            <label className="pl-2 pr-2  border border-solid border-[black]" >{y.more_info}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2">Visitors Company</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black]">{y.v_company && y.v_company}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100% ">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2 rounded-bl-[10px]">Visitors Vehicle Number</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black] rounded-br-[10px]">{y.veh_no && y.veh_no}</label>
                                        </div>
                                    </div>
                                    <div className="border border-solid border-[black] rounded-xl">
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="rounded-tl-[10px] pl-2 pr-2 border border-solid border-[black] font-bold">Number of Visitors</span>
                                            <label className=" rounded-tr-[10px] pl-2 pr-2 border border-solid border-[black]">{JSON.parse(y['visitors']).length}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="pl-2 pr-2 border border-solid border-[black] font-bold">Visitors Assets</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black]">{assets}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="pl-2 pr-2 border border-solid border-[black] font-bold">Reason of Visit</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black]">{(y.reason_for_visit && y.reason_for_visit).substring(0, 20)}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="rounded-bl-[10px] pl-2 pr-2 border border-solid border-[black] font-bold">PPE Provided</span>
                                            <label className="rounded-br-[10px] pl-2 pr-2 border border-solid border-[black]">{y.ppe === "0" ? "Yes" : "No"}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <div className="flex justify-around mt-20 pr-5 pl-5">
                                <span className="border-t-[black] border-t border-solid">Visitor's Sign</span>
                                <span className="border-t-[black] border-t border-solid">Employee InCharge Sign</span>
                                <p className="border-t-[black] border-t border-solid">Security Sign</p>
                                <span className="border-t-[black] border-t border-solid">In Time</span>
                                <span className="border-t-[black] border-t border-solid">Out Time</span>
                            </div>
                            <div className="flex flex-wrap gap-2 p-5">
                                <strong>N.B.- Visitor’s are kindly Requested:-</strong>
                                <span><strong>a.</strong>To declare material at the Security Gate.</span>
                                <span><strong>b.</strong>Not to go about places other than the place of work in the factory.</span>
                                <span><strong>c.</strong>To return this pass and badge at the gate at the time of departure.</span>
                                <strong>*<i>Photography is strictly Prohibited</i>*</strong>
                            </div>

                        </div>
                    )
                })


            }
        </div>
    )
}