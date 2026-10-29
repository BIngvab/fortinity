"use client";

import { createContext, useContext, useState, useEffect } from "react";


const CarritoContext = createContext(null);
export function CarritoProvider({ children }) {

    const [carrito, setCarrito] = useState([]);
    const [cargado, setCargado] = useState(false);
    useEffect(() => {

        const carritoGuardado = localStorage.getItem("carritoFortinity");
        if (carritoGuardado) {

            try {

                setCarrito(JSON.parse(carritoGuardado));

            } catch (error) {

                console.error("Error al recuperar el carrito:", error);

            }
        }
        setCargado(true);

    }, []);


    useEffect(() => {
        if (cargado) {
            localStorage.setItem("carritoFortinity", JSON.stringify(carrito));

        }

    }, [carrito, cargado]);

    function agregarAlCarrito(producto) {
        setCarrito((carritoActual) => [...carritoActual, producto]);

    }

    function vaciarCarrito() {
    setCarrito([]);

    }

    function eliminarDelCarrito(index) {

    setCarrito((carritoActual) =>
        carritoActual.filter((producto, posicion) => posicion !== index)

    );

    }


    return (
        <CarritoContext.Provider
            value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
            {children}

        </CarritoContext.Provider>
    );

}


export function useCarrito() {

    return useContext(CarritoContext);

}