'use client'

import { Ianime } from "@/app/components/anime_single/anime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAnimes } from "@/app/lib/api"
import styles from '../../search/[anime]/search.module.css';


export default function Search(){

    // ----------- || ----------- //

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const page_number = Number(searchParams.get('page'));
    const [search,setSearch] = useState<Ianime[]>([]);
    const [page,setPage] = useState<number>(page_number);
    const [loading,setLoading] = useState<boolean>(true);
   
    const genres: number[] = searchParams.get('genres') 
    ? searchParams.get('genres')?.split(',').map(item => Number(item)) ?? [] 
    : [];
  
  
    // ----------- || ----------- //

    const animes_API = async() : Promise<void> => {
        router.push(`${pathname}?genres=${genres}&page=${page}`)
        const cache = sessionStorage.getItem(`generos-${page}`);

        if(cache){
            setSearch(JSON.parse(cache));
            setLoading(false);
        }else{
            const animes = await fetchAnimes({page: page, movie: false, genero: genres});
            sessionStorage.setItem(`generos-${page}`, JSON.stringify(animes));
            setSearch(animes);
            setLoading(false);
        }
        
    }

    const mover = (number: number) : void => {
        if(number == 0){
            if(page > 1){ 
                setPage(prev => prev - 1);
                window.scrollTo({ top: 0 });
            } 
        }else{
            if(search.length == 20){ 
                setPage(prev => prev + 1); 
                window.scrollTo({ top: 0 }); 
            } 
        }
    }

    const mostrarAnime = (e: Ianime) : void => {
        const title = encodeURIComponent(e.title);
        const generos : string[] = [];
        e.genres.map((e)=>generos.push(e.name));

        const query = new URLSearchParams({
            title: e.title,
            score: (e.score ?? '-').toString(),    
            image: e.image,
            synopsis: e.synopsis ?? "Este anime não possui sinopse...",
            genres: generos.join(','),
            path: pathname,
            genreNumber: genres.join(','),
            page: page.toString()
        }).toString(); 
        
        router.push(`/anime/${title}?${query}`);
    }

    // ----------- || ----------- //

    useEffect(()=>{
        animes_API();
    },[page])
    
    useEffect(() => {
        const voltar = document.querySelector(`.${styles['voltar']}`) as HTMLElement;
        const avancar = document.querySelector(`.${styles['avancar']}`) as HTMLElement;

        voltar.style.visibility = ( page === 1 ) ? 'hidden' : 'visible';
        avancar.style.visibility = ( search.length < 20 ) ? 'hidden' : 'visible';  

    }, [search]);

    return (
        <div className={styles.flex}>
            <div className={styles.container_anime_busca}>
                <h2>Animes Encontrados:</h2>
                <div className={styles.resultados_busca}>
                    <div className={styles.animes}>
                        {
                            (loading)

                            ? <h2 style={{marginTop: 100}}>Carregando...</h2>

                            :
                                (search.length == 0)
                                ? <p>Nenhum anime encontrado</p>
                                :

                                search.map((e: Ianime,index: number)=>(
                                    <div 
                                    key={`${e.title}-${index}`} 
                                    className={styles.anime_single} 
                                    onClick={()=>mostrarAnime(e)}>

                                        <img src={e.image} alt={e.title} />
                                        <h3>{(e.title.length > 30 ? e.title.slice(0,30) +'...' : e.title)}</h3>
                                        <div className={styles.nota_anime_single}>
                                            <p>⭐ {e.score}</p>
                                        </div>
                                    </div>
                            ))
                        }
                    </div>
        
                    <div className={styles.container_buttons}>
                        <button onClick={() => mover(0)} className={styles.voltar}>Voltar</button>
                        <button onClick={() => mover(1)} className={styles.avancar}>Avançar</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
}