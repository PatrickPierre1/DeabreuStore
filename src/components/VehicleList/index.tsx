"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    Grid,
    Container,
    TextField,
    InputAdornment,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import Grid2 from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";

interface Vehicle {
    id: number;
    name: string;
    marca: string;
    anoModelo: number;
    images: string;
    price: string;
    miles: string;
    fuel: string;
    transmission: string;
    label?: string;
}

export default function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState("");
    const [selectedYear, setSelectedYear] = useState<string | number>("");
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const router = useRouter();

    useEffect(() => {
        fetch("/api/vehicles")
            .then((res) => res.json())
            .then((data) => {
                setVehicles(data);
                setFilteredVehicles(data);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (search === "" && selectedYear === "") {
            setFilteredVehicles(vehicles);
            return;
        }

        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            const filtered = vehicles.filter((vehicle) => {
                const matchesSearch =
                    vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
                    vehicle.marca.toLowerCase().includes(search.toLowerCase());

                const matchesYear =
                    selectedYear === "" || vehicle.anoModelo === Number(selectedYear);

                return matchesSearch && matchesYear;
            });

            setFilteredVehicles(filtered);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search, selectedYear, vehicles]);

    useEffect(() => {
        const sortedVehicles = [...filteredVehicles].sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
            const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        });

        if (JSON.stringify(sortedVehicles) !== JSON.stringify(filteredVehicles)) {
            setFilteredVehicles(sortedVehicles);
        }
    }, [sortOrder, filteredVehicles]);

    const availableYears = Array.from(
        new Set(vehicles.map((vehicle) => vehicle.anoModelo))
    );

    const handleSortOrderChange = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const handleViewDetails = (id: number) => {
        router.push(`/veiculos/${id}`);
    };

    return (
        <Container>
            <Box mb={3}>
                <Box gap={3} display="flex" justifyContent="between">
                    <TextField
                        sx={{ width: "600px" }}
                        label="Buscar por marca ou modelo"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <FormControl variant="outlined" sx={{ width: 200 }}>
                        <InputLabel>Filtrar por ano</InputLabel>
                        <Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            label="Filtrar por ano"
                        >
                            <MenuItem value="">Todos os anos</MenuItem>
                            {availableYears.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box display={"flex"} alignItems={"center"}>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<MenuIcon />}
                            endIcon={<ArrowDropDownIcon />}
                            sx={{ height: "70%" }}
                            onClick={handleSortOrderChange}
                        >
                            Ordenar por preço
                        </Button>
                    </Box>
                </Box>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : filteredVehicles.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <Typography variant="h6" color="text.secondary">
                        Nenhum veículo encontrado.
                    </Typography>
                </Box>
            ) : (
                <Grid2 container spacing={3}>
                    {filteredVehicles.map((vehicle) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={vehicle.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                                <Box position="relative">
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={vehicle.images && vehicle.images[0]}
                                        alt={vehicle.name}
                                        sx={{ borderRadius: "12px 12px 0 0" }}
                                    />
                                    {vehicle.label && (
                                        <Chip
                                            label={vehicle.label}
                                            color="success"
                                            sx={{
                                                position: "absolute",
                                                top: 10,
                                                left: 10,
                                                fontSize: 12,
                                                fontWeight: "bold",
                                            }}
                                        />
                                    )}
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {vehicle.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {vehicle.marca}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" mt={1} flexWrap="wrap">
                                        <Box display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                            <SpeedIcon fontSize="small" />
                                            <Typography variant="body2" ml={0.5}>
                                                {vehicle.miles}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                            <LocalGasStationIcon fontSize="small" />
                                            <Typography variant="body2" ml={0.5}>
                                                {vehicle.fuel}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                            <DirectionsCarIcon fontSize="small" />
                                            <Typography variant="body2" ml={0.5}>
                                                {vehicle.transmission}
                                            </Typography>
                                        </Box>
                                        <Box paddingTop={"10px"} display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                            <CalendarMonthIcon fontSize="small" />
                                            <Typography variant="body2" ml={0.5}>
                                                {vehicle.anoModelo}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                        <Typography variant="h5" fontWeight="bold">
                                            {vehicle.price}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                            fontWeight="bold"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => handleViewDetails(vehicle.id)}
                                        >
                                            Ver detalhes →
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Container>
    );
}
