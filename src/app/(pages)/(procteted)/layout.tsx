"use server"

import AnimeListProvider from "@/components/providers/animeListProvider";
import ModalProvider from "@/components/providers/modalProvider";
import CLoading from "@/components/loadings/component/cLoading";
import { NavBar } from "@/components/navBar/navBar";
import { Suspense } from "react";

export default async function ProtectPages({children} : {children: React.ReactNode}){
    return (
            <AnimeListProvider>
                <ModalProvider>
                    <Suspense fallback={<CLoading />}>
                        <NavBar />
                        {children}
                    </Suspense>
                </ModalProvider>
            </AnimeListProvider>
    )
    
}