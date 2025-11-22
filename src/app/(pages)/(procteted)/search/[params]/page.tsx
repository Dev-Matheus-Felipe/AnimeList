"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getParams } from "@/lib/getParams";
import { Anime } from "@/components/animes/anime/anime";
import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import BackNextButton from "@/components/buttons/actionButtons/backNextButton";
import "./searchFunc.css";

export default function Search(){
    
    const searchParams = useSearchParams();

    const dataParams : AnimeParams = getParams({params : searchParams});
    const [searchData,setSearchData] = useState<AnimeData[]>([]);
    const [loading,setLoading] = useState<boolean>(true);



    // ----------- gestAnimes ----------- //

    const getAnimes = async () : Promise<void> => {
        setLoading(true); 
 
        const dataParams = getParams({ params: searchParams });
        const animes = await fetchAnimes({ animeParams : dataParams });
        setSearchData(animes);
           
        setLoading(false);
    }

    // ----------- initializes everything ----------- //

    useEffect(()=>{
        getAnimes();
    },[searchParams])

    return (
        <div className="searchFun_Container">
            <div className="searchFun">
                <h2>Anime found:</h2>
                <div className="results">
                    {
                        (loading == true)

                        ? <h2 style={{marginTop: 100}}>Loading...</h2>

                        : (searchData.length == 0)
                            ? <p>No anime found</p>
                            : searchData.map((e: AnimeData, index: number)=>(
                                <Anime anime={e} key={index} /> ))
                    }
                </div>
    
                    { (!loading) && <BackNextButton params={dataParams} searchData={searchData}  /> } 
            </div>
        </div>
    );
    
}