"use client"

import AddRemoveButtons from "@/components/buttons/addRemoveButtons";
import ViewButton from "@/components/buttons/viewMoreButton";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { useEffect, useState } from "react";
import styles from "../banner.module.css";
import { AnimeData } from "@/lib/api";

export default function MobileBanner({ data }: { data: AnimeData[] }) {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        duration: 20
    });

    const getBorderImage = (index: number) => {
        if (index === 0) return "linear-gradient(45deg, #0021fb, #00eaff) 2";
        if (index === 1) return "linear-gradient(45deg, #00eaff, #ff5100) 2";
        return "linear-gradient(45deg, #00fb2e, #00eaff) 2";
    };

      const onSelect = (emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }


    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect]);

    return (
        <div className={styles.mobile_banner}>
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {data.map((anime, index) => (
                        <div
                            key={anime.banner_mobile_image ?? index} 
                            className={styles.carousel_slide}
                            style={{
                                backgroundImage: `url(${anime.banner_mobile_image})`,
                                borderImage: getBorderImage(index)
                            }}
                        >
                            <p className={styles.carousel_title}>{anime.title}</p>

                            <div className={styles.banner_buttons}>
                                <ViewButton anime={anime} />
                                <AddRemoveButtons anime={anime} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.carousel_buttons}>
                {
                    [0,1,2].map((index: number) => (
                        <button 
                            key={index} 
                            onClick={()=> emblaApi?.scrollTo(index)  }
                            className={`${selectedIndex === index && styles.CbActived} `} />
                    ))
                }
            </div>
        </div>
    );
}
