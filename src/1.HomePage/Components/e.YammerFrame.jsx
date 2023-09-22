import React, { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { api } from '../../Helper Components/Api'
import moment from 'moment'
import { AiOutlineLike } from 'react-icons/ai';
import { createStyles, Card, getStylesRef, rem, Group, Text } from '@mantine/core';
import LoadingSpinner from '../../Helper Components/LoadingSpinner'
import Avatar from '@mui/material/Avatar';
import IMAGES from '../../assets/Image/Image'


export default function YammerFrame() {
    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.yammer.get_data) })
    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <div >
            <span className='text-xl p-1 '>Yammer Posts</span>
            <div className='border-[1px] border-solid border-[#cfcfcf] rounded-xl max-h-[56vh] overflow-y-scroll p-4'>

                {!isLoading && <ICarousels data={data} />}
            </div>
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


// function ICarousels({ data }) {
//     const autoplay = useRef(Autoplay({ delay: 2000 }));

//     const { classes } = useStyles();
//     const slides = data?.data.data.map((x, i) => (
//         <Carousel.Slide key={i + 9} >
//             <div  >
//                 <div className='text-center mt-3 p-3' style={{ wordBreak: "break-word" }}>
//                     {/* <TipTool title={x.message.toUpperCase()} body={
//                         <Text fz="lg" className='underline'>
//                             {x.message.length >= 100 ? `${(x.message.toUpperCase()).substring(0, 50)}.....` : x.message.toUpperCase()}
//                         </Text>
//                     } /> */}
//                     <p>{x.message.toUpperCase()}</p>
//                 </div>

//                 <div className='flex justify-center mt-4'>
//                     {x?.image.length == (0 || null || "" || []) && <img style={{ width: "400px" }} src={IMAGES.yammer_alt} />}
//                     {x?.image[0]?.type === "image" && <img style={{ width: "400px" }} src={x?.image[0]?.sharepoint_web_url} />}
//                     {x?.image[0]?.type === "file" && <video style={{ width: "400px" }} controls>
//                         <source src={x?.image[0]?.sharepoint_web_url} type="video/mp4" />
//                     </video>}

//                 </div>
//                 <div className=''>
//                     {/* <span className='hr'></span> */}
//                     <div className='px-3'>
//                         <div className='flex'>
//                             <AiOutlineLike color="#3d3d3d" fontSize='20' className='cursor-pointer' />
//                             <span color='#3d3d3d' className=' text-l'>{x.liked_by}</span>
//                         </div>
//                     </div>
//                     <Group className='px-3' position="apart" >
//                         <Text fw={500} fz=" ">
//                             Posted on: {moment(x.created_at).format("DD MMMM YYYY")}
//                         </Text>

//                         <Group spacing={5}>
//                             <Text fz="xs" fw={500}>
//                                 <a href={x.web_url}>Click here for more...</a>
//                             </Text>
//                         </Group>
//                     </Group>
//                 </div>
//             </div>
//         </Carousel.Slide >
//     ));

//     return (
//         <div style={{ width: "50rem" }}>
//             <Card radius="md" withBorder>
//                 <Card.Section >
//                     <Carousel
//                         plugins={[autoplay.current]}
//                         onMouseEnter={autoplay.current.stop}
//                         onMouseLeave={autoplay.current.reset}
//                         orientation="horizontal"
//                         withIndicators
//                         mx="auto"
//                         classNames={{
//                             root: classes.carousel,
//                             controls: classes.carouselControls,
//                             indicator: classes.carouselIndicator,
//                         }}
//                     >
//                         {slides}
//                     </Carousel>
//                 </Card.Section>
//             </Card>
//         </div>
//     );
// }


function ICarousels({ data }) {
    return (
        data?.data?.data?.map((x, i) => {
            return (
                <div key={i} className='grid mb-6'>
                    <div className='shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px] rounded-xl p-2 grid'>
                        <div className='flex gap-2 p-2'>
                            <Avatar sx={{ width: 45, height: 45, bgcolor: "#2b58a5" }}>{(x.sender_id).split(" ")[0][0]}{String((x.sender_id).split(" ")[1])[0].toUpperCase()}</Avatar>
                            <div className='grid grid-cols-1'>
                                <span className='text-lg'>{x.sender_id}</span>
                                <span className='text-xs'>{moment(x.created_at).format("DD MMMM YYYY")}</span>
                            </div>
                        </div>
                        <div className='text-center my-3 mx-1' style={{ wordBreak: "break-word" }}>
                            <p className='text-lg font-extrabold'>{x.message.toUpperCase()}</p>

                        </div>

                        <div className='flex justify-center '>
                            {x?.image[0]?.type === "image" && <img style={{ width: "400px" }} src={x.image[0].sharepoint_web_url} />}
                            {x?.image[0]?.type === "file" && <video style={{ width: "400px" }} controls>
                                <source src={x?.image[0]?.sharepoint_web_url} type="video/mp4" />
                            </video>}

                        </div>
                        <div className='py-2'>
                            <Group className='px-3' position="apart" >
                                <Text fw={500} >
                                    <div className='flex'>
                                        <img className='rotate-180 -scale-x-100' width={30} src={IMAGES.like_gif} alt="" />
                                        {/* <AiOutlineLike color="#3d3d3d" fontSize='20' className='cursor-pointer' /> */}
                                        <span color='#3d3d3d' className=' text-lg'>{x.liked_by}</span>
                                    </div>
                                </Text>
                                <Group spacing={5}>
                                    <Text fz="xs" fw={500}>
                                        <a href={x.web_url}>Click here for more...</a>
                                    </Text>
                                </Group>
                            </Group>
                        </div>
                    </div>
                </div >
            )
        })
    )
}