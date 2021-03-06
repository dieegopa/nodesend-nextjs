import React from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import Link from "next/link";
import Dropzone from "../components/Dropzone";
import appContext from "../context/app/appContext";
import Alerta from "../components/Alerta";

const Index = () => {
  const AuthContext = React.useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  const AppContext = React.useContext(appContext);
  const { mensaje_archivo, url } = AppContext;

  React.useEffect(() => {
    const token = localStorage.getItem("rnstoken");
    if (token) {
      usuarioAutenticado();
    }
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32 ">
        {url ? (
          <>
            <p className="text-center text-xl md:text-2xl mt-10">
              {" "}
              <span className="font-bold text-red-500 text-xl md:text-3xl uppercase">
                Tu url es:
              </span>{" "}
              {`${process.env.frontendURL}/enlaces/${url}`}
            </p>

            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${process.env.frontendURL}/enlaces/${url}`
                )
              }
              type="button"
              className="mt-10 bg-red-500 hover:bg-gray-900 w-4/5 mx-auto block p-2 text-white uppercase font-bold transition duration-500 ease-in-out cursor-pointer rounded-md"
            >
              Copiar Enlace
            </button>
          </>
        ) : (
          <>
            {mensaje_archivo && <Alerta />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />

              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Compartir archivos de forma sencilla y privada
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">ReactNodeSend</span>{" "}
                  te permite compartir archivos con cifrado de extremo a extremo
                  y un archivo que es eliminiado despu??s de ser descargado. As??
                  que puedes mantener lo que compartes en privado y asegurarte
                  de que tus cosas no permanezcan en l??nea para siempre.
                </p>
                <Link href="/crearcuenta">
                  <a className=" text-red-500 font-bold text-lg hover:text-red-700 transition duration-500 ease-in-out">
                    Crea una cuenta para mayores beneficios
                  </a>
                </Link>
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
