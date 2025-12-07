"use client"

import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import styles from './navBar.module.css';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { UserDataContext } from '../providers/profilePictureProvider';
import Link from 'next/link';

type DefinedRoute = {
    pathname: string,
    name: string,
    icon: string
}

export function NavBar(){
    const [line,setLine] = useState<string>("0");
    const [mounted, setMounted] = useState<boolean>(false);

    const { theme } = useTheme();

    const ctx = useContext(UserDataContext);
    if(!ctx) return null;

    const {userContext} = ctx;



    const pathName = usePathname();
    const router = useRouter();

    // sets the auxilair up

    useEffect(() => setMounted(true), []);

    const safeTheme = mounted ? theme : "light"; 

    // we need an auxiliar to define the icons otherwise it won't work

    const definedRoutes: DefinedRoute[] = [
        {pathname: "/", name: "Home", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/home.png`},
        {pathname: "/movies", name: "Movies", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/clapperboard.png`},
        {pathname: "/genres", name: "Genres", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/genres.svg`},
        {pathname: "/my-list", name: "My list", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/heart.svg`},  
    ];

    // search function 

    const search =  (e : React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        router.push(`/search/id?page=1&limit=25&q=${data.get("name")}&order_by=score&sort=desc`);
    }

    // defines when the line will appear

    useEffect(()=>{
        if(pathName && pathName !== "/" && pathName !== "/movies" )
            setLine("100%");
        else
            setLine("0%");
    },[pathName]);

    return (
        <>
            <div className={styles.desktop_navBar}>
                <div className={styles.desktop_navegation}>
                    {definedRoutes && definedRoutes.map((e: DefinedRoute, index: number) => (
                        <Link
                            key={index}
                            href={e.pathname}
                            className={`${styles.link} ${(pathName === e.pathname) && styles.desktop_actived}`}>
                            {e.name}
                        </Link>
                    ))}
                </div>

                <div className={styles.desktop_actions}>
                    <div className={styles.actions_container}>
                        <button className={styles.navBar_search_icon} />

                        <form className={styles.desktop_navBar_form} onSubmit={search}>
                            <input type='text' name='name' placeholder='Search for some anime....' required/>
                        </form>
                    </div>

                    <button 
                        className={styles.navBar_userIcon} 
                        style={{
                            backgroundImage: (userContext) 
                                ? `url("/profilePictures/${userContext.image}a.jpg")` 
                                : " var(--navBar-profile);",

                            width:  (userContext) ? "35px" : "22px",
                            height: (userContext) ? "35px" : "22px",
                            border: (userContext) ? "2px solid blueviolet" : "0"
                        }}

                        onClick={() => router.push("/profile")} />
                </div>

                <div className={styles.line} style={{width: line}} ></div>
            </div>

            <div className={styles.mobile_navBar}>
                {definedRoutes && definedRoutes.map((e: DefinedRoute, index: number) => (
                    <Link 
                        className={styles.mobile_navbar_link} 
                        href={e.pathname} 
                        key={index}>
                        <Image 
                            src={e.icon} 
                            alt={e.name + " Icon"} 
                            width={30} 
                            height={30}
                            className={`${styles.mobile_navbar_image} ${(pathName === e.pathname) && styles.mobile_actived}`} />
                        <p style={{display: (pathName === e.pathname) ? "block" :"none"}}>{e.name}</p>
                    </Link>
                ))}

                <Link className={styles.mobile_navbar_link} href="/profile">
                    <button
                         style={{
                            backgroundImage: (userContext) 
                                ? `url("/profilePictures/${userContext.image}a.jpg")` 
                                : "var(--navBar-profile)",
                                
                            width:  (userContext) ? "35px" : "22px",
                            height: (userContext) ? "35px" : "22px" 
                        }}
                        className={styles.mobile_navbar_image} 
                    />
                    <p style={{display: (pathName === "/profile") ? "block" :"none"}}>Profile</p>
                </Link>
            </div>

            {
                (pathName && pathName !== "/my-list" && pathName !== "/profile") && (
                    <div className={styles.mobile_search_container}>
                        <button className={styles.navBar_search_icon} />
                        <form className={styles.mobile_navBar_form} onSubmit={search}>
                            <input type='text' name='name' placeholder='Search for some anime....' required/>
                        </form>
                    </div>
                )
            }
        </>
    );
}