"use client"

import { usePathname, useRouter } from 'next/navigation';
import { exit } from '@/lib/loginFunctions';
import Link from 'next/link';
import './navBar.css';
import Image from 'next/image';

export function NavBar(){

    const actived : string = 'actived link';

    const pathName = usePathname();
    const router = useRouter();

    const exitFunction = async () => {
        const success = await exit();
        if (success) router.replace("/sign-in");
    }

    const search =  (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const search = new FormData(e.currentTarget);
    
        router.push(`/search/id?page=1&limit=25&q=${search.get("search")}`);
    }

    return (
        <div className="navBar">
            <div className="navegation">
                <div className="logo">
                    <Image src="/logo/logo.png" alt="logo" priority width={70} height={70} />
                </div>

                <div className="link_container">
                    <Link className={(pathName === '/') ? actived : 'link'} href='/'>Home</Link>
                    <Link className={(pathName === '/movies') ? actived : 'link'} href='/movies'>Movies</Link>
                    <Link className={(pathName === '/genres') ? actived : 'link'} href='/genres'>Genres</Link>
                    <Link className={(pathName === '/my-list') ? actived : 'link'} href='/my-list'>My List</Link>
                </div>
            </div>

            
            <div className="action-bar">
                <div className="icons">
                    <div className="formContaint">
                        <button className='search' />
                        
                        <form onSubmit={(e)=>search(e)} >
                            < input type='text' name='search' placeholder='Procure por algum anime....' required/>
                        </form>
                       
                    </div>
                    <button className='config' />
                </div>

                <div className="userProfile"></div>
                <button className='exit'onClick={()=>exitFunction()} >Exit</button>
            </div>
        </div>
    )
}