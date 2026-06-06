'use client';
import { useLayout } from '@/contexts/LayoutContext';
import NextImage from 'next/image';


export default function Hero() {
    const { layoutDados } = useLayout();
    // DEBUG: Veja se isso imprime a URL correta no console do navegador (F12)
    console.log("URL que chegou no Hero:", layoutDados?.foto_layout);
    return (
        <section className="bg-[url(/images/bg.svg)] bg-cover bg-no-repeat bg-center max-h-235  text-white" id="inicio">
            <div className='mx-auto w-full max-w-6xl pt-36 flex justify-center '>
                <div className='flex flex-col aspect-4/3 gap-6 p-4 text-center'>
                    <h1 className="text-5xl">Promova experiências aos seus clientes</h1>
                    <p>E veja resultados expressivos dia após dia</p>
                    {/* MOLDURA DO MOCKUP (A imagem do computador) */}
                    <div className='bg-[url(/images/mockup.svg)] bg-contain bg-no-repeat w-full h-full pt-[4%] pl-[9.5%] p-[9%] pb-[18.5%] sm:pb-[19.5%]'>
                        {/* TELA DO COMPUTADOR (Onde a imagem aparece) */}
                        <div className='relative w-full h-full rounded-xl overflow-hidden bg-blue-950'>
                            <NextImage
                                src={layoutDados?.foto_layout || '/images/placeholder.png'} // Usa a URL do layout ou um placeholder se não tiver
                                alt="Projeto"
                                fill
                                unoptimized
                                priority
                                className='object-cover' // Isso substitui o bg-cover
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
