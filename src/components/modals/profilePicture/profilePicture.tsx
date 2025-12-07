import React, { SetStateAction, useEffect, useState } from "react"
import { UserData } from "@/app/(pages)/profile/page"
import useEmblaCarousel from "embla-carousel-react"
import styles from "./profilePicture.module.css"
import Image from "next/image"


export default function ProfilePicture({
    setModal, 
    userData,
    setUserData
} : { 
    setModal : React.Dispatch<SetStateAction<boolean>>,
    userData: UserData,
    setUserData: React.Dispatch<SetStateAction<UserData>>
}){
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, align: "center", duration: 20 });
    const [currentSlide, setCurrentSlide] = useState(userData.image);
    const images = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    // select the image you want 

    const selectSlide = (e: number,index: number) => {
        if(!emblaApi) return;
        setCurrentSlide(e);
        emblaApi.scrollTo(index);
    } 

    const handlerButtons = (n: number) => {
        if(!emblaApi) return;
        if(n === 0) emblaApi.scrollPrev();
        else  emblaApi.scrollNext();

        const indice = emblaApi.selectedScrollSnap();
        setCurrentSlide(indice + 1);
    }

    // pick the chosen image

    const imageChosen = () => {
        setUserData((prev: UserData) => ({...prev,image: currentSlide}));
        setModal(false);
    }

    useEffect(() => {
        if (!emblaApi) return;

        const index = userData.image - 1;
        emblaApi.scrollTo(index,true);

    }, [emblaApi]);

    return (
        <div className={styles.blur}>
           <div className={styles.modal}>
             <Image 
                src={`/profilePictures/${currentSlide}a.jpg`} 
                alt="main carousel image" 
                width={200} 
                style={{borderRadius: "5px", border: "3px solid white"}}
                height={200} />
            
                <div className={styles.embla} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {
                            images.map((e,index)=> (
                                <Image
                                    onClick={()=> selectSlide(e,index)}
                                    key={e} 
                                    src={`/profilePictures/${e}a.jpg`} 
                                    alt="slide" 
                                    width={70} 
                                    height={70} 
                                    className={`${styles.embla__slide} ${e === currentSlide && styles.ola}`} />

                            ))
                        }
                    </div>
                </div>

                <div className={styles.buttons}>
                    <div className={styles.moviment_buttons}>
                        <button className={styles.back} onClick={()=> handlerButtons(0)} />
                        <button className={styles.next} onClick={()=> handlerButtons(1)} />
                    </div>   
                    <button className={styles.save} onClick={() => imageChosen()}>Select</button>
                </div>
           </div>
        </div>
    )
}