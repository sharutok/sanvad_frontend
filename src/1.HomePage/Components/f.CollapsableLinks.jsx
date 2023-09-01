import { useState } from 'react';
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    createStyles,
    rem,
} from '@mantine/core';
import { IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { FaUsers, FaIdBadge, FaUserCog, } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosPaper } from "react-icons/io";
import { MdCurrencyExchange, MdSettingsApplications, MdPolicy } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { PiFlowArrowBold } from "react-icons/pi";
const links = [
    {
        label: 'User Management',
        icon: IconCalendarStats, mainlink: "/user/management/list"
    },
    {
        label: 'Ticketing System',
        icon: IoIosPaper,
        mainlink: "/ticket/sys/list"
    },
    {
        label: 'Conference Booking',
        icon: FaUsers,
        mainlink: "/conference/booking/list"

    },
    {
        label: 'Visitor Management',
        icon: FaIdBadge,
        mainlink: "/vistors/management/list"
    },
    {
        label: 'Policies',
        icon: MdPolicy,
        mainlink: "",
        links: [
            { label: 'HR Policies', link: '/' },
            { label: 'IT Policies', link: '/' },
        ],
    },
    {
        label: 'Capex',
        icon: MdCurrencyExchange,
        mainlink: "/capex/list"
    },
    {
        label: 'Module Configurations',
        icon: MdSettingsApplications,
        mainlink: "",
        links: [
            { label: 'User Management', link: '/' },
            { label: 'Conference Room', link: '/' },
            { label: `Visitor's Management`, link: '/' },
        ],
    },
    {
        label: 'Static Links',
        icon: AiOutlineLink,
        mainlink: "",
        links: [
            { label: 'Product Certifcate Matrix', link: 'http://27.107.7.11:3040/home' },
            { label: 'FPED KIOSK', link: 'http://27.107.7.11:3060/login' },
            { label: 'DIGI-WCA (ADMIN)', link: 'http://27.107.7.11:3070/admin/login' },
            { label: 'DIGI-WCA (USER)', link: 'http://27.107.7.11:3070/user/login' },
        ],
    },
    {
        label: 'Workflow Configurations',
        icon: PiFlowArrowBold,
        mainlink: "",
        links: [
            { label: 'Ticketing System', link: '/' },
            { label: 'Capex', link: '/' },
        ],
    },
];

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black, textDecoration: "none"
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: rem(31),
        marginLeft: rem(30),
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,

        '&:hover': {
            textDecoration: 'none',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}));

function LinksGroup({ icon: Icon, label, initiallyOpened, links }) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (

        <Text
            component="a"
            className={classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => window.location.href = link.link
            }
        >
            {link.label}
        </Text >
    ));

    return (
        <>
            <>
                <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                    <Group position="apart" spacing={0}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThemeIcon variant="light" color='#ffffff' size={30}>
                                <Icon color="grey" size="1.5rem" />
                            </ThemeIcon>
                            <Box ml="md">{label}</Box>
                        </Box>
                        {hasLinks && (
                            <ChevronIcon
                                className={classes.chevron}
                                size="1rem"
                                stroke={1.5}
                                style={{
                                    transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                                }}
                            />
                        )}
                    </Group>
                </UnstyledButton>
            </>
            {hasLinks ? <Collapse in={opened}>
                {items.map(x => {
                    return (
                        <Link className='no-underline' >{x}</Link>
                    )
                })}
            </Collapse> : null}
        </>
    );
}


export default function NavbarLinksGroup() {
    return (
        <Box
            sx={(theme) => ({
                minHeight: rem(220),
                padding: theme.spacing.md,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            })}
        >
            {links.map((x, i) => {
                return (
                    <div key={i}>
                        <Link style={{ textDecoration: 'none' }} to={!x?.links > 0 ? x.mainlink : ""}>
                            <LinksGroup label={x.label} icon={x.icon} links={x.links} />
                        </Link>
                    </div>
                )
            })}
        </Box>
    );
}
