import { NextResponse } from "next/server";

const cars = [
    { 
        id: 1, 
        name: "Toyota Camry New", 
        marca: "Toyota", 
        anoModelo: 2023, 
        cor: "Prata", 
        portas: 4, 
        images: ["/images/camry.jpg", "/images/camry.jpg", "/images/camry.jpg", "/images/camry.jpg", "/images/camry.jpg"], // 5 imagens iguais
        price: "R$ 40.999,00", 
        miles: "20.000km", 
        fuel: "Flex", 
        transmission: "Automático", 
        label: "Ótimo Preço" 
    },
    { 
        id: 2, 
        name: "Volkswagen T-Cross 2023", 
        marca: "Volkswagen", 
        anoModelo: 2023, 
        cor: "Branco", 
        portas: 4, 
        images: ["/images/tcross.jpg", "/images/tcross.jpg", "/images/tcross.jpg", "/images/tcross.jpg", "/images/tcross.jpg"], // 5 imagens iguais
        price: "R$ 99.500,00", 
        miles: "10.000km", 
        fuel: "Gasolina", 
        transmission: "Automático", 
        label: "Oferta Especial" 
    },
    { 
        id: 3, 
        name: "Honda Civic 2022", 
        marca: "Honda", 
        anoModelo: 2022, 
        cor: "Cinza", 
        portas: 4, 
        images: ["/images/hondacivic2022.jpg", "/images/hondacivic2022.jpg", "/images/hondacivic2022.jpg", "/images/hondacivic2022.jpg", "/images/hondacivic2022.jpg"], // 5 imagens iguais
        price: "R$ 115.990,00", 
        miles: "5.000km", 
        fuel: "Híbrido", 
        transmission: "CVT", 
        label: "Destaque" 
    },
    { 
        id: 4, 
        name: "Ford Mustang GT", 
        marca: "Ford", 
        anoModelo: 2024, 
        cor: "Vermelho", 
        portas: 2, 
        images: ["/images/fordmustanggt.jpg", "/images/fordmustanggt.jpg", "/images/fordmustanggt.jpg", "/images/fordmustanggt.jpg", "/images/fordmustanggt.jpg"], // 5 imagens iguais
        price: "R$ 350.000,00", 
        miles: "0km", 
        fuel: "V8 Gasolina", 
        transmission: "Manual", 
        label: "Alta Performance" 
    },
    { 
        id: 5, 
        name: "Chevrolet Onix LTZ 2023", 
        marca: "Chevrolet", 
        anoModelo: 2023, 
        cor: "Azul", 
        portas: 4, 
        images: ["/images/onix.jpg", "/images/onix.jpg", "/images/onix.jpg", "/images/onix.jpg", "/images/onix.jpg"], // 5 imagens iguais
        price: "R$ 78.900,00", 
        miles: "15.000km", 
        fuel: "Flex", 
        transmission: "Automático", 
        label: "Mais Vendido" 
    },
    { 
        id: 6, 
        name: "BMW Série 3 2023", 
        marca: "BMW", 
        anoModelo: 2023, 
        cor: "Preto", 
        portas: 4, 
        images: ["/images/bmwserie3.jpg", "/images/bmwserie3.jpg", "/images/bmwserie3.jpg", "/images/bmwserie3.jpg", "/images/bmwserie3.jpg"], // 5 imagens iguais
        price: "R$ 215.000,00", 
        miles: "8.000km", 
        fuel: "Gasolina", 
        transmission: "Automático", 
        label: "Luxo" 
    },
    { 
        id: 7, 
        name: "Audi Q5 2022", 
        marca: "Audi", 
        anoModelo: 2022, 
        cor: "Branco", 
        portas: 4, 
        images: ["/images/audiq5.jpg", "/images/audiq5.jpg", "/images/audiq5.jpg", "/images/audiq5.jpg", "/images/audiq5.jpg"], // 5 imagens iguais
        price: "R$ 290.000,00", 
        miles: "12.000km", 
        fuel: "Diesel", 
        transmission: "Automático", 
        label: "SUV Premium" 
    },
    { 
        id: 8, 
        name: "Jeep Compass 2023", 
        marca: "Jeep", 
        anoModelo: 2023, 
        cor: "Verde", 
        portas: 4, 
        images: ["/images/jeepcompass.jpg", "/images/jeepcompass.jpg", "/images/jeepcompass.jpg", "/images/jeepcompass.jpg", "/images/jeepcompass.jpg"], // 5 imagens iguais
        price: "R$ 140.000,00", 
        miles: "10.000km", 
        fuel: "Flex", 
        transmission: "Automático", 
        label: "Aventura" 
    },
    { 
        id: 9, 
        name: "Mercedes-Benz Classe C 2023", 
        marca: "Mercedes-Benz", 
        anoModelo: 2023, 
        cor: "Cinza", 
        portas: 4, 
        images: ["/images/mercedesbenzcclass.jpg", "/images/mercedesbenzcclass.jpg", "/images/mercedesbenzcclass.jpg", "/images/mercedesbenzcclass.jpg", "/images/mercedesbenzcclass.jpg"], // 5 imagens iguais
        price: "R$ 300.000,00", 
        miles: "5.000km", 
        fuel: "Gasolina", 
        transmission: "Automático", 
        label: "Elegância" 
    },
    { 
        id: 10, 
        name: "Nissan Kicks 2023", 
        marca: "Nissan", 
        anoModelo: 2023, 
        cor: "Laranja", 
        portas: 4, 
        images: ["/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg"], // 5 imagens iguais
        price: "R$ 95.000,00", 
        miles: "7.000km", 
        fuel: "Flex", 
        transmission: "Automático", 
        label: "Compacto" 
    },
    { 
        id: 11, 
        name: "Kicks 2023", 
        marca: "Nissan", 
        anoModelo: 2023, 
        cor: "Laranja", 
        portas: 4, 
        images: ["/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg"], // 5 imagens iguais
        price: "R$ 95.000,00", 
        miles: "7.000km", 
        fuel: "Flex", 
        transmission: "Automático", 
        label: "Compacto" 
    },
    { 
        id: 12, 
        name: "Kickssss 2023", 
        marca: "Nissan", 
        anoModelo: 2009, 
        cor: "Laranja", 
        portas: 4, 
        images: ["/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg", "/images/nissankicks.jpg"], // 5 imagens iguais
        price: "R$ 95.000,00", 
        miles: "7.000km", 
        fuel: "Flex", 
        transmission: "Automático", 
        label: "Compacto" 
    },
];

export async function GET(req: any) {
    const { searchParams } = new URL(req.url);
    const idFilter = searchParams.get("id");

    if (idFilter) {
        const car = cars.find((car) => car.id === parseInt(idFilter));
        if (car) {
            return NextResponse.json(car);
        } else {
            return NextResponse.json({ message: "Carro não encontrado" }, { status: 404 });
        }
    }

    const nameFilter = searchParams.get("name")?.toLowerCase();
    const marcaFilter = searchParams.get("marca")?.toLowerCase();
    const anoModeloFilter = searchParams.get("anoModelo");

    let filteredCars = cars;

    if (nameFilter) {
        filteredCars = filteredCars.filter((car) =>
            car.name.toLowerCase().includes(nameFilter)
        );
    }

    if (marcaFilter) {
        filteredCars = filteredCars.filter((car) =>
            car.marca.toLowerCase().includes(marcaFilter)
        );
    }

    if (anoModeloFilter) {
        filteredCars = filteredCars.filter(
            (car) => car.anoModelo.toString() === anoModeloFilter
        );
    }

    return NextResponse.json(filteredCars);
}
