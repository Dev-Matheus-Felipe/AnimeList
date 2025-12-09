"use client"

import ProfilePicture from "@/components/modals/profilePicture/profilePicture";
import { UserDataContext } from "@/components/providers/profilePictureProvider";
import { animesContext } from "@/components/providers/animeListProvider";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css"
import { useTheme } from "next-themes"
import Image from "next/image";

export type UserData = {
    username: string,
    description: string,
    age: string,
    favAnime: string,
    image: number
}

export default function Profile(){
    const [userData, setUserData] = useState<UserData>({
        username: "User ", 
        description: "", 
        age: "", 
        favAnime: "", 
        image: 1
    });

    const [themeState, setThemeState] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [modal, setModal] = useState(false);


    const { theme, setTheme } = useTheme();
    const safeTheme = mounted ? theme : "dark";

    const ctx = useContext(UserDataContext);
    if(!ctx) return null;

    const ctx2 = useContext(animesContext);
    if(!ctx2) return null;

    const {myList} = ctx2;    
    const {userContext, setUserContext} = ctx;

    const router = useRouter();

    const choseTitle = () : string => {
        if(!myList) return "";
        const favoritesCount = myList.length;

        if (favoritesCount >= 0 && favoritesCount <= 5) {
            return "Rising Ember";
        } else if (favoritesCount >= 6 && favoritesCount <= 15) {
            return "Shadow Initiate";
        } else if (favoritesCount >= 16 && favoritesCount <= 25) {
            return "Night Vanguard";
        } else if (favoritesCount >= 26 && favoritesCount <= 35) {
            return "Abyss Commander";
        } else if (favoritesCount >= 36 && favoritesCount <= 40) {
            return "Supreme Ascendant";
        } else {
            return "Legendary Overlord"; 
        }
    }


    const saveData = () : void => {
        if(!Number(userData.age) || !userData.username || !userData.age){
            alert("Please fill in the name and age correctly.");
            return;
        }

        setUserContext(userData);
        alert("Profile updated successfully")
    }

    useEffect(()=>{
        setMounted(true);

        if(userContext) setUserData(userContext);
    },[userContext]);

    return(
        <div className={styles.profile}>
            <div className={styles.initial_title}>
                <h1>Profile</h1>
                <Image 
                    className={styles.closeButton}
                    src={(safeTheme === "dark" ? "/icons/darkTheme/modalClose.svg" : "/icons/lightTheme/modalClose.svg")} 
                    onClick={()=> router.back()}
                    alt="close button"
                    width={40}
                    height={40} />
            </div>

            <div className={styles.profile_info}>
                <div className={styles.sidebar_1}>
                    <div className={styles.container_title}>
                        <h1>
                            {userData.username + " - " + (userData.age ? userData.age : "undefined") }
                        </h1>

                        <Image 
                            onClick={() => setModal(true)}
                            className={styles.mobile_picture} 
                            src={`/profilePictures/${userData.image}a.jpg`} 
                            alt="profile picture" 
                            width={100} 
                            height={100} />
                    </div>

                    <textarea 
                        placeholder="Tell me about yourself"
                        value={userData?.description && userData.description }
                        onChange={(e)=> setUserData((prev: UserData) =>({...prev, description: e.target.value }))  }
                        />

                     <div className={styles.mobile_badge}>
                        <div className={styles.line_1}></div>
                        <p>{choseTitle()}</p>
                        <div className={styles.line_2}></div>
                    </div>
                        
                    <label className={styles.favAnime} htmlFor="favAnime">Favorite anime</label>
                    <div className={styles.personalization}>
                        <div className={styles.favorite_anime_container}>
                            <input 
                                id="favAnime"
                                type="text" 
                                placeholder="favorite anime" 
                                value={userData.favAnime} 
                                onChange={(e) => setUserData((prev: UserData) => ({...prev, favAnime: e.target.value}))}
                                />
                        </div>

                        <div 
                            className={styles.theme} 
                            onClick={()=>setThemeState(prev => !prev)}
                            style={{height: (themeState) ? "80px" : "35px"}}>
                            <button className={styles.theme_chosen}>{safeTheme}<span /></button>

                            <button 
                                onClick={()=> setTheme(()=>(safeTheme === "dark" ? "light" : "dark"))}
                                className={styles.theme_option}>
                                    {safeTheme === "dark" ? "light" : "dark"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar_2}>

                    <div className={styles.image_container} onClick={() => setModal(true)}>
                        <Image 
                            className={styles.picture} 
                            src={`/profilePictures/${userData.image}a.jpg`} 
                            alt="profile picture" 
                            width={250} 
                            height={250} />
                    </div>

                    <div className={styles.badge}>
                        <div className={styles.line_1}></div>
                        <p>{choseTitle()}</p>
                        <div className={styles.line_2}></div>
                    </div>
                </div>
            </div>

            <p className={styles.profile_settings}>Profile Settings</p>
            <div className={styles.user_config_container}>
                <div className={styles.user_config}>
                    <input 
                        type="text" 
                        placeholder="Change username" 
                        className={styles.nickname} 
                        value={userData.username.slice(0,10)} 
                        onChange={(e) => setUserData((prev: UserData) => ({...prev, username: e.target.value}))}/>

                    <input 
                        type="number" 
                        placeholder="Age" 
                        className={styles.age}
                        value={userData.age.slice(0,2)} 
                        onChange={(e) => setUserData((prev: UserData) => ({...prev, age: e.target.value.slice(0,2)}))}/>
                </div>

                <button className={styles.save} onClick={() => saveData()}>Save</button>
            </div>

            {modal && <ProfilePicture setModal={setModal} userData={userData} setUserData={setUserData} />}
        </div>
    )
}