import React from "react";
import appContext from "../context/app/appContext";

const Formulario = () => {
  const [tienePassword, setTienePassword] = React.useState(false);

  const AppContext = React.useContext(appContext);
  const { agregarPassword, agregarDescargas } = AppContext;

  return (
    <div className="w-full mt-20">
      <div>
        <label htmlFor="" className="text-lg text-gray-800">
          Eliminar tras:
        </label>
        <select
          defaultValue={"default"}
          onChange={(e) => agregarDescargas(parseInt(e.target.value))}
          name=""
          id=""
          className="appearance-none w-full mt-2 bg-white border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500 "
        >
          <option value="default" disabled>
            --Seleccione--
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label htmlFor="" className="text-lg text-gray-800 mr-2">
            Proteger con contraseña
          </label>
          <input
            type="checkbox"
            name=""
            id=""
            onChange={() => setTienePassword(!tienePassword)}
          />
        </div>
        {tienePassword ? (
          <input
            onChange={(e) => agregarPassword(e.target.value)}
            type="password"
            name=""
            id=""
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500 "
          />
        ) : null}
      </div>
    </div>
  );
};

export default Formulario;
