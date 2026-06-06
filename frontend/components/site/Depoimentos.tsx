"use client";
import { useEffect, useState, useMemo, useCallback } from "react"; // Adicionado useMemo e useCallback
import { useDepoimento } from "@/contexts/DepoimentoContext";
import NextImage from "next/image";

export default function Depoimentos() {
    const { depoimentoDados } = useDepoimento();
    // Garante que listaFinal seja sempre um array, mesmo se o banco estiver vazio
    const listaFinal = depoimentoDados || [];

    const [pagina, setPagina] = useState(1); // Página atual (começa em 1 por causa do clone)
    const [comTransicao, setComTransicao] = useState(true); // Liga/Desliga a animação suave
    const [largura, setLargura] = useState(0); // Largura da tela para responsividade

    // 1. Estabiliza o cálculo de páginas para não quebrar o useEffect

    const { depoPagina, nPaginas } = useMemo(() => {
        /**
         * useMemo: Cálculos matemáticos estáveis.
         * Só recalcula se a 'largura' da tela ou o 'tamanho da lista' mudar.
         */
        const total = listaFinal.length;
        if (total === 0) return { depoPagina: 1, nPaginas: 0 };
        // Lógica de Uniformidade: Divide o total por 3 ou 2 se for exato, senão mostra 1 por página em telas grandes. Em telas pequenas, sempre 1 por página.
        let porPagina = 1;
        if (largura >= 768) {
            if (total % 3 === 0) porPagina = 3;
            else if (total % 2 === 0) porPagina = 2;
            else porPagina = 1;
        }

        return {
            depoPagina: porPagina,
            nPaginas: Math.ceil(total / porPagina) // Total de páginas necessárias
        };
    }, [largura, listaFinal.length]);

    const nPaginasComClones = nPaginas + 2; // Precisamos de 2 páginas extras (clones) para o efeito de "Loop Infinito"

    // 2. useCallback para a função proximo ser estável
    const proximo = useCallback(() => {
        /**
         * useCallback: Memoriza a função de avançar página.
         * Evita que o useEffect seja disparado desnecessariamente.
         */
        setPagina((p) => p + 1);
    }, []);

    useEffect(() => {
        /**
         * useEffect: O "Cérebro" do carrossel.
         * Controla o Teletransporte, o Auto-play e o monitoramento da tela.
         */
        if (nPaginas === 0) return;

        let timerTeletransporte: NodeJS.Timeout;

        // LÓGICA DO TELETRANSPORTE (Loop Infinito)
        if (pagina === nPaginas + 1) {  // Se chegou no último clone, pula para a 1ª página real sem animação
            timerTeletransporte = setTimeout(() => {
                setComTransicao(false);  // Desliga animação para o pulo ser invisível
                setPagina(1);
            }, 700);  // Tempo da transição CSS para garantir que o usuário não perceba o "teletransporte"
        } else if (pagina === 0) { // Se chegou no clone do início, pula para a última página real
            timerTeletransporte = setTimeout(() => {
                setComTransicao(false);
                setPagina(nPaginas);
            }, 700);  // Tempo da transição CSS para garantir que o usuário não perceba o "teletransporte"
        }

        // Religa a transição
        if (!comTransicao) {  // Se a transição foi desligada pelo teletransporte, religa ela após 50ms para o próximo clique funcionar normalmente
            const timerTransicao = setTimeout(() => setComTransicao(true), 50);
            return () => clearTimeout(timerTransicao);
        }

        // Monitor de largura
        const verificarTamanho = () => setLargura(window.innerWidth);// Função para atualizar a largura da tela no estado
        window.addEventListener('resize', verificarTamanho);
        if (largura === 0) verificarTamanho(); // Roda uma vez ao carregar para garantir que a largura inicial seja capturada

        const contador = setInterval(proximo, 5000);  // Configura o avanço automático a cada 5 segundos

        return () => {  // Limpeza: Remove ouvintes e timers ao fechar o componente para evitar bugs de memória
            clearInterval(contador);
            clearTimeout(timerTeletransporte);
            window.removeEventListener('resize', verificarTamanho);
        };
    }, [pagina, comTransicao, nPaginas, proximo, largura]); // Dependências completas e estáveis

    if (listaFinal.length === 0) return null; // Se não tiver depoimentos, não renderiza nada (pode ser substituído por um placeholder se desejar)

    return (
        <section className='flex flex-col gap-9 w-full max-w-6xl mx-auto text-center p-4' id="depoimentos">
            <h2 className="font-bold text-4xl">Depoimentos</h2>

            <div className='overflow-hidden'>{/* MOLDURA: Esconde o que está fora da área visível */}
                <div
                    className={`flex shrink-0 ${comTransicao ? 'transition-transform duration-700 ease-in-out' : 'transition-none'}`}
                    style={{ transform: `translateX(-${pagina * 100}%)` }}
                >{/* FITA: Move-se lateralmente com base na página atual */}
                    {Array.from({ length: nPaginasComClones }).map((_, i_pagina) => { // Renderiza as páginas (Reais + Clones)
                        // Lógica para decidir qual conteúdo mostrar em cada página (incluindo clones)
                        let paginaConteudo;
                        if (i_pagina === 0) paginaConteudo = nPaginas - 1; // Clone da última no início
                        else if (i_pagina === nPaginas + 1) paginaConteudo = 0; // Clone da primeira no fim
                        else paginaConteudo = i_pagina - 1; // Páginas normais

                        return (
                            <div key={i_pagina} className='flex w-full gap-8 min-w-full justify-center items-start p-2'>
                                {/* Faz o "recorte" dos depoimentos que pertencem a esta página */}
                                {listaFinal.slice(paginaConteudo * depoPagina, (paginaConteudo + 1) * depoPagina).map((item) => (
                                    <figure key={item.id} className='flex flex-col justify-center items-center gap-4 flex-1 max-w-75'>
                                        <figcaption className='flex flex-col justify-center items-center gap-2'>
                                            {/* Foto com tamanho controlado e otimizada */}
                                            <div className="relative w-20 h-20">
                                                <NextImage
                                                    src={item.foto_depoimento}
                                                    alt={item.nome}
                                                    fill
                                                    className="rounded-full object-cover"
                                                    unoptimized
                                                    priority
                                                />
                                            </div>
                                            <cite className='text-xl font-bold not-italic'>{item.nome}</cite>
                                        </figcaption>
                                        <blockquote className="text-[#7E92AC] text-sm italic min-h-16">
                                            &ldquo;{item.mensagem}&rdquo;
                                        </blockquote>
                                        <div className="relative w-50 h-5">
                                            <NextImage src="/images/RATE.svg" alt="Avaliação" fill priority unoptimized />
                                        </div>
                                        
                                    </figure>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* PAGINAÇÃO (Bolinhas) */}
            <div className="flex gap-4 justify-center items-center">
                {Array.from({ length: nPaginas }).map((_, i) => (
                    <button
                        key={i}
                        // Força a volta da transição ao clicar manualmente, garantindo que o "teletransporte" funcione corretamente mesmo após cliques rápidos
                        onClick={() => { setComTransicao(true); setPagina(i + 1); }}
                        className={`h-3 rounded-full transition-all duration-300 
                            ${(pagina === i + 1 || (pagina === 0 && i === nPaginas - 1) || (pagina === nPaginas + 1 && i === 0))
                                ? "w-8 bg-blue-600" : "w-3 bg-gray-300"}`}
                    />
                ))}
            </div>
        </section>
    );
}
