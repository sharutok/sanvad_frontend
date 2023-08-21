import { Navbar, Text, createStyles, getStylesRef, rem } from '@mantine/core';

import {
    IconLogout,
} from '@tabler/icons-react';
import NavbarLinksGroup from './f.CollapsableLinks';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        maxHeight: 840,
        overflowY: 'scroll',
    },

    title: {
        textTransform: 'uppercase',
        letterSpacing: rem(-0.25),
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },

    footer: {
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingTop: theme.spacing.md,
    },
}));


export default function Sidebar() {
    const { classes } = useStyles();

    function handleLogout(e) {

    }

    return (
        <div>

            <div>
                <Navbar height={840} width={{ sm: 400 }} p="md" className={classes.navbar}>
                    <Navbar.Section>
                        <Text weight={500} size="sm" className={classes.title} color="dimmed" mb="xs">
                            sanvad@development
                        </Text>
                    </Navbar.Section>
                    <Navbar.Section grow mt="xl">
                        <NavbarLinksGroup />
                    </Navbar.Section>

                    {/* <Navbar.Section className={classes.footer}>
                        <div >
                            <Link to={'/login'} style={{ textDecoration: 'none' }} className={classes.link} onClick={handleLogout}>
                                <IconLogout className={classes.linkIcon} stroke={1.5} />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </Navbar.Section> */}
                </Navbar>
            </div>
            <div>
            </div>
        </div>
    );
}


