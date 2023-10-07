import * as React from "react";
import { AppContext } from "../App";
import Divider from '@mui/material/Divider';
import IMAGES from "../assets/Image/Image";
import moment from "moment";
import { Title } from "@mantine/core";


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
    const [i, setI] = React.useState()
    // const{}=React.useContext(AppContext)
    const data = [
        {
            "id": "80db68e5-811f-41ca-817f-a2f84e94dd8c",
            "start_date_time": "2023-09-21T10:40:52.036000Z",
            "end_date_time": "2023-09-21T10:40:52.036000Z",
            "v_company": "abc",
            "raised_by": null,
            "reason_for_visit": "aaa",
            "more_info": "8971291503",
            "veh_no": "ka02jp4573",
            "ppe": "0",
            "created_at": "2023-09-21T10:49:27.205379Z",
            "updated_at": "2023-09-21T10:49:27.205379Z",
            "delete_flag": "N",
            "visitors": [
                {
                    "v_name": "Sharan Kudtarkar",
                    "v_asset": "laptop",
                    "v_desig": "it",
                    "v_mobile_no": "8971291503"
                },
                {
                    "v_name": "Sharan Kudtarkar",
                    "v_asset": "laptop",
                    "v_desig": "it",
                    "v_mobile_no": "8971291503"
                }
            ]
        }
    ]
    return (
        <div>
            {
                data.map(y => {
                    return (
                        <div className="border-[10px] border-solid border-[black] ">
                            <div className="flex justify-between p-2">
                                <div className='flex gap-2'>
                                    <img src={IMAGES.ador_logo} alt="Ador" width={"80"} />
                                    {/* <Divider orientation='vertical' /> */}
                                    {/* <Title align="center" sx={(theme) => ({ marginTop: "0.2rem", fontSize: "25px", textTransform: "uppercase" })}> Sanvad</Title> */}
                                </div>
                                <strong className="text-2xl">VISITOR PASS</strong>
                                <div>
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">Visitor ID</span>
                                        <label>{"#111"}</label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">Visitor Pass</span>
                                        <label>{moment().format("DDMMYYYY")}/{"01"}</label>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <div className="grid grid-cols-2 p-5 mt-5">
                                <div>
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">Person In Charge</span>
                                        <label>{"y.raised_by"}</label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">Department</span>
                                        <label>{"y.raised_by"}</label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">Start Date</span>
                                        <label>{(y.start_date_time).substring(0, 10)}</label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">End Date</span>
                                        <label>{(y.end_date_time).substring(0, 10)}</label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">Start Time</span>
                                        <label>{moment(y.start_date_time).format("hh:mm a")}</label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-fit">
                                        <span className="font-bold">End Time</span>
                                        <label>{moment(y.end_date_time).format("hh:mm a")}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid justify-around mb-5">
                                <div className="grid grid-cols-2 gap-20 w-100%">
                                    <div className="border border-solid border-[black] rounded-xl">
                                        <div className="grid grid-cols-2 w-100% ">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2 rounded-tl-[10px]">Visitor's Name</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black] rounded-tr-[10px]" >{y.v_company}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2 ">Mobile No</span>
                                            <label className="pl-2 pr-2  border border-solid border-[black]" >{y.reason_for_visit}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2">Visitors Company</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black]">{y.veh_no}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100% ">
                                            <span className="font-bold border border-solid border-[black] pl-2 pr-2 rounded-bl-[10px]">Visitors Vehicle Number</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black] rounded-br-[10px]">{y.veh_no}</label>
                                        </div>
                                    </div>
                                    <div className="border border-solid border-[black] rounded-xl">
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="rounded-tl-[10px] pl-2 pr-2 border border-solid border-[black] font-bold">Number of Visitors</span>
                                            <label className=" rounded-tr-[10px] pl-2 pr-2 border border-solid border-[black]">{data[0]['visitors'].length}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="pl-2 pr-2 border border-solid border-[black] font-bold">Visitors Assets</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black]">{y.veh_no}</label>
                                        </div>
                                        <div className="grid grid-cols-2 w-100%">
                                            <span className="pl-2 pr-2 border border-solid border-[black] font-bold">Reason of Visit</span>
                                            <label className="pl-2 pr-2 border border-solid border-[black]">{y.veh_no}</label>
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
                                <span className="border-t-[black] border-t border-solid">Out Time</span>
                            </div>
                            <div className="flex flex-wrap gap-2 p-5">
                                <strong>N.B.- Visitor’s are kindly Requested:-</strong>
                                <span><strong>a.</strong>To declare material at the Security Gate.</span>
                                <span><strong>b.</strong>Not to go about places other than the place of work in the factory.</span>
                                <span><strong>c.</strong>To return this pass and badge at the gate at the time of departure.</span>
                                <strong>*Photography is strictly Prohibited*</strong>
                            </div>

                        </div>)
                })


            }
        </div>
    )
}