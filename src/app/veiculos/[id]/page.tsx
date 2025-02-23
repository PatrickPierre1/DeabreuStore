"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CampaignIcon from '@mui/icons-material/Campaign';
import SpeedIcon from '@mui/icons-material/Speed';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

interface Vehicle {
    id: number;
    name: string;
    marca: string;
    anoModelo: number;
    images: string[];
    price: string;
    miles: string;
    fuel: string;
    transmission: string;
}

export default function VehicleDetails() {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/vehicles?id=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setVehicle(data);
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ backgroundColor: "#212121" }}>
                {vehicle && (
                    <Box padding={10} paddingTop={15}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                            <Box sx={{
                                width: "20vw",
                                height: "3px",
                                backgroundColor: "#e0c000",
                                marginBottom: "10px",
                                borderRadius: "100%"
                            }}></Box>
                            <Typography fontWeight={"bold"} color={"#e0c000"} variant="h4">{vehicle.name}</Typography>
                            <Typography fontWeight={"bold"} color={"#fff"} variant="h6">{vehicle.marca}</Typography>
                            <Box sx={{
                                width: "20vw",
                                height: "3px",
                                backgroundColor: "#e0c000",
                                marginTop: "10px",
                                borderRadius: "100%"
                            }}></Box>
                        </Box>
                        <Grid container spacing={3} mt={2}>
                            <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                                <Box>
                                    <img src={vehicle.images[0]} alt={vehicle.name} width="100%" style={{ borderRadius: '8px' }} />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                                <Grid container spacing={2}>
                                    {vehicle.images.slice(1, 5).map((image, index) => (
                                        <Grid size={{ xs: 6 }} key={index}>
                                            <Box>
                                                <img src={image} alt={`${vehicle.name} - ${index + 1}`} width="100%" height={"100%"} style={{ borderRadius: '8px', objectFit: "cover" }} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid paddingTop={2} container spacing={2}>
                            <Grid size={{ xs: 4 }}>
                                <Box gap={1} color={"#e0c000"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ backgroundColor: "#424242", height: "60px" }}>
                                    <CampaignIcon></CampaignIcon>
                                    <Typography fontWeight={"bold"}>Oportunidade</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Box gap={1} color={"#e0c000"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ backgroundColor: "#424242", height: "60px" }}>
                                    <SpeedIcon></SpeedIcon>
                                    <Typography fontWeight={"bold"}>Baixa km</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Box gap={1} color={"#e0c000"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ backgroundColor: "#424242", height: "60px" }}>
                                    <CompareArrowsIcon></CompareArrowsIcon>
                                    <Typography fontWeight={"bold"}>Aceita troca</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Typography color="white" variant="body1" mt={2}>Ano: {vehicle.anoModelo}</Typography>
                        <Typography color="white" variant="body1">Preço: {vehicle.price}</Typography>
                        <Typography color="white" variant="body1">Quilometragem: {vehicle.miles}</Typography>
                        <Typography color="white" variant="body1">Combustível: {vehicle.fuel}</Typography>
                        <Typography color="white" variant="body1">Transmissão: {vehicle.transmission}</Typography>
                    </Box>
                )}
            </Box>
        </>
    );
}
