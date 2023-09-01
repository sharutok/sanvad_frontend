import { createStyles, Header, HoverCard, Group, Button, UnstyledButton, Text, SimpleGrid, ThemeIcon, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, rem, Title, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconChevronDown
} from '@tabler/icons-react';
import { FaUsers, FaIdBadge } from 'react-icons/fa';
import IMAGES from '../../assets/Image/Image';
import '../../../Style/Header.css'
import React from 'react'
const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

// const mockdata = [
//     {
//         icon: FaUsers,
//         title: 'HR Policies',
//     },
//     {
//         icon: FaIdBadge,
//         title: 'IT Policies',
//     },
// ];

export default function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    // const links = mockdata.map((item) => (
    //     <UnstyledButton className={classes.subLink} key={item.title}>
    //         <Group noWrap align="flex-start">
    //             <ThemeIcon size={34} variant="default" radius="md">
    //                 <item.icon size={rem(22)} color={"grey"} />
    //             </ThemeIcon>
    //             <div className='mt-2'>
    //                 <Text size="sm" fw={500}>{item.title} </Text>
    //             </div>
    //         </Group>
    //     </UnstyledButton>
    // ));

    return (
        <Box  >
            <Header className='background-image' height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <div className='flex gap-2'>
                        <img src={IMAGES.ador_logo} alt="Ador" width={"50"} />
                        <Divider orientation='vertical' />
                        <Title align="center" sx={(theme) => ({ fontFamily: `'Cinzel Decorative', cursive, ${theme.fontFamily}`, fontSize: "20px" })}> Sanvad</Title>
                    </div>
                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        {/* <a href="#" className={classes.link}>
                            Home
                        </a> */}
                        {/* <HoverCard width={200} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <div className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Policies
                                        </Box>
                                        <IconChevronDown size={16} color={"red"} />
                                    </Center>
                                </div>
                            </HoverCard.Target>
                            <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                                <Group position="apart" px="md">
                                    <Text fw={500}>Features</Text>
                                    <Anchor href="#" fz="xs">
                                        View all
                                    </Anchor>
                                </Group>
                                <SimpleGrid cols={1} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>*/}
                        <AccountMenu />
                        {/* <a href="#" className={classes.link}>
                            Resourses
                        </a> */}
                        {/* <a href="#" className={classes.link}>
                            Policies
                        </a> */}
                    </Group>

                    {/* <Group className={classes.hiddenMobile}>
                        <Button>Log Out</Button>
                    </Group> */}

                    {/* <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} /> */}
                </Group>
            </Header>
            {/* <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <Button variant="default">Log Out</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer> */}
        </Box>
    );
}



import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleLogOut() {
        window.location.href = "/login"
    }
    return (
        <React.Fragment>
            <div sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 35, height: 35 }}>SK</Avatar>
                    </IconButton>
                </Tooltip>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}