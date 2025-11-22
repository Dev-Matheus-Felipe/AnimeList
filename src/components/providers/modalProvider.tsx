"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react";
import Modal from "../modals/animeModal";
import { AnimeData } from "@/lib/api";

export type ModalContextType = {
  modal: AnimeData | null;
  setModal: Dispatch<SetStateAction<AnimeData | null>>;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({children} : {children: React.ReactNode}){
    const [modal, setModal] = useState<AnimeData | null>(null);

   return (
        <ModalContext.Provider value={{modal,setModal}}>
           <>
             {children} {modal && <Modal anime={modal} />} 
           </>       
        </ModalContext.Provider>   
   )
}