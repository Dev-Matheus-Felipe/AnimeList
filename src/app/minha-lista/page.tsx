'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useReducer, useState } from 'react';
import Loading from '../components/loading/loading';
import { BackEnd } from '../lib/backend';
import './minhalista.css';

interface Anime {
    title: string;
    score: number;
    image: string;
    synopsis: string;
    generos: string;
}

interface Status{
    loading : boolean,
    nome: string
}

interface Action{
    value: boolean | string,
    type: 'NOME' | 'LOADING'
}

const initialStatus = {
    loading: true,
    nome: ''
};

const reducer = (status: Status, action: Action) : Status => {
    switch (action.type) {
        case 'NOME':
            return { ...status, nome: action.value as string };
        case 'LOADING':
            return { ...status, loading: action.value as boolean }; 
        default:
            return status;
    }
};

export default function MinhaLista() {

    const [status, dispatch] = useReducer(reducer, initialStatus);
    const [lista, setLista] = useState([]);

    const router = useRouter();
    const path = usePathname();

    // ----------- || ----------- //
    
    const mostrarAnime = (e: Anime): void => {
        const title = encodeURIComponent(e.title);
        const generos: string[] = e.generos.split(",");

        const query = new URLSearchParams({
            title: e.title,
            score: e.score.toString(),
            image: e.image,
            synopsis: e.synopsis,
            genres: generos.join(','),
            path: path,
        }).toString();

        router.push(`/anime/${title}?${query}`);
    };

    // ----------- || ----------- //

    const animes_api = async (): Promise<void> => {
        const response = await BackEnd({ method: 'GET', path: 'animes' });
        const result = await response.json();

        if (result) {
            dispatch({ type: 'LOADING', value: false });
            dispatch({ type: 'NOME', value: result.nome });

            setLista(result.animes);
        }
    };

    useEffect(() => {
        animes_api();
    }, []);

    // ----------- || ----------- //

    return (
        <>
            {status.loading ? (
                Loading()
            ) : (
                <div className="minha_lista">
                    <h1>Sua coleção de animes favoritos <span>{status.nome}</span></h1>
                    <div className="lista_favoritos">
                        {lista.length === 0 ? (
                            <p>Nenhum anime encontrado</p>
                        ) : (
                            lista.map((e: Anime, index: number) => (
                                <div
                                    key={`${e.title}-${index}`}
                                    className='anime_single_lista'
                                    onClick={() => mostrarAnime(e)}
                                >
                                    <img src={e.image} alt={e.title} />
                                    <h3>{e.title.length > 30 ? e.title.slice(0, 30) + '...' : e.title}</h3>
                                    <div className='nota_anime_single_lista'>
                                        <p>⭐ {e.score}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
