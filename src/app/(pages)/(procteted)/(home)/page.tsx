"use server"

import AnimesContent from '@/components/animes/animesContent/animesContent';
import BannerComponent from '@/components/bannerComponent/banner';
import './home.css';

export default async function Home() {
  return (
    <>
      <BannerComponent route='home'/>
      <AnimesContent route='home' />
    </>
  );
}