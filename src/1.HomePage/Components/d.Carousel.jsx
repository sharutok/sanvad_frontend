import { createStyles, Card, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

const useStyles = createStyles((theme) => ({
    price: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
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
        width: rem(4),
        height: rem(4),
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: rem(16),
        },
    },
}));


export default function Carousels({ x }) {
    const { classes } = useStyles();
    const slides = x.image.map((image, i) => (
        <Carousel.Slide key={i}>
            <img className='w-full h-full' src={image.thumbnail_url} alt="no" />
        </Carousel.Slide>
    ));

    return (
        <>
            <Card radius="md">
                <Card.Section>
                    <Carousel
                        withIndicators
                        loop
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