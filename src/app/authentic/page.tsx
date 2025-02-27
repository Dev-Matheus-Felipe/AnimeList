'use client'

import { useRouter } from "next/navigation";
import { BackEnd } from "../lib/backend";
import styles from './auth.module.css';
import { useState } from "react"

export default function Authentic(){
  
  const [login,setLogin] = useState<boolean>(true);
  const router = useRouter();

  // ----------- || ----------- //
  
  const logar = async (e: any) : Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formLogin = { email: formData.get("email"), senha: formData.get("senha") }
    const formCadastro = {...formLogin, nome: formData.get("nome")}

    const response = await BackEnd({method: 'POST', path: 'authentic', obj: (login) ? formLogin : formCadastro })
    const result = await response.json();   

    try {  
      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        console.log('Falha no login:', result.message || 'Resposta inválida');
      }
    } catch (error) {
      console.log('Falha no login:', result.message || 'Resposta inválida');
    }

  };

  // ----------- || ----------- //
  
  return (
    <div className={styles.container}>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className={`${styles.flex} ${!login ? styles.expand : ''}`}>
        <div className={styles.apresentacao}>
          <div className={styles.logoAuth}>
            <h1>ANIME</h1>
          </div>
          <div className={styles.descricao}>
            <p>O lugar perfeito para achar um anime que goste.</p>
          </div>
        </div>

        <div className={styles.formulario}>
          <div className={styles.divFlex}>
            <div className={styles.form}>
              <form onSubmit={logar}>
                {login === false ? <input type="text" name="nome" placeholder="Nome" required /> : null}
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="senha" placeholder="Senha" required />
                <input type="submit" name="login" value={login ? "Entrar" : "Criar conta"} />
              </form>

              <div className={styles.linha}></div>

              <button className={styles.button} onClick={() => setLogin(!login)}>
                {login ? "Criar nova conta" : "Já tem uma conta? - Entre"}
              </button>
            </div>

            <p className={styles.p}><span>{login ? "Entre para " : "Cadastre-se"}</span> para procurar sua série favorita.</p>
          </div>
        </div>
      </div>
    </div>
  );
}