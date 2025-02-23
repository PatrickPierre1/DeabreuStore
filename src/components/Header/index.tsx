"use client";
import { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Button, Box, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo3.png";

export const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: "Home", href: "/" },
        { text: "Veículos", href: "/about" },
        { text: "Venda seu carro", href: "/about" },
        { text: "Financie", href: "/about" },
        { text: "Sobre", href: "/contacts" },
    ];

    return (
        <>
            <AppBar position="absolute" sx={{ background: "transparent", boxShadow: "none", top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: "104px" }}>

                        <Box sx={{ display: { xs: "block", md: "none" } }}>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                            {menuItems.map((item) => (
                                <Button key={item.text} color="inherit" component={Link} href={item.href}>
                                    {item.text}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                            <Image src={logo} alt="Logo" width={200} height={200} />
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Button color="inherit" variant="outlined">
                                Fale conosco
                                <PhoneInTalkIcon fontSize="small" sx={{ ml: 1 }} />
                            </Button>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} href={item.href} onClick={handleDrawerToggle}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};
