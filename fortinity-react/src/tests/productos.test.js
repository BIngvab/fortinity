import { describe, it, expect } from "vitest";
import { productos } from "../data/productos";


describe("Pruebas de productos de Fortinity", () => {
    it("Debe tener 7 productos registrados", () => {
        expect(productos).toHaveLength(7);

    });


    it("Todos los productos deben tener un nombre", () => {
        productos.forEach((producto) => {
            expect(producto.nombre).toBeTruthy();

        });
    });


    it("Todos los productos deben tener un precio mayor a cero", () => {
        productos.forEach((producto) => {
            expect(producto.precio).toBeGreaterThan(0);

        });

    });


    it("Todos los productos deben tener un ID", () => {
        productos.forEach((producto) => {
            expect(producto.id).toBeDefined();

        });

    });

    it("Debe calcular correctamente el total de dos productos", () => {

        const carrito = [productos[0], productos[4]];

        const total = carrito.reduce((acumulador, producto) => {
            return acumulador + producto.precio;
        }, 0);

        expect(total).toBe(92980);

    });
});