export default function Nosotros() {

    return (
        <main className="container my-5">
            <section className="text-center mb-5">

                <h1 className="fw-bold mb-4">
                    Sobre Nosotros

                </h1>

                <p className="lead">
                    Fortinity es una empresa dedicada a la venta de cuentas
                    de una gran variedad de videojuegos, ofreciendo a nuestros
                    clientes la oportunidad de adquirir cuentas con skins
                    exclusivas y niveles avanzados.

                </p>

                <p>
                    Nuestro objetivo es proporcionar una alternativa para
                    aquellos jugadores que no quieren empezar desde cero,
                    necesitan una pequeña ayuda o buscan avanzar
                    en sus videojuegos favoritos.

                </p>

            </section>


            <section className="row g-4 mb-5">
                <div className="col-md-6">

                    <div className="card h-100 p-4">

                        <h2 className="h4 mb-3">
                            Nuestra misión

                        </h2>

                        <p>
                            Ofrecer a los jugadores una plataforma sencilla
                            y accesible donde puedan encontrar cuentas
                            de videojuegos y contenido exclusivo.

                        </p>

                    </div>
                </div>


                <div className="col-md-6">
                    <div className="card h-100 p-4">

                        <h2 className="h4 mb-3">
                            Nuestra visión

                        </h2>

                        <p>
                            Convertirnos en una tienda digital reconocida
                            por nuestra variedad de productos, facilidad
                            de uso y compromiso con los jugadores.

                        </p>

                    </div>
                </div>
            </section>


            <section className="text-center mb-5">

                <h2 className="mb-4">
                    Nuestro compromiso

                </h2>

                <p>
                    Nos enorgullece ofrecer un servicio seguro y confiable.
                    Nuestro equipo está comprometido con la satisfacción
                    del cliente y ofrece un plazo de 30 días posteriores
                    a la compra para resolver dudas o inquietudes.
                    
                </p>

            </section>


            <section className="text-center p-4 rounded bg-dark">

                <h2 className="mb-3">
                    ¡Únete a nuestra comunidad!

                </h2>

                <p className="mb-4">
                    Conoce a otros jugadores con intereses similares
                    y descubre los productos que Fortinity tiene para ti.

                </p>

                <a
                    href="/productos"
                    className="btn btn-primary"
                >
                    Explorar productos

                </a>

            </section>
        </main>
    );
}