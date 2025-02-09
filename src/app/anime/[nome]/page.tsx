'use client'

import { useRouter, useSearchParams } from "next/navigation";
import './anime_unico.css'

export default function Nome(){

    // ----------- || ----------- //

    const searchParams = useSearchParams();
    const router = useRouter();

    const params = ['title','score','image','synopsis','path','page'];

    const paramsURL = params.reduce((acc:{ [key: string]: string }, valorAtual) => {
        const value = searchParams.get(valorAtual);
        
        if (value) {
            acc[valorAtual] = value;
        }
        
        return acc;
    }, {});

    const genres = searchParams.get('genres') ? searchParams.get('genres')?.split(',') : [];

    // ----------- || ----------- //

    const voltarPagina = (): void =>{
        const pathG = searchParams.get('genreNumber') ?? '';
        const encodedGenres = encodeURIComponent(pathG);

        if (pathG) {
            router.push(`${paramsURL.path}?genres=${encodedGenres}&page=${paramsURL.page}`);
        } else if (paramsURL.page) {
            router.push(`${paramsURL.path}?page=${paramsURL.page}`);
        } else { router.push(`${paramsURL.path}`) }
    }

    return(
        <div className="A_flex">
            <div className="container">
                <div className="img_anime">
                    <img 
                    src={paramsURL.image} 
                    alt={paramsURL.title} />
                </div>

                <div className="descricao">
                    <h1>{paramsURL.title} ⭐ {paramsURL.score}</h1>
                    <div className="generos">
                    {genres?.map((genre: string, index: number) => (
                        <span key={index} className="genero">{genre ?? ''}</span>
                    ))}
                    </div>
                    <p>{paramsURL.synopsis}</p>
                
                </div>
            </div>
            
            <div className="button">
                <button className="voltar_router" onClick={()=>voltarPagina()}>Voltar</button>
            </div>
        </div>
    )
}