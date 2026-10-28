import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "Fortinity",
    description: "Tu cuenta. Tu modo de juego. Tu nivel. Tus Skins"

};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>

                <Header/>

                <Navbar/>

                {children}

                <Footer/>

            </body>
        </html>
    );
}