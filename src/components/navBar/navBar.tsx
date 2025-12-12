"use client"

import { UserDataContext } from '../providers/profilePictureProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import styles from './navBar.module.css';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

type DefinedRoute = {
    pathname: string,
    name: string,
    icon: string
}

const getRoutes = (safeTheme: string | undefined) : DefinedRoute[] => ([
    {pathname: "/", name: "Home", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/home.png`},
    {pathname: "/movies", name: "Movies", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/clapperboard.png`},
    {pathname: "/genres", name: "Genres", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/genres.svg`},
    {pathname: "/my-list", name: "My list", icon: `/icons/${safeTheme === "dark" ? "darkTheme" : "lightTheme"}/heart.svg`},  
])

export function NavBar(){
    const ctx = useContext(UserDataContext);
    if(!ctx) return null;

    const {userContext} = ctx;

    const { theme } = useTheme();
    const pathName = usePathname();
    const router = useRouter();

    const [inputSearch, setInputSearch] = useState<string>("");
    const [mounted, setMounted] = useState<boolean>(false);
    const safeTheme = mounted ? theme : "light";

    const definedRoutes: DefinedRoute[] = getRoutes(safeTheme);

    const profileStyle = {
        backgroundImage: (userContext) 
            ? `url("/profilePictures/${userContext.image}a.jpg")` 
            : " var(--navBar-profile);",

        width:  (userContext) ? "35px" : "22px",
        height: (userContext) ? "35px" : "22px",
        border: (userContext) ? "2px solid blueviolet" : "0"
    };

    // search function 

    const search =  (e?: React.FormEvent<HTMLFormElement>) : void => {
        if(e) e.preventDefault();

        const value = inputSearch.length === 0 || !inputSearch.trim();
        if(value) return;
        
        router.push(`/search/id?page=1&limit=25&q=${inputSearch}&order_by=score&sort=desc`);
    }

    // sets the auxilair

    useEffect(() => setMounted(true), []);

    return (
        <>
            {/* DESKTOP NAVBAR */}
            <div className={styles.desktop_navBar}>
                
                {/* NAVEGATION */}
                <div className={styles.desktop_navegation}>
                    {definedRoutes && definedRoutes.map((e: DefinedRoute, index: number) => (
                        <Link
                            key={index}
                            href={e.pathname}
                            className={`${styles.link} ${(mounted && pathName === e.pathname) && styles.desktop_actived}`}>
                            {e.name}
                        </Link>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className={styles.desktop_actions}>
                    <div className={styles.actions_container}>
                        <button className={styles.navBar_search_icon} onClick={()=> search()} aria-label='icone pesquisar' />

                        <form className={styles.desktop_navBar_form} onSubmit={search}>
                            <input 
                                type='text' 
                                name='name' 
                                value={inputSearch} 
                                onChange={(e)=> setInputSearch(e.target.value)}
                                placeholder='Search for some anime....' 
                                required/>
                        </form>
                    </div>

                    {/* USER ICON */}
                    <button 
                        className={styles.navBar_userIcon} 
                        aria-label='profile'
                        onClick={() => router.push("/profile")} 
                        style={profileStyle} />  
                </div>

                <div 
                    className={styles.line} 
                    style={{width: (mounted && pathName !== "/" && pathName !== "/movies")  ? "100%" : "0%"}} ></div>
            </div>

            {/* MOBILE NAVBAR */}
            <div className={styles.mobile_navBar}>
                {definedRoutes && definedRoutes.map((e: DefinedRoute, index: number) => (
                    <Link 
                        className={styles.mobile_navbar_link} 
                        href={e.pathname} 
                        key={index}>

                        <Image 
                            src={e.icon} 
                            alt={e.name + " Icon"} 
                            width={25} 
                            height={25}
                            className={`${styles.mobile_navbar_image} ${(pathName === e.pathname) && styles.mobile_actived}`} />

                        <p style={{display: (mounted && pathName === e.pathname) ? "block" :"none"}}>{e.name}</p>
                    </Link>
                ))}

                {/* PROFILE LINK */}
                <Link className={styles.mobile_navbar_link} href="/profile">
                    <button style={profileStyle} className={styles.mobile_navbar_image} aria-label='ir para profile' />
                    <p style={{display: (pathName === "/profile") ? "block" :"none"}}>Profile</p>
                </Link>
            </div>


            {   /* MOBILE SEARCH */
                (pathName && pathName !== "/my-list" && pathName !== "/profile") && (
                    <div className={styles.mobile_search_container}>

                        <button className={styles.navBar_search_icon} onClick={()=> search()} aria-label='icone pesquisar' />
                        <form className={styles.mobile_navBar_form} onSubmit={search}>
                            <input 
                                type='text' 
                                name='name' 
                                value={inputSearch} 
                                onChange={(e)=> setInputSearch(e.target.value)}
                                placeholder='Search for some anime....' 
                                required/>
                        </form>
                    </div>
                )
            }
        </>
    );
}