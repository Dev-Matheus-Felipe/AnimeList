import { NavBar } from "@/components/navBar/navBar";
import { Suspense } from "react";

export default function layout({children} : {children: React.ReactNode}){
    return(
        <>
            <Suspense fallback={null}>
                <NavBar />
                {children}
            </Suspense>
        </>
    )
}