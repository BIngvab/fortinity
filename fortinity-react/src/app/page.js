import Link from "next/link";
import ProductoCard from "../components/ProductoCard";
import {productos} from "../data/productos";

export default function Home() {
  return (
    <>
      <main className="container my-5">

        <section className="text-center mb-5">

          <h2>Bienvenidos a Fortinity</h2>

          <p>Encuentra tu cuenta ideal para tus videojuegos favoritos.</p>

          <p>Explora nuestro catálogo y encuentra la cuenta de tus sueños.</p>

          <Link href="/productos" className="btn btn-primary">
            Ver Productos

          </Link>

        </section>


        <section className="mb-5">

          <h2>Categorías de Productos</h2>

          <ul>
            <li>Juegos</li>

            <li>Cuentas</li>

            <li>Monedas virtuales</li>

            <li>Gift Cards</li>

            <li>Keys</li>

          </ul>

        </section>


        <section>

          <h2 className="text-center mb-4">
            Productos Destacados
          </h2>


          <div className="row g-4">
            {productos.slice(0, 6).map((producto) => (

              <ProductoCard
                key={producto.id}
                producto={producto}

              />
            ))}
          </div>

        </section>

      </main>
    </>
  );
}