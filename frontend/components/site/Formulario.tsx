"use client";
import { EnviarMensagemContato } from "@/api/MensagemAPI";
import { useRef } from "react";

export default function Formulario() {
    const formRef = useRef<HTMLFormElement>(null);

    async function handleEnviar(formData: FormData) {
        const resultado = await EnviarMensagemContato(formData);
        if (resultado.success) {
            alert("Mensagem enviada com sucesso!");
            formRef.current?.reset();
        } else {
            alert("Erro ao enviar mensagem.");
        }
    }


    return (
        <section className='flex flex-col gap-8 max-w-2xl mx-auto px-6 py-8 text-center'>
            <h2 className='font-bold text-4xl'>Entre em Contato</h2>
            <form action={handleEnviar} ref={formRef} className='flex flex-col gap-4'>
                <input type="text" name="nome" className='border border-[#C3CCE8] rounded-md p-2' placeholder='Seu Nome...' required />
                <input type="email" name="email" className='border border-[#C3CCE8] rounded-md p-2' placeholder='Seu Email...' required />
                <textarea name="mensagem" className='border border-[#C3CCE8] rounded-md p-2 resize-none h-40' placeholder='Sua Mensagem...' required></textarea>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                    Enviar!
                </button>
            </form>
        </section>
    );
}
