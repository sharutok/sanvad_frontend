import React from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import moment from 'moment'
export default function Date() {
    const dateP = {
        day: moment().format('DD'),
        digraph: getOrdinalIndicator(moment().date()),
        month: moment().format('MMMM'),
        year: moment().format('YYYY'),
    }

    function getOrdinalIndicator(number) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const remainder = number % 100;
        return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    }

    const { day } = useSpring({ from: { day: 0 }, day: Number(dateP.day), delay: 100, config: config.molasses })
    const { year } = useSpring({ from: { year: Number(dateP.year) - 10 }, year: Number(dateP.year), delay: 100, config: config.molasses })

    return (
        <div>
            <ChipsArray />
        </div>
        // <div>
        //     <span>Date</span>
        //     <div className='flex text-[2.5rem]'>
        //         <div className='flex'>
        //             <animated.div>{day.to(n => n.toFixed(0))}</animated.div>
        //             <span className='text-[1.5rem]'>{dateP.digraph}</span>
        //         </div>
        //         <span>{dateP.month}</span>,
        //         <animated.div>{year.to(n => n.toFixed(0))}</animated.div>
        //     </div>
        // </div>
    )
}

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function ChipsArray() {
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Welcome Back, Adithya' },

    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            {chipData.map((data) => {
                let icon;

                if (data.label === 'React') {
                    icon = <TagFacesIcon />;
                }

                return (
                    <ListItem key={data.key}>
                        <Chip
                            icon={icon}
                            label={data.label}
                            onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                        />
                    </ListItem>
                );
            })}
        </Paper>
    );
}
