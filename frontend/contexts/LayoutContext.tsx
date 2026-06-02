'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface Layout {
    id: string;
    foto_layout: string;
}

interface LayoutContextoTipo { //Contrato do que o contexto vai usar
    layoutDados: Layout | null;
    setLayoutDados: (novosDados: Layout | null) => void //O setDados é uma função para receber dados e guardar no usuario o void não retorna nada
}

//Conexao que vai usar o nosso contrato ou vazio
const LayoutContexto = createContext<LayoutContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function LayoutProvedor({ children, layoutInicial }: { children: ReactNode; layoutInicial?: Layout | null }) {
    const [layoutDados, setLayoutDados] = useState<Layout | null>(layoutInicial || null) ;

    const layoutContextoValor = useMemo(() => ({
        layoutDados,
        setLayoutDados
    }), [layoutDados]);

    return (
        // Enviamos o valor para quem estiver lá dentro
        <LayoutContexto.Provider value={layoutContextoValor}>
            {children}
        </LayoutContexto.Provider>
    );
}

// Avisa se o contexto esta dentro do provedor se estiver fora da erro
export const useLayout = () => {
    const context = useContext(LayoutContexto);
    if (!context) {
        throw new Error("useLayout deve ser usado dentro de um LayoutProvedor");
    }
    return context;
};
