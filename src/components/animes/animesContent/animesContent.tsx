"use server"

import ALoading from "@/components/loadings/animeSection/aLoading";
import AnimeSection from "../animesSection/animeSection";
import { Suspense } from "react";
import "./animesContent.css";

export default async function AnimesContent({route} : {route: "home" | "movies"}){
    
    return(
        <div className="animes">
        {
          [
           Array(4).fill(null).map(( _ : null,index : number) => (
                <Suspense key={index} fallback={<ALoading />}>
                    <AnimeSection index={index} route={route}/>
                </Suspense>
            ))
          ]
        }
      </div>
    )
}