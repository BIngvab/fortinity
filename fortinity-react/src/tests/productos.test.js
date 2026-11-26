import { describe, it, expect } from "vitest";
import { productos } from "../data/productos";
import { calcularPrecioFinal, formatearPrecio } from "../lib/precios";


describe("Pruebas de productos de Fortinity", () => {

    it("Debe tener 7 productos en el catalogo original", () => {

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

            return acumulador + calcularPrecioFinal(producto);

        }, 0);

        expect(total).toBe(92980);

    });

});


describe("Pruebas de precios y descuentos", () => {

    it("Debe mantener el precio cuando no existe descuento", () => {

        const producto = {

            precio: 39990,
            descuento: 0

        };

        expect(calcularPrecioFinal(producto)).toBe(39990);

    });


    it("Debe aplicar correctamente un descuento del 10%", () => {

        const producto = {

            nombre: "Phantom Blade Zero",
            precio: 39990,
            descuento: 10

        };

        expect(calcularPrecioFinal(producto)).toBe(35991);

    });


    it("Debe aplicar correctamente un descuento del 50%", () => {

        const producto = {

            precio: 20000,
            descuento: 50

        };

        expect(calcularPrecioFinal(producto)).toBe(10000);

    });


    it("Debe aceptar productos sin campo de descuento", () => {

        const producto = {

            precio: 29990

        };

        expect(calcularPrecioFinal(producto)).toBe(29990);

    });


    it("Debe calcular el total del carrito con descuentos", () => {

        const carrito = [

            {
                nombre: "Cuenta Fortnite",
                precio: 29990,
                descuento: 0
            },

            {
                nombre: "Phantom Blade Zero",
                precio: 39990,
                descuento: 10
            }

        ];


        const total = carrito.reduce((acumulador, producto) => {

            return acumulador + calcularPrecioFinal(producto);

        }, 0);


        expect(total).toBe(65981);

    });


    it("Debe formatear correctamente el precio chileno", () => {

        expect(formatearPrecio(35991)).toBe("35.991");

    });
});