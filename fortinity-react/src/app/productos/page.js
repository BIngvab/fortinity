import Link from "next/link";
import ProductoCard from "../../components/ProductoCard";


export default function Productos() {

    const productos = [
        {
            id: 1,
            nombre: "Cuenta Fortnite",
            descripcion: "Cuenta con skins y contenido exclusivo.",
            precio: 29990,
            imagen: "/img/fortnite.jpg"
            
        },
        {
            id: 2,
            nombre: "Cuenta League of Legends",
            descripcion: "Cuenta en rango Master con skins y contenido exclusivo.",
            precio: 34990,
            imagen: "/img/master.jpg"

        },
        {
            id: 3,
            nombre: "Cuenta Valorant",
            descripcion: "Cuenta con skins y contenido exclusivo.",
            precio: 59990,
            imagen: "/img/inmortal.jpg"

        },
        {
            id: 4,
            nombre: "Cuenta Counter-Strike 2",
            descripcion: "Cuenta con skins y contenido exclusivo.",
            precio: 59990,
            imagen: "/img/Mastercs.jpg"

        },
        {
            id: 5,
            nombre: "Cuenta Steam",
            descripcion: "Cuenta con un total de 90 títulos y 10 títulos Triple A.",
            precio: 62990,
            imagen: "/img/steam games.png"

        },
        {
            id: 6,
            nombre: "Cuenta Epic Games",
            descripcion: "Cuenta con un total de 90 títulos y 10 títulos Triple A.",
            precio: 29990,
            imagen: "/img/epic juegos.jpg"

        },
        {
            id: 7,
            nombre: "Grand Theft Auto VI",
            descripcion: "Preventa del videojuego más esperado de la década.",
            precio: 69990,
            imagen: "/img/4a35c9a8490c69fe89af0f52d4ac0249b230b4fdb12e8469.png"

        }
    ];


    return (
        <main className="container my-5">
            <section className="text-center mb-5">
                <h1>Catálogo de productos</h1>

                <p>
                    Encuentra cuentas con contenido exclusivo para tus juegos favoritos.
                </p>
            </section>


            <section>
                <div className="row g-4">
                    {productos.map((producto) => (
                        <ProductoCard
                            key={producto.id}
                            producto={producto}
                        />
                    ))}
                </div>
            </section>


            <div className="text-center mt-5">
                <Link href="/" className="btn btn-primary">
                    Volver al inicio

                </Link>
            </div>
        </main>
    );
}