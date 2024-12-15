import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarMensagem, excluirMensagem, gravarMensagem, alterarMensagem } from "../servicos/servicoMensagem.js";

import ESTADO from "./estado.js";

export const buscarMensagens = createAsyncThunk('buscarMensagens', async ()=>{
    //lista de produtos
    const resultado = await consultarMensagem();
    const lista = Object.values(resultado.listaMensagens);
    console.log(resultado);
    console.log(lista);
    
    try {
        if (Array.isArray(lista)){
            return {
                "status":true,
                "msg":"Mensagens recuperadas com sucesso",
                "listaDeMensagens":lista
            }
        }
        else
        {
            return {
                
                "status":false,
                "msg":"Erro ao recuperar as mensagens do backend.",
                "listaDeMensagens":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "msg":"Erro: " + erro.message,
            "listaDeMensagens":[]
        }
    }
});

export const apagarMensagem = createAsyncThunk('apagarMensagem', async (mensagem)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de Mensagems
    console.log(mensagem);
    const resultado = await excluirMensagem(mensagem);
    //se for um array/lista a consulta funcionou
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "msg":resultado.mensagem,
                "id":mensagem.id
            }
    }
    catch(erro){
        return {
            "status":false,
            "msg":"Erro: " + erro.message,
        }
    } 
});

export const inserirMensagem = createAsyncThunk('inserirMensagem', async (mensagem)=>{
    //Previsibilidade de comportamento ao que será retornado para a aplicação(redutor)
   
    //status e mensagem
    //sucesso => codigo do produto gerado na inclusao
    try{
        const resultado=await gravarMensagem(mensagem);
        if(resultado.status)
        {
            //esse o é o payload retornado para o redutor
            mensagem.id=resultado.id;
            return{
                "status":resultado.status,
                "msg":resultado.mensagem,
                "mensagem":mensagem
            };
        }
        else{
            return{
                "status":resultado.status,
                "msg":resultado.mensagem
            };
        }
    } catch(erro){
        //esse o é o payload retornado para o redutor
        return{
            "status":false,
            "msg":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (mensagem)=>{
    //Previsibilidade de comportamento ao que será retornado para a aplicação(redutor)
   
    //status e mensagem
    //sucesso => codigo do produto gerado na inclusao
    try{
        const resultado=await alterarMensagem(mensagem);
        //esse o é o payload retornado para o redutor
        return{
            "status":resultado.status,
            "msg":resultado.mensagem,
            "mensagem":mensagem
        };
    } catch(erro){
        //esse o é o payload retornado para o redutor
        return{
            "status":false,
            "msg":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

const mensagemReducer = createSlice({
    name:'mensagem',
    initialState:{
        estado: ESTADO.OCIOSO,
        msg:"",
        listaDeMensagens:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarMensagens.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.msg="Processando requisição (buscando Mensagem)"
        })
        .addCase(buscarMensagens.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.msg=action.payload.msg;
            state.listaDeMensagens=action.payload.listaDeMensagens;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.msg = action.payload.msg;
            state.listaDeMensagens=action.payload.listaDeMensagens;
          } 
        })
        .addCase(buscarMensagens.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.msg = action.payload.msg;
            state.listaDeMensagens=action.payload.listaDeMensagens;
        })
        .addCase(apagarMensagem.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.msg="Processando a requsição(excluindo o produto do backend";
        })
        .addCase(apagarMensagem.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.msg=action.payload.msg;
            if(action.payload.status){                        
                state.listaDeMensagens=state.listaDeMensagens.filter((item)=> item.id !== action.payload.id);
                //altera a lista de Mensagem
            }
            else{
                state.estado=ESTADO.ERRO;
                state.msg=action.payload.msg;
            }
        })
        .addCase(apagarMensagem.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.msg=action.payload.msg;//action.payload.mensagem;
        })
        .addCase(inserirMensagem.pending, (state, action)=>{
            state.estado=ESTADO.PENDENTE;
            state.msg="Processando a requsição(incluindo o produto no backend";
        })
        .addCase(inserirMensagem.fulfilled,(state,action) =>{
            if(action.payload.status){     
                //sucesso da inclusão do produto                  
                state.estado=ESTADO.OCIOSO; 
                state.msg=action.payload.msg;
                state.listaDeMensagens.push(action.payload.mensagem);
                //altera a lista de Mensagem
            }
            else{
                state.estado=ESTADO.ERRO;
                state.msg=action.payload.msg;
            }
        })
        .addCase(inserirMensagem.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.msg=action.payload.msg;//action.payload.mensagem;
        })
        .addCase(atualizarMensagem.pending, (state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.msg="Processando a requsição(alterando o produto no backend";
        })
        .addCase(atualizarMensagem.fulfilled, (state,action)=>{
            if(action.payload.status){     
                //sucesso da inclusão do produto                  
                state.estado=ESTADO.OCIOSO; 
                state.msg=action.payload.msg;
                state.listaDeMensagens=state.listaDeMensagens.map((item)=> item.id===action.payload.mensagem.id ? action.payload.mensagem : item);
                //altera a lista de produtos
            }
            else{
                state.estado=ESTADO.ERRO;
                state.msg=action.payload.msg;
            }
        })
        .addCase(atualizarMensagem.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.msg=action.payload.msg;//action.payload.mensagem;
        })
    }
});

export default mensagemReducer.reducer;