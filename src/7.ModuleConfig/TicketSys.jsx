import React from 'react'
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, TextField } from '@mui/material';

export default function TicketSys() {

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));
    const arr = [0, 9, 8, 7, 6, 5, 4, 3, 2]
    return (
        <div >
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[0, 1, 2, 3, 4, 5]}
                renderInput={(params) => <TextField {...params} label="Ticket Type*" size={"small"} />}
            />
            <Grid className='flex gap-1' >
                <span className='w-fit border'>Requirement Type</span>
                <div className='w-fit max-h-[10rem] overflow-y-scroll border'>
                    <List >
                        {arr.map(x => {
                            return (
                                <>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary="Single-line item"
                                        />
                                    </ListItem>
                                </>
                            )
                        })}

                    </List>
                </div>
            </Grid>
        </div>
    )
}
