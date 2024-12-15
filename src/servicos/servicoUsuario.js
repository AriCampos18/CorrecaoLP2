const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';

export async function gravarUsuario(usuario){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(usuario){
    const resposta = await fetch(urlBase + "/" + usuario.id,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify({...usuario, dataIngresso: new Date(usuario.dataIngresso).toLocaleDateString()})
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirUsuario(usuario){
    const resposta = await fetch(urlBase + "/" + usuario.id,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}