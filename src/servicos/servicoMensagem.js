const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';

export async function gravarMensagem(mensagem){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(mensagem)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarMensagem(mensagem){
    const resposta = await fetch(urlBase + "/" + mensagem.id,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify({...mensagem, dataHora: new Date(mensagem.dataHora).toLocaleDateString()})
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirMensagem(mensagem){
    const resposta = await fetch(urlBase + "/" + mensagem.id,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarMensagem() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}