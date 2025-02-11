'use client'

import { Suspense, useState, useEffect } from 'react';
import { Anime, Ianime } from './components/anime_single/anime';
import { Button } from './components/buttons/Button';
import { fetchAnimes } from './lib/api';
import './home.css';


export default function Home() {

  // ----------- || ----------- //

  const generos: number[] = [2, 22, 35, 40];
  const [listasAnimes, setListasAnimes] = useState<Ianime[][]>([]); 

  // ----------- || ----------- //

  useEffect(() => {
    async function loadAnimes() {
      const animes : Ianime[][] = await Promise.all(
        generos.map(async(e) => await fetchAnimes({ page: 1, genero: [e] }))
      );

      animes.map((e)=>{
        if(e.length == 0){
          generos.map(async(e) => await fetchAnimes({ page: 1, genero: [e] }))
        }
      })

      setListasAnimes(animes);
    }

    loadAnimes();
  }, []);

  return (
    <>
      <div className="banner_principal">
        <div className="descricao_banner">
          <div className="nome_anime_banner">
            <h1>Sousou no Frieren</h1>
            <p>⭐9.2</p>
          </div>
          <h5>Melhor Avaliado</h5>
          <p className='text'>
            A história segue Frieren, uma elfa maga que fazia parte de um grupo de heróis que derrotou o Rei Demônio.
            Após a vitória, seus companheiros envelhecem e seguem caminhos diferentes, mas Frieren, com sua longevidade élfica,
            continua jovem e vê os amigos envelhecerem e morrerem. Ela decidiu então embarcar em uma nova jornada para entender
            melhor o valor da vida humana e as emoções que afetam seus antigos companheiros.
          </p>

          <div className="buttons_banner">
            <a className='play' href= "https://animesonlinecc.to/anime/sousou-no-frieren/" target='_blank'>
              <img src="/botao-play.png" alt="play" />
              <p>Assistir</p>
            </a>
            
            <button className='adicionar'>+ Adicionar</button>
          </div>
        </div>
      </div>

      <div className="animes">
        <div className="acao">
          <h3>Ação para toda família</h3>
          <div className="buttons btn-1">
            <Button number={1} direction="voltar" />
            <Button number={1} direction="avancar" />
          </div>
          <div className="container_1">
            <Suspense fallback={<h1>Carregando Ação...</h1>}>
              <Anime anime={listasAnimes[0]} />
            </Suspense>
          </div>
        </div>

        <div className="romance">
          <h3>Corações Entrelaçados</h3>
          <div className="buttons btn-2">
            <Button number={2} direction="voltar" />
            <Button number={2} direction="avancar" />
          </div>
          <div className="container_2">
            <Suspense fallback={<h1>Carregando Romance...</h1>}>
              <Anime anime={listasAnimes[1]} />
            </Suspense>
          </div>
        </div>

        <div className="ecchi">
          <h3>Toques Proibidos</h3>
          <div className="buttons btn-3">
            <Button number={3} direction="voltar" />
            <Button number={3} direction="avancar" />
          </div>
          <div className="container_3">
            <Suspense fallback={<h1>Carregando Ecchi...</h1>}>
              <Anime anime={listasAnimes[2]} />
            </Suspense>
          </div>
        </div>

        <div className="psicologico">
          <h3>Mentes à Beira do Caos</h3>
          <div className="buttons btn-4">
            <Button number={4} direction="voltar" />
            <Button number={4} direction="avancar" />
          </div>
          <div className="container_4">
            <Suspense fallback={<h1>Carregando Psicológico...</h1>}>
              <Anime anime={listasAnimes[3]} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}