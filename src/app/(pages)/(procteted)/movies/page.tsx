"use server"

import AnimesContent from '@/components/animes/animesContent/animesContent';
import BannerComponent from '@/components/bannerComponent/banner';
import './movies.css';

export default async function Movies() {
  return (
    <>
      <BannerComponent route='movies'/>
      <AnimesContent route='movies' />
    </>
  );
}