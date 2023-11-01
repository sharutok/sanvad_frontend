import { useContext, useState } from 'react';
import {
    Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles, rem,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { getCookies } from '../../Helper Components/CustomCookies';
import { AppContext } from '../../App';
import { links } from '../../Static/StaticValues';
import TipTool from '../../Helper Components/TipTool';
import { IconButton } from '@mui/material';

export default function NavbarLinksGroup() {
    const user_perm = getCookies()[1]
    const { collapse, setCollapse, setOpen } = useContext(AppContext)

    return (

        <Box
            sx={(theme) => ({
                minHeight: rem(220),
                padding: theme.spacing.md,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            })}
        >
            {/* {!collapse && <div className='p-2 w-fit'>
                <ButtonComponent onClick={() => setOpen(false)} btnName={"Collapse All"} />
            </div>} */}
            {links.map((x, i) => {
                return (
                    x.index ? user_perm.includes(x.index) &&
                        <div key={i}>
                            <TipTool position={"right"} title={x.label} body={
                                <Link style={{ textDecoration: 'none' }} to={!x?.links > 0 ? x.mainlink : ""}>
                                    <LinksGroup label={!collapse && x.label} icon={x.icon} links={!collapse && x.links} />
                                </Link>
                            } />
                        </div>
                        :
                        <div key={i}>
                            <TipTool position={"right"} title={x.label} body={
                                <Link style={{ textDecoration: 'none' }} to={!x?.links > 0 ? x.mainlink : ""}>
                                    <LinksGroup label={!collapse && x.label} icon={x.icon} links={!collapse && x.links} />
                                </Link>
                            } />
                        </div>
                )
            })}
        </Box>
    );
}

function LinksGroup({ icon: Icon, label, initiallyOpened, links }) {
    const { collapse, open, } = useContext(AppContext)
    const useStyles = createStyles((theme) => ({
        control: {
            fontWeight: 500,
            display: 'block',
            width: `${!collapse ? "100%" : "fitContent"}`,
            padding: `10px`,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            fontSize: "0.9rem",

            '&:hover': {
                borderRadius: "0.5rem",
                backgroundColor: !collapse ? theme.colors.gray[1] : "white",
                color: theme.colorScheme === 'dark' ? theme.white : theme.black, textDecoration: "none",
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
            borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
                }`,

            '&:hover': {
                textDecoration: 'none',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                borderRadius: "0.5rem"
            },
        },

        chevron: {
            transition: 'transform 200ms ease',
        },
    }));
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

    const items = (hasLinks ? links : []).map((link) => (

        <Text
            component="a"
            className={classes.link}
            href={link.link}
            target='_blank'
            key={link.label}
            onClick={(event) => window.location.href = link.link}>{link.label}
        </Text >

    ));

    return (
        <>
            <>
                <UnstyledButton onClick={() => setOpened((o) => !o)} className={`${classes.control} `}>
                    <Group position="apart" spacing={0}>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThemeIcon variant='light' color='#fff' size={30}>
                                <IconButton>
                                    <Icon color="#555259" size="1.5rem" />
                                </IconButton>
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
                {items.map((x, i) => {
                    return (
                        <Link key={i} className='no-underline' >{x}</Link>
                    )
                })}
            </Collapse> : null}
        </>
    );
}
