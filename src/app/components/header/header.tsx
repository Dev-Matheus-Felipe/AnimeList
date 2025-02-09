'use client'

import { usePathname, useRouter} from 'next/navigation'
import { FormEvent, useState } from 'react';
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
                    <Link className={(pathName == '/minha-lista') ? actived : 'link'} href='/'>Minha Lista</Link>
                </div>

            </div>

            <form onSubmit={(e)=>search(e)} >
                <input type='text'
                value={pesquisa}
                onChange={(e)=>setPesquisa(e.target.value)}
                placeholder='Procure por algum anime...' />
                
                <Link type='submit' href={
                    (pesquisa == '') ? '/' : `/search/${pesquisa.trim().toLowerCase().split(' ').join('-')}?page=1`
                }><img src="/lupa.png" alt="search" /></Link>
                
            </form>
        </div>
    )
}