import React from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/dist/client/router";

const Header = () => {
  const router = useRouter();

  const AuthContext = React.useContext(authContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

  const AppContext = React.useContext(appContext);
  const { limpiarState } = AppContext;

  React.useEffect(() => {
    const token = localStorage.getItem("rnstoken");
    if (token) {
      usuarioAutenticado();
    }
  }, []);

  const redireccionar = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <img
            onClick={() => redireccionar()}
            src="/logo.svg"
            alt="logo"
            className="w-64 mb-8 md:mb-0 cursor-pointer"
          />
        </a>
      </Link>

      <div className="space-x-2">
        {usuario ? (
          <div className="flex items-center space-x-3">
            <p className="text-center">Hola {usuario.nombre}</p>
            <button
              onClick={() => cerrarSesion()}
              type="button"
              className="bg-black px-5 py-3 rounded-md text-white font-bold uppercase hover:bg-gray-800 hover:text-white transition duration-500 ease-in-out"
            >
              Cerrar Sesion
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-md text-white font-bold uppercase hover:bg-red-400 transition duration-500 ease-in-out">
                Iniciar Sesion
              </a>
            </Link>
            <Link href="/crearcuenta">
              <a className="bg-black px-5 py-3 rounded-md text-white font-bold uppercase hover:bg-gray-800 hover:text-white transition duration-500 ease-in-out">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
