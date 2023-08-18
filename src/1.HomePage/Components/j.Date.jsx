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
            <span>Date</span>
            <div className='flex text-[2.5rem]'>
                <div className='flex'>
                    <animated.div>{day.to(n => n.toFixed(0))}</animated.div>
                    <span className='text-[1.5rem]'>{dateP.digraph}</span>
                </div>
                <span>{dateP.month}</span>,
                <animated.div>{year.to(n => n.toFixed(0))}</animated.div>
            </div>
        </div>
    )
}
