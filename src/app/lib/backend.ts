/* eslint-disable @typescript-eslint/no-explicit-any */


'use client'

interface Backend{
    path: string,
    obj?: any,
    method: string
}

interface Parametos{
    method: string
    credentials : RequestCredentials,
    headers : Record<string, string>,
    body? : any
}

export async function BackEnd(backend : Backend){
    
    let BaseParametos : Parametos = {
        method: backend.method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }

    if (backend.obj) {
        const body = JSON.stringify(backend.obj);
        BaseParametos = {...BaseParametos, body: body}
    }
    const response = await fetch(`http://localhost:8080/${backend.path}`, BaseParametos) 

    return response;
}