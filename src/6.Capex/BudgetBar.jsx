import React, { useContext } from 'react'
import { Text, Progress, Card, createStyles } from '@mantine/core';
import { AppContext } from '../App';
import { useParams, useSearchParams } from 'react-router-dom';

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
    const [searchParams, setSearchParams] = useSearchParams();
    const consumed = searchParams.get('consumed');
    const final_budget = searchParams.get('final-budget');

    const consumed_in_percentage = Math.ceil((100 * consumed) / final_budget)
    const remaining_in_percentage = 100 - consumed_in_percentage
    const data = [
        { A: consumed_in_percentage, B: remaining_in_percentage },
    ]
    const { classes } = useStyles();

    return (
        <div className='grid grid-cols-[repeat(3,1fr)] gap-10 p-4'>
            {data.map((val, i) => {
                return (
                    <div key={i}>
                        <Card withBorder radius="md" p="xl" className={classes.card}>
                            <div className='flex justify-between'>
                                <Text fz="xs" tt="uppercase" fw={700} className={classes.title}>
                                    Used Capex
                                </Text>
                                <Text fz="xs" tt="uppercase" fw={700} className={classes.title}>
                                    Remaining Capex
                                </Text>
                            </div>
                            <div className='flex justify-between'>
                                <Text fz="lg" fw={500} className={classes.stats}>
                                    {`₹${Number(val.A).toLocaleString('en-IN')} Lakhs`}
                                </Text>
                                <Text fz="lg" fw={500} className={classes.stats}>
                                    {`₹${Number(val.B).toLocaleString('en-IN')} Lakhs`}
                                </Text>
                            </div>
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
