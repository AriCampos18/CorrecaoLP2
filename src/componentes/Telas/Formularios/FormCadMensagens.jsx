import { Button, Spinner, Col, Form, InputGroup,
         Row, Alert
 } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { consultarUsuario } from '../../../servicos/servicoUsuario.js';
import { alterarMensagem } from '../../../servicos/servicoMensagem.js';
import ESTADO from '../../../redux/estado.js';
import toast, {Toaster} from 'react-hot-toast';
import {useSelector, useDispatch } from 'react-redux';
import { inserirMensagem, atualizarMensagem } from '../../../redux/mensagemReducer.js';

export default function FormCadMensagens(props) {
    const [mensagem, setMensagem] = useState(props.mensagemSelecionada);
    const [formValidado, setFormValidado] = useState(false);
    /*const [usuarios, setUsuarios] = useState([]);
    const [temUsuarios, setTemUsuarios] = useState(false);*/
    const {estado,msg,listaDeMensagens}=useSelector((state)=>state.mensagem);
    const [mensagemExibida, setMensagemExibida]= useState("");
    const despachante = useDispatch();

    //Ao usar REDUX, as categorias não serão recuperadas diretamente do backend (camada de serviço)
    //E sim acessando o estado da aplicação particularmente da fatia categoria (categoriaSlice)
    //const = {status, mensagem, listaDeProdutos}=useSelector((state)=>{state.categoria});
    //Proposito de recuperar de um unico ponto central as informações/dados da aplicação
    /*useEffect(()=>{
        consultarCategoria().then((resultado)=>{
            if (Array.isArray(resultado)){
                setCategorias(resultado);
                setTemCategorias(true);
            }
            else{
                toast.error("Não foi possível carregar as categorias");
            }
        }).catch((erro)=>{
            setTemCategorias(false);
            toast.error("Não foi possível carregar as categorias");
        });
        
    },[]); //didMount

    function selecionarCategoria(evento){
        setProduto({...produto, 
                       categoria:{
                        codigo: evento.currentTarget.value

                       }});
    }*/

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
               mensagem.lida=false;
               mensagem.dataHora=
                despachante(inserirMensagem(mensagem));
                setMensagemExibida(msg);
                setTimeout(()=>{
                    setMensagemExibida("");
                    setMensagem({
                        id: 0,
                        dataHora:"",
                        lida:false,
                        mensagem: "",
                        usuario:""
                    });
                    //props.setExibirTabela();
                },5000);
            }
            else {
                despachante(atualizarMensagem(mensagem));
                setMensagemExibida(msg);
                //voltar para o modo de inclusão
                setTimeout(()=>{
                    props.setModoEdicao(false);
                    props.setMensagemSelecionada({
                        id: 0,
                        dataHora:"",
                        lida:false,
                        mensagem: "",
                        usuario:""
                    });
                    props.setExibirTabela(true);
                },5000);
            }

        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setMensagem({ ...mensagem, [elemento]: valor });
    }
    

    if(estado==ESTADO.PENDENTE){
        return (
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <Alert variant="primary">{ msg }</Alert>
            </div>
        );
    }
    else if(estado==ESTADO.ERRO){
        return(
            <div>
                <Alert variant="danger">{ msg }</Alert>
                <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
            </div>
        );
    }
    else if(estado==ESTADO.OCIOSO){
        return (
            <div>
                
           
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row className="mb-4">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={mensagem.id}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-4">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Escreva sua mensagem</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="mensagem"
                            name="mensagem"
                            value={mensagem.mensagem}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, informe a mensage!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                    
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
                <Toaster position="top-right"/>
            </Form>
            {
                mensagemExibida ? <Alert variant='succeess'>{msg}</Alert>:""
            }
            </div>
        );
    }
}