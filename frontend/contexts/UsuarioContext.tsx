'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Usuario {
    name: string;
    foto_perfil: string;
}

interface UsuarioContextoTipo {
    usuarioDados: Usuario | null;
    setUsuarioDados: (novosDados: Usuario | null) => void;
}

const UsuarioContexto = createContext<UsuarioContextoTipo | undefined>(undefined);

export function UsuarioProvedor({ children, usuarioIniciais }: { children: ReactNode, usuarioIniciais?: Usuario | null }) {
    // 1. Estado inicial nasce estritamente do que vem do servidor (Laravel)
    // Isso garante que o primeiro render seja idêntico no servidor e no cliente
    const [usuarioDados, setUsuarioDados] = useState<Usuario | null>(usuarioIniciais || null);
    // com o revalidatePath na api sempre vai ser chamado usuarioIniciais, não tendo nescessidade de usar sicronização, isso tem que ser chamado no layout
    // 3. Memorização do valor do contexto para performance
    const usuarioContextoValor = useMemo(() => ({ 
        usuarioDados, 
        setUsuarioDados 
    }), [usuarioDados]);

    return (
        <UsuarioContexto.Provider value={usuarioContextoValor}>
            {children}
        </UsuarioContexto.Provider>
    );
}

export const useUsuario = () => {
    const context = useContext(UsuarioContexto);
    if (!context) {
        throw new Error("useUsuario deve ser usado dentro de um UsuarioProvedor");
    }
    return context;
};
