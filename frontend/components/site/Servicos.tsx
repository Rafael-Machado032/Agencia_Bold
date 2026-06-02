import NextImage from 'next/image';

export default function Servicos() {
    return (
        <section className='w-full max-w-7xl mx-auto flex flex-col gap-12 p-6 mt-50'>
            <div className='text-center'>
                <h2 className='text-6xl font-bold'>Por Que Nós?</h2>
                <p className='text-[#7E92AC]'>Uma experiência incrível para seus clientes, resultados espetaculares para sua empresa</p>
            </div>
            <div className='flex gap-6 flex-col items-center md:flex-row'>
                <div className='flex flex-col gap-6 justify-center items-start md:w-1/3 p-4 rounded-2xl shadow-[0px_20px_40px_#2426721C]'>
                    <div className='relative w-30 h-30'>
                        <NextImage src="images/icon1.svg" alt="icon1.svg" fill priority />
                    </div>
                    <h3 className='text-3xl font-bold'>Planejamento impecável</h3>
                    <p className='text-[#7E92AC]'>Conte com a Agência Bold como sua parceira no planejamento de seus projetos, conteúdos, campanhas, estratégias. Nossos profissionais altamente qualificados estão preparados para qualquer desafio.</p>
                </div>
                <div className='flex flex-col gap-6 justify-center items-start md:w-1/3 p-4 rounded-2xl shadow-[0px_20px_40px_#2426721C]'>
                    <div className='relative w-30 h-30'>
                        <NextImage src="images/icon2.svg" alt="icon2.svg" fill priority />
                    </div>
                    <h3 className='text-3xl font-bold'>Planejamento impecável</h3>
                    <p className='text-[#7E92AC]'>Conte com a Agência Bold como sua parceira no planejamento de seus projetos, conteúdos, campanhas, estratégias. Nossos profissionais altamente qualificados estão preparados para qualquer desafio.</p>
                </div>
                <div className='flex flex-col gap-6 justify-center items-start md:w-1/3 p-4 rounded-2xl shadow-[0px_20px_40px_#2426721C]'>
                    <div className='relative w-30 h-30'>
                        <NextImage src="images/icon3.svg" alt="icon3.svg" fill priority />
                    </div>
                    <h3 className='text-3xl font-bold'>Planejamento impecável</h3>
                    <p className='text-[#7E92AC]'>Conte com a Agência Bold como sua parceira no planejamento de seus projetos, conteúdos, campanhas, estratégias. Nossos profissionais altamente qualificados estão preparados para qualquer desafio.</p>
                </div>
            </div>

        </section>
    )
}
