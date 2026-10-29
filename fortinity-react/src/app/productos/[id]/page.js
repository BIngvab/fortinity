import Link from "next/link";
import { productos } from "../../../data/productos";


export default async function DetalleProducto({ params }) {
    const { id } = await params;
    const producto = productos.find(
        (producto) => producto.id === Number(id)

    );

    if (!producto) {
        return (
            <main className="container my-5 text-center">

                <h1>Producto no encontrado</h1>

                <Link href="/productos" className="btn btn-primary">
                    Volver al catálogo

                </Link>
            </main>
        );
    }


    return (
        <main className="container my-5">
            <div className="row align-items-center g-4">

                <div className="col-md-6">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                    />
                </div>

                <div className="col-md-6">

                    <h1>{producto.nombre}</h1>

                    <p>{producto.descripcion}</p>

                    <h3>
                        ${producto.precio.toLocaleString("es-CL")}

                    </h3>

                    <Link
                        href="/productos"
                        className="btn btn-primary mt-3"
                    >
                        Volver al catálogo

                    </Link>
                </div>
            </div>
        </main>
    );
}