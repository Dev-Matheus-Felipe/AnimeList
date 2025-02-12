    'use client'

    import { Ianime } from "@/app/components/anime_single/anime";
    import { usePathname, useRouter, useSearchParams } from "next/navigation";
    import { useEffect, useState } from "react";
    import { fetchAnimes } from "@/app/lib/api"
    import styles from './search.module.css';
  
    export default function Search(){
        
        // ----------- || ----------- //

        const searchParams = useSearchParams();
        const page_number = Number(searchParams.get('page'));

        const [search,setSearch] = useState<Ianime[]>([]);

        const [page,setPage] = useState<number>(page_number);
        const [loading,setLoading] = useState<boolean>(true);
        const pathname = usePathname();
        const router = useRouter();
        
        const filtro = pathname.split('/');
        const texto = decodeURIComponent(filtro[2].split('-').join(' '));

        // ----------- || ----------- //

        const animes_API = async() : Promise<void> => {

            if (searchParams.get('page') !== page.toString()) {
                router.push(`/search/${texto}?page=${page}`);
            }

            setLoading(true); 
            const animes = await fetchAnimes({ page: page, movie: false, search: texto });
            const aFiltro = animes.filter((e) => e.title.toLowerCase().includes(texto.toLowerCase()));

            sessionStorage.setItem(`search-${texto}-page-${page}`, JSON.stringify(aFiltro));

            setSearch(aFiltro);
            setLoading(false);
        }

        // ----------- || ----------- //
        
        const mover = (number: number): void => {
            if (number == 0 && page > 1) { setPage(prev => prev - 1) }
            else if (search.length == 20 && number != 0) { setPage(prev => prev + 1) }
        };

        // ----------- || ----------- //

        const mostrarAnime = (e: Ianime) : void => {
            const generos : string[] = [];
            e.genres.map((e)=>generos.push(e.name));

            const title = encodeURIComponent(e.title);    
            const query = new URLSearchParams({
                title: e.title,
                score: (e.score ?? '-').toString(),
                image: e.image,
                synopsis: (e.synopsis ?? 'Sem sinopse...'),
                genres: generos.join(','),
                path: pathname,
                page: page.toString()
            }).toString(); 
            
            router.push(`/anime/${title}?${query}`);
        }

        // ----------- || ----------- //
        
        useEffect(() => {
            const voltar = document.querySelector(`.${styles['voltar']}`) as HTMLElement;
            const avancar = document.querySelector(`.${styles['avancar']}`) as HTMLElement;
    
            if(voltar && avancar){
                voltar.style.visibility = ( page === 1 ) ? 'hidden' : 'visible';
                avancar.style.visibility = ( search.length < 20 ) ? 'hidden' : 'visible'; 
            } 

        }, [search]);

        // ----------- || ----------- //

        useEffect(()=>{
            const cache = sessionStorage.getItem(`search-${texto}-page-${page}`);

            if(cache){
                setSearch(JSON.parse(cache));
                setLoading(false);
            }else{
                animes_API();
            }
        },[page])

        return (
            <div className={styles.flex}>
                <div className={styles.container_anime_busca}>
                    <h2>Animes Encontrados:</h2>
                    <div className={styles.resultados_busca}>
                        <div className={styles.animes}>
                            {
                               (loading == true)

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
            
                        {
                            (loading == true)
                            ? ''

                            :     
                            <div className={styles.container_buttons}>
                                <button onClick={() => mover(0)} className={styles.voltar}>Voltar</button>
                                <button onClick={() => mover(1)} className={styles.avancar}>Avançar</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
        
    }