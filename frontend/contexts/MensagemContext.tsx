'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// 1. O Molde da Mensagem (Baseado no seu Banco/Laravel)
export interface Mensagem {
    id: number;
    nome: string;
    email: string;
    mensagem: string;
    lida: boolean;
    created_at: string;
}

// 2. O Contrato do Contexto
interface MensagemContextoTipo {
    mensagemDados: Mensagem[];
    setMensagemDados: (novasMensagens: Mensagem[]) => void; // O setMensagemDados é uma função para receber dados e guardar no estado, o void indica que ela não retorna nada
}

const MensagemContexto = createContext<MensagemContextoTipo | undefined>(undefined);

export function MensagemProvedor({ children, mensagensIniciais }: { children: ReactNode; mensagensIniciais?: Mensagem[] | null }) {
    const [mensagemDados, setMensagemDados] = useState<Mensagem[]>(mensagensIniciais || []);
    
    const mensagemContextoValor = useMemo(() => ({
        mensagemDados,
        setMensagemDados
    }), [mensagemDados]);

    return (
        <MensagemContexto.Provider value={mensagemContextoValor}>
            {children}
        </MensagemContexto.Provider>
    );
}

export const useMensagem = () => {
    const context = useContext(MensagemContexto);
    if (!context) {
        throw new Error("useMensagem deve ser usado dentro de um MensagemProvedor");
    }
    return context;
};
