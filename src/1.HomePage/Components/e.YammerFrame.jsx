import React, { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../../Helper Components/Api'
import moment from 'moment'
import { AiOutlineLike } from 'react-icons/ai';
import { createStyles, Card, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';


export default function YammerFrame() {

    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.yammer.get_data) })
    return (
        <div>
            <h1>Native Yammer Posts/Feeds</h1>
            {!isLoading && <ICarousels data={data} />}
        </div>
    )
}


const useStyles = createStyles((theme) => ({
    price: {
        color: theme.black,
    },

    carousel: {
        '&:hover': {
            [`& .${getStylesRef('carouselControls')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getStylesRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        color: 'red',
        width: rem(10),
        height: rem(10),
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: rem(16),
        },
    },
}));


function ICarousels({ data }) {
    const autoplay = useRef(Autoplay({ delay: 2000 }));

    const { classes } = useStyles();
    const slides = data?.data.map((x, i) => (
        <Carousel.Slide key={i + 9} >
            <div className=''>
                <div className='text-center text-2xl p-1'>
                    <span >{x.message}</span>
                </div>
                {/* <Carousels x={x} /> */}
                <div className=''>
                    <div className='flex px-5'>
                        <AiOutlineLike color="#3d3d3d" fontSize='25' className='cursor-pointer' />
                        <span color='#3d3d3d' className=' text-xl'>{x.liked_by}</span>
                    </div>
                    <div className='mt-20 px-5 flex justify-between'>
                        <span color='#3d3d3d'>Posted on: {moment(x.created_at).format("DD MMMM YYYY")}</span>
                        <a href={x.web_url}>Click here for more...</a>
                    </div>
                </div>
                <br />
            </div>
        </Carousel.Slide >
    ));

    return (
        <>
            <Card radius="md" withBorder>
                <Card.Section >
                    <Carousel
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                        orientation="horizontal"
                        height={200}
                        withIndicators
                        mx="auto"
                        classNames={{
                            root: classes.carousel,
                            controls: classes.carouselControls,
                            indicator: classes.carouselIndicator,
                        }}
                    >
                        {slides}
                    </Carousel>
                </Card.Section>
            </Card>
        </>
    );
}