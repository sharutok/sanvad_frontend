import React from 'react'
import {
    IconButton, Tooltip, Zoom
} from '@mui/material'
function TipTool({ body, title, position }) {
    return (
        <div>
            <Tooltip style={{ cursor: "pointer" }} title={title}
                TransitionComponent={Zoom}
                placement={position || "top"}
                disableInteractive>
                {body}
            </Tooltip>
        </div>
    )
}

export default TipTool