import React from 'react'

export default function Incetivo() {
    return (
        <section className='flex justify-center items-center w-full bg-[url(/images/banner_meio.svg)] bg-cover bg-center py-12 px-6'>
            <div className='text-white text-center flex flex-col items-center gap-2'>
                <h2 className='text-4xl'>Vamos Começar Seu Projeto?</h2>
                <p>Fale agora mesmo com um de nossos consultores!</p>
                <button className=" bg-yellow-300 text-blue-800 px-4 py-2 rounded-lg hover:bg-yellow-600 transition">Entra em Contato</button>
            </div>
        </section>
    )
}
