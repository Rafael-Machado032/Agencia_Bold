'use client'
import NextImage from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="absolute z-50 w-full bg-transparent text-white font-bold">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" relative flex justify-between items-center h-22">
                    {/* Logo */}
                    <div className={`z-10 shrink-0 flex items-center ${isOpen ? 'text-black' : 'text-white'}`}>
                        <Link href="/" className="text-2xl font-bold">
                        <div className='relative w-100 h-15'>
                                <NextImage src="/images/logoagencia.svg" alt="Logo da Agência" fill priority unoptimized />
                        </div>
                        </Link>
                    </div>

                    {/* Links Desktop */}
                    <ul className="hidden lg:flex space-x-8">
                        <li><Link href="#sobre" className="hover:text-blue-600 transition">Inicio</Link></li>
                        <li><Link href="#servicos" className="hover:text-blue-600 transition">Por que nos?</Link></li>
                        <li><Link href="#contato" className="hover:text-blue-600 transition">Depoimntos</Link></li>
                        <li><Link href="#orcamento" className=" bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                            Entre em Contato
                        </Link></li>
                    </ul>

                    {/* Botão Mobile (Hambúrguer) */}
                    <div className="lg:hidden flex items-center z-10 ">
                        <button onClick={() => setIsOpen(!isOpen)} className={`hover:text-blue-600 focus:outline-none ${isOpen ? 'text-black' : 'text-white'}`}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Menu Mobile Aberto */}
            <nav className={`md: relative -top-22 w-full bg-white border-b border-gray-200 overflow-hidden transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="px-2 pt-20 pb-8 space-y-1 sm:px-3 flex flex-col items-center">
                    <li><Link href="#sobre" className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-center">Inicio</Link></li>
                    <li><Link href="#servicos" className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-center">Por que nos?</Link></li>
                    <li><Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-center">Depoimento</Link></li>
                    <li><Link href="#contato" className="block px-3 py-2 border border-black text-black rounded-lg w-full text-center">Entre em Contato</Link></li>
                </ul>
            </nav>

        </header>
    );
}
