export function calcularPrecioFinal(producto) {

    const precio = Number(producto.precio);
    const descuento = Number(producto.descuento || 0);


    return Math.round(precio * (100 - descuento)) / 100;

}


export function formatearPrecio(precio) {

    return Number(precio).toLocaleString("es-CL", {

        minimumFractionDigits: 0,
        maximumFractionDigits: 2

    });
}