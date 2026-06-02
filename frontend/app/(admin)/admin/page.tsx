"use client";
import { useNavegacao } from "@/contexts/Navegacao";
import { Aside } from "@/components/admin/Aside";
import { Footer } from "@/components/admin/Footer";
import { Header } from "@/components/admin/Header";
import Home from '@/components/admin/site/Home'
import Depoimentos from '@/components/admin/site/Depoimentos'
import Mensagem from '@/components/admin/site/Mensagem'


export default function Page() {
    const { abaAtiva } = useNavegacao(); // A mesma variável que o Aside alterou!
    // Cole isso dentro do seu componente de página para testar o loading por 3 segundos:
    

    

    return (
        <main className='w-full h-screen'>
            <Header />
            <div className="flex w-full">
                <Aside />
                {abaAtiva === 'home' && <Home />}
                {abaAtiva === 'depoimento' && <Depoimentos />}
                {abaAtiva === 'mensagem' && <Mensagem />}
            </div>
            <Footer />
        </main>
    )
}
