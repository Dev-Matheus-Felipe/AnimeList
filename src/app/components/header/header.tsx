'use client'

import { usePathname, useRouter} from 'next/navigation'
import { FormEvent, useState } from 'react';
import { BackEnd } from '@/app/lib/backend';
import Link from 'next/link'
import './header.css'

export function Header(){

    // ----------- || ----------- //

    const [pesquisa,setPesquisa] = useState<string>('');
    const actived:string = 'actived link';
    const pathName = usePathname();
    const router = useRouter();

    // ----------- || ----------- //

    const search = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();   
        
        const url = pesquisa.trim().toLowerCase().split(' ').join('-'); 
        if (pesquisa === '') { router.push('/') } else { router.push(`/search/${url}?page=1`) }
        
    }

    // ----------- || ----------- //
        
    const logout = async() : Promise<void> =>{

        const response = await BackEnd({method: 'POST', path: 'sair'})
        const result = await response.json();        

          try {  
          } catch (error) {
              console.log("Erro ao parsear a resposta como JSON:", error);
          }
          
          if (response.ok) {
              router.push('/authentic');
              router.refresh();
          } else {
              console.log('Falha no logout:', result.message || 'Resposta inválida');
          }
    }

    // ----------- || ----------- //

    return(
        <div className="header">
            <div className="navegation">
                <div className="logo">
                    <h1>ANIME</h1>
                </div>

                <div className="link_container">
                    <Link className={(pathName == '/') ? actived : 'link'} href='/'>Início</Link>
                    <Link className={(pathName == '/filmes') ? actived : 'link'} href='/filmes'>Filmes</Link>
                    <Link className={(pathName == '/generos') ? actived : 'link'} href='/generos'>Gêneros</Link>
                    <Link className={(pathName == '/minha-lista') ? actived : 'link'} href='/minha-lista'>Minha Lista</Link>
                </div>

            </div>

            <div className="container_header">
                <form onSubmit={(e)=>search(e)} >
                    <input type='text'
                    value={pesquisa}
                    onChange={(e)=>setPesquisa(e.target.value)}
                    placeholder='Procure por algum anime...' />
                    
                    <Link type='submit' href={
                        (pesquisa == '') ? '/' : `/search/${pesquisa.trim().toLowerCase().split(' ').join('-')}?page=1`
                    }><img src="/lupa.png" alt="search" /></Link>
                    
                </form>

                <button onClick={logout} className='logout' >SAIR</button>
            </div>
        </div>
    )
}












 /*
        const response = await fetch('http://localhost:8080/sair', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        */