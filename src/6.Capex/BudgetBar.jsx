import React from 'react'
import { Text, Progress, Card, createStyles } from '@mantine/core';

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
    const data = [
        { A: 10, B: 20 },
        { A: 10, B: 20 },
        { A: 10, B: 20 }
    ]
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
                                $5.431 / $10.000
                            </Text>
                            <Progress
                                value={54.31}
                                mt="md"
                                size="lg"
                                radius="xl"
                                classNames={{
                                    root: classes.progressTrack,
                                    bar: classes.progressBar,
                                }}
                            />
                        </Card>
                        {/* <Card
                            withBorder
                            radius="md"
                            padding="xl"
                            sx={(theme) => ({
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                            })}
                        >
                            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                                Monthly goal
                            </Text>
                            <Text fz="lg" fw={500}>
                                {`₹${val.A} / ₹${val.B}`}
                            </Text>
                            <Progress value={90} mt="md" size="lg" radius="xl" color='blue' />
                        </Card> */}
                    </div>
                )

            })}
        </div>
    )
}
