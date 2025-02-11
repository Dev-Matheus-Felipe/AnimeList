'use server'


import { Anime, Ianime } from '../components/anime_single/anime';
import { Button } from '../components/buttons/Button';
import { fetchAnimes } from '../lib/api'
import './filmes.css'

export default async function Filmes(){

  // ----------- || ----------- //

  const generos: number[] = [1, 31, 32, 36]; 

  const listasAnimes : Ianime[][] = await Promise.all(
    generos.map(async(e) => await fetchAnimes({ page: 1, genero: [e] }))
  );

  return(
      <>
        <div className="banner_principal_filmes">
            <div className="descricao_banner">
                <div className="nome_anime_banner">
                    <h1>Seishun Buta Yarou wa Yumemiru </h1>
                    <p>⭐ 8.59</p>
                </div>
                <br/>
                <p className='text'>
                    Sakuta Azusagawa vive feliz com sua namorada, Mai Sakurajima, até o reaparecimento de sua primeira 
                    paixão, Shouko Makinohara. A situação se complica quando ele encontra uma versão jovem de Shouko,
                    gravemente doente, e suas cicatrizes começam a doer perto dela. Agora, Sakuta precisa saber como
                    ajudar Shouko sem causar danos a ninguém ou comprometer seu relacionamento com Mai.
                </p>

                <div className="buttons_banner">
                    <a className='play' href= "https://animefire.plus/animes/seishun-buta-yarou-wa-yumemiru-shoujo-no-yume-wo-minai-todos-os-episodios" target='_blank'>
                      <img src="/botao-play.png" alt="play" />
                      <p>Assistir</p>
                    </a>

                    <button className='adicionar'>+ Adicionar</button>
                </div>
            </div>
        </div>

        <div className="animes">
          <div className="acao">
            <h3>Adrenalina sem limites</h3>
            
            <div className="buttons btn-1">
              <Button number={1} direction="voltar" />
              <Button number={1} direction="avancar" />
            </div>
  
            <div className="container_1">
              <Anime anime={listasAnimes[0]} />
            </div>
          </div>

            
            
            
          <div className="romance">
            <h3>Super Poderes</h3>
  
            <div className="buttons btn-2">
              <Button number={2} direction="voltar" />
              <Button number={2} direction="avancar" />
            </div>
  
            <div className="container_2">
              <Anime anime={listasAnimes[1]} />
            </div>
          </div>

        
    
          <div className="ecchi">
            <h3>Espaço</h3>
  
            <div className="buttons btn-3">
              <Button number={3} direction="voltar" />
              <Button number={3} direction="avancar" />
            </div>
  
            <div className="container_3">
              <Anime anime={listasAnimes[2]} />
            </div>
          </div>


    
          <div className="psicologico">
            <h3>Slice of Life</h3>
  
            <div className="buttons btn-4">
              <Button number={4} direction="voltar" />
              <Button number={4} direction="avancar" />
            </div>
  
            <div className="container_4">
              <Anime anime={listasAnimes[3]} />
            </div>
          </div>
          
        </div>
    </>
  );
}