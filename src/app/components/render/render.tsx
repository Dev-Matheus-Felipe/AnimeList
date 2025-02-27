'use client'; 

import { usePathname } from 'next/navigation';
import { Header } from '../header/header';

export default function Render() {
  const path = usePathname();
  
  if (path === '/authentic') {
    return null; 
  }

  return <Header />; 
}
