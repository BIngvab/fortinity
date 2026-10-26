import Link from "next/link";

export default function Home() {

  const productos = [
    {
      id: 1,
      nombre: "Cuenta Fortnite",
      descripcion: "Cuenta con skins y contenido exclusivo",
      precio: 29990,
      imagen: "/img/fortnite.jpg"

    },

    {
      id: 2,
      nombre: "Cuenta League of Legends",
      descripcion: "Cuenta en rango Master con skins y contenido exclusivo",
      precio: 34990,
      imagen: "/img/master.jpg"

    },

    {
      id: 3,
      nombre: "Cuenta Valorant",
      descripcion: "Cuenta con skins y contenido exclusivo",
      precio: 59990,
      imagen: "/img/inmortal.jpg"

    },

    {
      id: 4,
      nombre: "Cuenta Counter-Strike 2",
      descripcion: "Cuenta con skins y contenido exclusivo",
      precio: 59990,
      imagen: "/img/Mastercs.jpg"

    },

    {
      id: 5,
      nombre: "Cuenta Steam",
      descripcion: "Cuenta con un total de 90 títulos y 10 títulos triple A",
      precio: 62990,
      imagen: "/img/steam games.png"

    },

    {
      id: 6,
      nombre: "Cuenta Epic",
      descripcion: "Cuenta con un total de 90 títulos y 10 títulos triple A",
      precio: 29990,
      imagen: "/img/epic juegos.jpg"

    }
  ];


  return (
    <>
      <header className="bg-dark text-white text-center py-4">

        <h1>Fortinity</h1>

        <p>Tu cuenta. Tu modo de juego. Tu nivel. Tus Skins</p>

      </header>


      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">

        <div className="container">

          <Link className="navbar-brand" href="/">
            Fortinity

          </Link>

          <div className="d-flex flex-wrap gap-3">

            <Link className="text-white" href="/">Inicio</Link>

            <Link className="text-white" href="/productos">Productos</Link>

            <Link className="text-white" href="/nosotros">Sobre nosotros</Link>

            <Link className="text-white" href="/blogs">Blog</Link>

            <Link className="text-white" href="/contacto">Contacto</Link>

            <Link className="text-white" href="/login">Iniciar Sesión</Link>

            <Link className="text-white" href="/register">Registrarse</Link>

            <Link className="text-white" href="/carrito">🛒 Carrito</Link>

          </div>

        </div>

      </nav>


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

          <h2 className="text-center mb-4">Productos Destacados</h2>

          <div className="row g-4">

            {productos.map((producto) => (

              <div className="col-12 col-md-6 col-lg-4" key={producto.id}>

                <article className="card h-100">

                  <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}

                  />

                  <div className="card-body d-flex flex-column">

                    <h3 className="card-title h5">
                      {producto.nombre}

                    </h3>

                    <p className="card-text">
                      {producto.descripcion}

                    </p>

                    <p>
                      Valor: ${producto.precio.toLocaleString("es-CL")}

                    </p>

                    <button
                      className="btn btn-primary mt-auto"
                      type="button"
                      disabled

                    >
                      Agregar al carrito

                    </button>

                  </div>

                </article>

              </div>

            ))}

          </div>

        </section>

      </main>


      <footer className="bg-dark text-white text-center py-4">

        <p className="mb-0">
          © 2026 Fortinity. Todos los derechos reservados.
          
        </p>

      </footer>

    </>
  );

}