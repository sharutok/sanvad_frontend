import * as React from "react";

import PrintBody from "../4.VIsitorManagement/PrintBody";


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
    return <ComponentToPrint ref={ref} text={props.text} />;
});



