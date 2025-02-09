'use client';

import { JSX } from "react";

interface Button {
  number: number;
  direction: 'avancar' | 'voltar';
}

export function Button({ number, direction }: Button): JSX.Element {
  
  const handleClick = () : void => {

    // ----------- || ----------- //

    const container = document.querySelector(`.container_${number}`) as HTMLElement;
    const avancar = document.querySelector(`.btn-${number} > .avancar`) as HTMLElement;
    const voltar = document.querySelector(`.btn-${number} > .voltar`) as HTMLElement;

    // ----------- || ----------- //

    if (container) {
      
      const left: number = parseInt(container.style.left) || 0;
      const variacao: number = 90;

      let porcentagem: number;

      porcentagem = (direction === 'avancar') ? left - variacao : left + variacao;
      
      switch(true){
        case porcentagem <= -150:
          avancar.style.display = 'none'
          container.style.left = '-150%';
          porcentagem = -150;
          break;
        
          case porcentagem >= 0:
            voltar.style.display = 'none'
            container.style.left = '0';
            porcentagem = 0;
            break;
          
            default:
               container.style.left = `${porcentagem}%`;
      }

      if(porcentagem < 0 && window.getComputedStyle(voltar).display === 'none'){ 
        voltar.style.display = 'block'; 

      } else if(porcentagem > -150  && window.getComputedStyle(avancar).display === 'none' ){ 
         avancar.style.display = 'block'; 
      }

    }
  }

  return <button onClick={handleClick} className={direction}></button>;
}