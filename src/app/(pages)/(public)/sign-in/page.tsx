"use client"

import { loginIn } from "../../../../lib/loginFunctions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import "./sign-in.css";
import Image from "next/image";

export default function SignIn(){
    const [ data, action, isPeding ] = useActionState(loginIn, undefined);
    const router = useRouter();

  useEffect(()=>{
    if (data?.message == "Sucess") 
        router.replace("/");

},[data])

    return(
        <div className="background">
            <div className="blur">
                <div className="form">
                    <Image src="/logo/logo.png" alt="logo" width={110} height={110} priority />
                    <form action={action} >
                 
                        <div className="username_container">
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Username"
                                defaultValue={ !data?.errorUsername ? data?.username as string : ''}
                                minLength={6} 
                                maxLength={15} 
                                required />

                            {data?.errorUsername && <p>{data?.errorUsername}</p>}
                        </div>
                       
                       <div className="password_container">
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                minLength={6} 
                                maxLength={30} 
                                required  />

                            {data?.errorPassword && <p>{data?.errorPassword}</p>}
                       </div>

                        <button disabled={isPeding} className="login" type="submit" >Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}