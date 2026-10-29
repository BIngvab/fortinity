import Link from "next/link";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">

                <Link className="navbar-brand" href="/">
                    Fortinity

                </Link>


                <div className="d-flex flex-wrap gap-3">

                    <Link className="text-white" href="/">
                        Inicio

                    </Link>

                    <Link className="text-white" href="/productos">
                        Productos

                    </Link>

                    <Link className="text-white" href="/nosotros">
                        Sobre nosotros

                    </Link>

                    <Link className="text-white" href="/blog">
                        Blog

                    </Link>

                    <Link className="text-white" href="/contacto">
                        Contacto

                    </Link>

                    <Link className="text-white" href="/login">
                        Iniciar Sesión

                    </Link>

                    <Link className="text-white" href="/register">
                        Registrarse

                    </Link>

                    <Link className="text-white" href="/carrito">
                        🛒 Carrito

                    </Link>
                </div>
            </div>
        </nav>
    );
}