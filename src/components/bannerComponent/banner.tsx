"use client"

import AddRemoveButtons from "../buttons/addRemoveButtons";
import ViewButton from "../buttons/viewMoreButton";
import { homeBanner, movieBanner } from "@/lib/dataAnimes";
import { useEffect, useRef, useState } from "react";
import styles from "./banner.module.css";
import { AnimeData } from "@/lib/api";

type State = {
    carousel: number,
    buttonState: number
}

export default  function BannerComponent({route} : {route : "home" | "movies"}){
    const data : AnimeData[] = (route === 'home') ? homeBanner : movieBanner;   

    const [state,setState] = useState<State>({carousel: 0, buttonState: 0});
    const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    if(!carouselRef.current) return;

    const container = carouselRef.current;
    const carouselWidth  = container.clientWidth;
    container.scrollTo({left: carouselWidth * state.carousel, behavior: "smooth"});

  },[state.carousel])

    // to track the buttons colors of the mobile version

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const handleScroll = () => {
            const index = Math.round(el.scrollLeft / el.clientWidth); // case the user is on the x slide
            setState((prev: State) => ({...prev, buttonState: index}));  // actives the x button
        };

        handleScroll();
        el.addEventListener("scroll", handleScroll, { passive: true }); // call the function above
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (

        (data) && 
        <div className={styles.banner}>
            <div className={styles.desktop_banner}>
                <div 
                    className={(route === 'home') ? styles.homeBanner : styles.movieBanner} 
                    style={{ backgroundImage: `url("${data[0].banner_desktop_image}")`}}>

                    <div className={styles.banner_description}>
                        <div className={styles.title_container}>
                            <h1>{data[0].title}</h1>
                            <p style={{color: (route === "home" ? "black" : "gold")}} >⭐ {data[0].score}</p>
                        </div>

                        <h5 className={styles.top_rated}>Top Rated</h5>
                        <p className={styles.banner_synopsis} >
                            {data[0].synopsis.slice(0,295)}...
                        </p>

                        <div className={styles.banner_buttons}>
                            <ViewButton anime={data[0]} />
                            <AddRemoveButtons anime={data[0]} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mobile_banner}>

                <div className={styles.banner_carousel} ref={carouselRef} >
                    {
                        data.map((e: AnimeData, index: number) => (
                            <div 
                                key={index}
                                className={styles.carousel_slide} 
                                style={{
                                    backgroundImage: `url("${e.banner_mobile_image}")`, 
                                    borderImage: (index == 0 )
                                    ? "linear-gradient(45deg, #0021fb, #00eaff) 2" 
                                    :  (index == 1)
                                         ? "linear-gradient(45deg, #00eaff, #ff5100) 2" 
                                         : "linear-gradient(45deg, #00fb2e, #00eaff) 2" }}>

                                <p className={styles.carousel_title}>{e.title}</p>
                                <div className={styles.banner_buttons}>
                                    <ViewButton anime={e} />
                                    <AddRemoveButtons anime={e} />
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={styles.carousel_buttons}>
                    {
                        [0,1,2].map((index: number) => (
                            <button 
                                key={index} 
                                onClick={()=>{setState({carousel: index, buttonState: index})}} 
                                className={`${state.buttonState === index && styles.CbActived} `} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}