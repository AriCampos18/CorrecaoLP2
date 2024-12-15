import { configureStore } from "@reduxjs/toolkit";
import mensagemReducer from "./mensagemReducer";
import usuarioReducer from "./usuarioReducer";

const store = configureStore({
    reducer:{
        'mensagem':mensagemReducer,
        'usuario':usuarioReducer
    }
});

export default store;