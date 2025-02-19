"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

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
        <Container>
            {vehicle && (
                <Box>
                    <Typography variant="h4">{vehicle.name}</Typography>
                    <Typography variant="h6">{vehicle.marca}</Typography>
                    <Grid container spacing={3} mt={2}>
                        <Grid size={{xs: 12, sm: 6, md: 7}}>
                            <Box>
                                <img src={vehicle.images[0]} alt={vehicle.name} width="100%" style={{ borderRadius: '8px' }} />
                            </Box>
                        </Grid>
                        
                        <Grid size={{xs: 12, sm: 6, md: 5}}>
                            <Grid container spacing={2}>
                                {vehicle.images.slice(1, 5).map((image, index) => (
                                    <Grid size={{xs: 6}} key={index}>
                                        <Box>
                                            <img src={image} alt={`${vehicle.name} - ${index + 1}`} width="100%" style={{ borderRadius: '8px' }} />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography variant="body1" mt={2}>Ano: {vehicle.anoModelo}</Typography>
                    <Typography variant="body1">Preço: {vehicle.price}</Typography>
                    <Typography variant="body1">Quilometragem: {vehicle.miles}</Typography>
                    <Typography variant="body1">Combustível: {vehicle.fuel}</Typography>
                    <Typography variant="body1">Transmissão: {vehicle.transmission}</Typography>
                </Box>
            )}
        </Container>
    );
}
