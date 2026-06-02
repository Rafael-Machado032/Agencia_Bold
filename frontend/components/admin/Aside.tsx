"use client"
import { FazerLogout } from '@/api/LoginLogout';
import { useNavegacao } from "@/contexts/Navegacao";
import { useState } from 'react';


export function Aside() {
    // Pegamos a função e o valor da nossa "nuvem"
    const { abaAtiva, setAbaAtiva } = useNavegacao();
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const deslogar = async () => {
        await FazerLogout()
    }

    return (
        <aside className={`flex w-full h-screen top-0 transition-all duration-700 ease-in-out ${isOpen ? ' max-w-90' : 'max-w-30'} `}>

            <div className={`flex flex-col items-center gap-6 w-full bg-blue-500 text-center overflow-hidden transition-all duration-700 ease-in-out `}>
                <div className='w-full bg-gray-500 py-8.5'>
                    {isOpen ?
                        <h1 className='font-bold text-white text-4xl'>RM.Code</h1> :
                        <h1 className='font-bold text-white text-4xl'>RM</h1>
                    }

                </div>
                <h2>Menu</h2>
                <nav className='flex flex-col justify-between w-full max-w-60 h-full pb-30'>
                    <div className='flex flex-col justify-center gap-4'>
                        <button onClick={() => setAbaAtiva("home")} className={`flex items-center gap-2  rounded-sm mx-auto cursor-pointer ${abaAtiva === "home" ? "bg-amber-300" : "bg-gray-200"} ${isOpen ? "w-full" : "w-min"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#31475e" d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" /></svg>
                            <p className={`overflow-hidden ${isOpen ? "block" : "hidden"}`}>Home</p>
                        </button>
                        <button onClick={() => setAbaAtiva("depoimento")} className={`flex items-center gap-2 rounded-sm mx-auto cursor-pointer ${abaAtiva === "depoimento" ? "bg-amber-300" : "bg-gray-200"} ${isOpen ? "w-full" : "w-min"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#31475e" d="M416 208C416 305.2 330 384 224 384C197.3 384 171.9 379 148.8 370L67.2 413.2C57.9 418.1 46.5 416.4 39 409C31.5 401.6 29.8 390.1 34.8 380.8L70.4 313.6C46.3 284.2 32 247.6 32 208C32 110.8 118 32 224 32C330 32 416 110.8 416 208zM416 576C321.9 576 243.6 513.9 227.2 432C347.2 430.5 451.5 345.1 463 229.3C546.3 248.5 608 317.6 608 400C608 439.6 593.7 476.2 569.6 505.6L605.2 572.8C610.1 582.1 608.4 593.5 601 601C593.6 608.5 582.1 610.2 572.8 605.2L491.2 562C468.1 571 442.7 576 416 576z" /></svg>
                            <p className={`overflow-hidden ${isOpen ? "block" : "hidden "}`}>Depoimento</p>
                        </button>
                        <button onClick={() => setAbaAtiva("mensagem")} className={`flex items-center gap-2 rounded-sm mx-auto cursor-pointer ${abaAtiva === "mensagem" ? "bg-amber-300" : "bg-gray-200"} ${isOpen ? "w-full" : "w-min"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#31475e" d="M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z" /></svg>
                            <p className={`overflow-hidden ${isOpen ? "block" : "hidden"}`}>Mensagem</p>
                        </button>
                    </div>
                    <div>
                        <button onClick={deslogar} className={`flex items-center gap-2 rounded-sm mx-auto cursor-pointer  hover:bg-amber-300 bg-gray-200 ${isOpen ? "w-full" : "w-min"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#31475e" d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" /></svg>
                            <p className={`overflow-hidden ${isOpen ? "block" : "hidden"}`}>Sair</p>
                        </button>
                    </div>

                </nav>

            </div>

            <div className="my-10">
                <button onClick={() => setIsOpen(!isOpen)} className={`hover:text-blue-600 focus:outline-none cursor-pointer text-black`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

        </aside>
    )
}
