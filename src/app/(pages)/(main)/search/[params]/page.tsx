"use client"

import SearchFilter from "@/components/modals/advancedSearch/advancedSearch";
import BackNextButton from "@/components/buttons/backNextButton";
import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import { Anime } from "@/components/animes/anime/anime";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getParams } from "@/lib/getParams";
import styles from "./search.module.css";
import Image from "next/image";

export default function Search(){
    
    const searchParams = useSearchParams();

    const dataParams: AnimeParams = getParams({params : searchParams});
    const [searchData,setSearchData] = useState<AnimeData[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [config, setConfig] = useState<boolean>(false);


    // search the animes 

    const getAnimes = async () : Promise<void> => {
        setLoading(true); 
 
        const dataParams = getParams({ params: searchParams });
        const animes = await fetchAnimes({ animeParams : dataParams});
        setSearchData(animes);
           
        setLoading(false);
    }

    // initializes everything

    useEffect(()=>{
        getAnimes();
    },[searchParams])

    return (
        <div className={styles.search_container}>
            <div className={styles.search}>

                <div className={styles.title_container}>
                    <h2>Anime found:</h2>
                    <button onClick={() => setConfig(prev => !prev)}>{(config) ? "-" : "+"}</button>
                </div>

                <div className={styles.results}>
                    {
                        (loading == true)

                        ? <h2 style={{marginTop: 20}}>
                            <Image style={{marginTop: 40}} 
                                src="/icons/general/loadingMore.svg" 
                                alt="load more" 
                                width={50} 
                                height={50}/>
                        </h2>

                        : (searchData.length == 0)
                            ? <p>No anime found</p>

                            : searchData.map((e: AnimeData, index: number)=>(
                                <Anime info={{anime: e, width: "150px", height: "180px"}} key={index} /> ))
                    }
                </div>
    
                    { (!loading) && <BackNextButton params={dataParams} searchData={searchData}  /> } 
            </div>

            <SearchFilter config={config} setConfig={setConfig} params={dataParams} />
        </div>
    );
    
}