import React from 'react'
import { styled } from '@mui/material/styles';
import { Button, Zoom } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function TipTool({ body, title, position }) {

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} style={{ cursor: "pointer" }} title={title}
            TransitionComponent={Zoom}
            placement={position || "top"}
            disableInteractive>
            {body}
        </Tooltip>
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: 15,
            fontWeight: "bold",
        },
    }));

    return (
        <div>
            <LightTooltip title="Add">
            </LightTooltip>
        </div>
    )
}

export default TipTool