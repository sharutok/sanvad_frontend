import React, { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../../Helper Components/Api'
import moment from 'moment'
import { AiOutlineLike } from 'react-icons/ai';
import { createStyles, Card, getStylesRef, rem, Group, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import IMAGES from "../../assets/Image/Image"
import { IconStar } from '@tabler/icons-react'

export default function YammerFrame() {

    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.yammer.get_data) })
    return (
        <div>
            {/* <h1>Native Yammer Posts/Feeds</h1> */}
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
            <div  >
                <div className='text-center mt-3' style={{ wordBreak: "break-word" }}>
                    <Text fz="lg" className='underline'>
                        {x.message.toUpperCase()}
                    </Text>
                </div>
                {/* <span className='hr'></span> */}
                <div className='flex justify-center mt-4'>
                    {console.log(window.innerHeight, window.innerHeight)}
                    {x?.image.length == (0 || null || "" || []) && <img style={{ height: "400px" }} src={IMAGES.yammer_alt} />}
                    {x?.image[0]?.type === "image" && <img style={{ height: "400px" }} src={x?.image[0]?.sharepoint_web_url} />}
                    {x?.image[0]?.type === "file" && <video style={{ height: "400px" }} controls>
                        <source src={x?.image[0]?.sharepoint_web_url} type="video/mp4" />
                    </video>}
                </div>
                <span className='hr'></span>
                <div className='px-3'>
                    <div className='flex'>
                        <AiOutlineLike color="#3d3d3d" fontSize='20' className='cursor-pointer' />
                        <span color='#3d3d3d' className=' text-l'>{x.liked_by}</span>
                    </div>
                </div>
                <Group className='px-3' position="apart" >
                    <Text fw={500} fz=" ">
                        Posted on: {moment(x.created_at).format("DD MMMM YYYY")}
                    </Text>

                    <Group spacing={5}>
                        <Text fz="xs" fw={500}>
                            <a href={x.web_url}>Click here for more...</a>
                        </Text>
                    </Group>
                </Group>
            </div>
        </Carousel.Slide >
    ));

    return (
        <div >
            <Card radius="md" withBorder>
                <Card.Section >
                    <Carousel
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                        orientation="horizontal"
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
        </div>
    );
}