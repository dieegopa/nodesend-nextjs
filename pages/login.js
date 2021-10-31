import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import authContext from "../context/auth/authContext";
import Alerta from "../components/Alerta";
import { useRouter } from "next/router";

const Login = () => {
  const AuthContext = React.useContext(authContext);
  const { iniciarSesion, mensaje, autenticado } = AuthContext;

  const router = useRouter();

  React.useEffect(() => {
    if (autenticado) {
      router.push("/");
    }
  }, [autenticado]);

  //formulario y validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: (valores) => {
      iniciarSesion(valores);
    },
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Iniciar sesión
        </h2>

        {mensaje && <Alerta />}

        <div className="flex justify-center mt-5">
          <div className="w-11/12 max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-500 p-1 text-xs transition-all duration-500 ease-in-out">
                  <p className="font-bold">{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Contraseña
                </label>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  name="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Contraseña"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-500 p-1 text-xs transition-all duration-500 ease-in-out">
                  <p className="font-bold">{formik.errors.password}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold transition duration-500 ease-in-out cursor-pointer rounded-md"
                value="Iniciar sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
