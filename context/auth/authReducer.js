import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
        autenticado: null,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("rnstoken", action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      };

    case CERRAR_SESION:
      localStorage.removeItem("rnstoken");
      return {
        ...state,
        usuario: null,
        autenticado: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
