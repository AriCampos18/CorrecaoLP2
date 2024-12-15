import { Alert } from "react-bootstrap";
import FormCadMensagens from "./Formularios/FormCadMensagens";
import Pagina from "../layouts/Pagina";
import { useEffect, useState, createContext } from "react";
import TabelaMensagens from "./Tabelas/TabelaMensagens";
//import { produtos } from "../../dados/mockProdutos";
import { consultarMensagem } from "../../servicos/servicoMensagem";
import TelaLogin from "./TelaLogin.jsx";
import { Provider } from "react-redux";
import { ContextoUsuario } from "../../App.js";


export default function TelaCadastroMensagens(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    /*const [listaDeProdutos, setListaDeProdutos] = useState([]);*/
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [produtos, setProdutos] = useState([]);
    const [mensagemSelecionada, setMensagemSelecionada] = useState({
        id:0,
        dataHora:"",
        lida:false,
        mensagem:"",
        usuario: {}

    });

    const [usuario,setUsuario]=useState({
        "usuario":"",
        "logado":false
      });
    
    if(!usuario.logado){
        return(
          <ContextoUsuario.Provider value={{usuario,setUsuario}}>
            <TelaLogin/>
          </ContextoUsuario.Provider>
        );
    }
    else{
        return (
            <div>
                <ContextoUsuario.Provider value ={{usuario,setUsuario}}>
                <Pagina>
                    <Alert className="mt-02 mb-02 success text-center" variant="success">
                        <h2>
                            Cadastro de Mensagem
                        </h2>
                    </Alert>
                    {
                        exibirTabela ?
                            <TabelaMensagens setExibirTabela={setExibirTabela}
                                            setModoEdicao={setModoEdicao}
                                            setMensagemSelecionada={setMensagemSelecionada} 
                                            usuario={usuario} /> :
                            <FormCadMensagens setExibirTabela={setExibirTabela}
                                            mensagemSelecionada={mensagemSelecionada}
                                            setMensagemSelecionada={setMensagemSelecionada}
                                            modoEdicao={modoEdicao}
                                            setModoEdicao={setModoEdicao}
                                            usuario={usuario}
                                            setUsuario={setUsuario}
                                            />
                    }
                </Pagina>
                </ContextoUsuario.Provider>
            </div>
        );
    }

}