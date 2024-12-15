import TelaCadastroMensagem from "./componentes/Telas/TelaCadastroMensagem";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import store from './redux/store';
import { Provider } from "react-redux";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";

export const ContextoUsuario=createContext();

function App() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            { //A ordem das rotas é importante 
            }
            <Routes>
              <Route path="/mensagem" element={<TelaCadastroMensagem />} />
              <Route path="/usuario" element={<TelaCadastroUsuario/>}/>
              <Route path="/" element={<TelaMenu />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }

export default App;
