import NextImage from 'next/image';

export default function Beneficio() {
    return (
        <section className='flex w-full max-w-7xl mx-auto gap-4 p-6 flex-col md:flex-row'>
            <div className='w1/2 flex flex-col'>
                <h2 className='text-4xl font-bold my-10'>Benefícios Para Você</h2>
                <div className='flex gap-2'>
                    <div className='bg-[url(/images/checklist.svg)] bg-contain bg-center bg-no-repeat w-20 h-20'></div>
                    <span className='text-[#7E92AC]'>Garantia de resultados, pague de acordo com o desempenho do seu projeto ou campanha.</span>
                </div>
                <div className='flex gap-2'>
                    <div className='bg-[url(/images/checklist.svg)] bg-contain bg-center bg-no-repeat w-20 h-20'></div>
                    <span className='text-[#7E92AC]'>Garantia de resultados, pague de acordo com o desempenho do seu projeto ou campanha.</span>
                </div>
                <div className='flex gap-2'>
                    <div className='bg-[url(/images/checklist.svg)] bg-contain bg-center bg-no-repeat w-20 h-20'></div>
                    <span className='text-[#7E92AC]'>Garantia de resultados, pague de acordo com o desempenho do seu projeto ou campanha.</span>
                </div>
                <div className='flex gap-2'>
                    <div className='bg-[url(/images/checklist.svg)] bg-contain bg-center bg-no-repeat w-20 h-20'></div>
                    <span className='text-[#7E92AC]'>Garantia de resultados, pague de acordo com o desempenho do seu projeto ou campanha.</span>
                </div>
            </div>
            <div className='relative md:w-1/2 h-75 md:h-125'>
                <NextImage src="/images/mackbook.png" alt="mackbook.png" className="object-contain" fill priority unoptimized />
            </div>
        </section>
    )
}
