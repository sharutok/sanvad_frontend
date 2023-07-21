import { useState } from 'react';
import { Navbar, SegmentedControl, Text, createStyles, getStylesRef, rem } from '@mantine/core';
import { FaUsers, FaIdBadge, FaUserCog, } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { MdCurrencyExchange, MdSettingsApplications } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { IoIosPaper } from "react-icons/io";

import {
    IconLogout,
} from '@tabler/icons-react';
import NavbarLinksGroup from './f.CollapsableLinks';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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

const tabs = {
    Public: [
        { link: '/ticket/sys', label: 'Ticketing System', icon: IoIosPaper },
        { link: '/conference/booking', label: 'Conference Room Booking', icon: FaUsers },
        { link: '/vistors/management', label: 'Visitor Management', icon: FaIdBadge },
        { link: '', label: 'Capex', icon: MdCurrencyExchange },
        { link: '/user/management/list', label: 'Create/Manage Employees', icon: FaUserCog },
    ],
    Private: [
        { link: '/', label: 'Config', icon: MdSettingsApplications },
    ],
};

export default function Sidebar() {
    const { classes, cx } = useStyles();
    const [section, setSection] = useState('Public');
    const [active, setActive] = useState('Billing');
    const navigate = useNavigate()

    const links = tabs[section].map((item) => (
        <Link key={item.label} onClick={(event) => setActive(item.label)} className={cx(classes.link, { [classes.linkActive]: item.label === active })} to={item.link} >
            <item.icon size={25} className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

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

                    <Navbar.Section className={classes.footer}>
                        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                            <IconLogout className={classes.linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </a>
                    </Navbar.Section>
                </Navbar>
            </div>
            <div>

            </div>
        </div>
    );
}


