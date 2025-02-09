'use client'

import { useState } from 'react'
import './generos.css'
import { Ageneros, ListaGeneros } from './generos'
import { useRouter } from 'next/navigation'

export default function Generos(){

    // ----------- || ----------- //

    const router = useRouter();
    const transicao: Ageneros[] = ListaGeneros();
    const [generosAdd, setGenerosAdd] = useState<Ageneros[]>([]);
    const [generos, setGeneros] = useState<Ageneros[]>(transicao);

    // ----------- || ----------- //

    const addGenero = (genero: Ageneros) : void => {
        const filtro: Ageneros[] = generos.filter(e => e.name != genero.name);
        setGeneros(filtro);
        setGenerosAdd(prev =>[...prev, genero]);
    }

    // ----------- || ----------- //

    const exGenero = (genero: Ageneros) : void => {
        const filtro: Ageneros[] = generosAdd.filter(e => e.name != genero.name);
        setGenerosAdd(filtro);
        setGeneros(prev => [...prev, genero]);
    }

    // ----------- || ----------- //

    const filtroGenero = () : void => {
        const genre : number[] = [];

        generosAdd.map((e)=>{ genre.push(e.index) })
       
        if(generosAdd.length > 0){
            const query = new URLSearchParams({
                genres: genre.join(','),

            }).toString(); 
            router.push(`/generos/id?${query}&page=1`); 
        }

        
    }

    return(
        <>
            <div className="flex-flex">
                <div className="generos-container">
                    <h1 className="titulo">Gêneros de Anime</h1>
                    <div className="generos-grid">
                        {generos.map((genero) => (
                            <div onClick={()=>addGenero(genero)}  
                            key={genero.index} 
                            className="genero-item"
                            id={`G${genero.index}`}>{genero.name}</div>
                        ))}
                    </div>      
                </div>

                <div className="procurar">
                    <div className="generos-escolhidos">
                            <h1>Gêneros Escolhidos</h1>
                            <div className="generos-flex">
                                {generosAdd.map((genero) => (
                                    <div onClick={()=>exGenero(genero)}  
                                    key={genero.name} 
                                    className="genero-item-escolhido"
                                    id={`L${genero.index}`}>{genero.name}</div>
                                ))}
                            </div>
                    </div>

                    <button className='search' onClick={filtroGenero} >Pesquisar</button>
                </div>
            </div>
        </>
    )
}