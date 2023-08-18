import React, { useContext } from 'react'
import { Text, Progress, Card, createStyles } from '@mantine/core';
import { AppContext } from '../App';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: "#2b2b2b",
    },

    title: {
        color: theme.fn.rgba(theme.white, 0.65),
    },

    stats: {
        color: theme.white,
    },

    progressBar: {
        backgroundColor: theme.white,
    },

    progressTrack: {
        backgroundColor: theme.fn.rgba(theme.white, 0.4),
    },
}));


export default function BudgetBar() {
    const { capex } = useContext(AppContext)
    const data = [
        { A: 100000, B: capex?.final_budget },
        // { A: 10, B: 20 },
        // { A: 10, B: 20 }
    ]
    console.log(data);
    const { classes } = useStyles();

    return (
        <div className='grid grid-cols-[repeat(3,1fr)] gap-10 p-4'>
            {data.map((val, i) => {
                return (
                    <div key={i}>
                        <Card withBorder radius="md" p="xl" className={classes.card}>
                            <Text fz="xs" tt="uppercase" fw={700} className={classes.title}>
                                Monthly goal
                            </Text>
                            <Text fz="lg" fw={500} className={classes.stats}>
                                {`₹${Number(val.A).toLocaleString('en-IN')} / ₹${Number(val.B).toLocaleString('en-IN')} Crores`}
                            </Text>
                            <Progress
                                value={(val.A / val.B) * 100}
                                mt="md"
                                size="lg"
                                radius="xl"
                                classNames={{
                                    root: classes.progressTrack,
                                    bar: classes.progressBar,
                                }}
                            />
                        </Card>
                    </div>
                )

            })}
        </div>
    )
}
