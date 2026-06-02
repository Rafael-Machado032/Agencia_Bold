'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
// 1. O Único Molde (serve para o Banco e para o Usuário)
interface Depoimento { //Interface do usuario
    id: number;
    nome: string;
    mensagem: string;
    foto_depoimento: string;
}

// 2. O Contrato do Contexto
interface DepoimentoContextoTipo { //Contrato do que o contexto vai usar
    depoimentoDados: Depoimento[]; // [] Porque pode ter vários depoimentos e não apenas um
    setDepoimentoDados: (novosDados: Depoimento[]) => void //O setDados é uma função para receber dados e guardar no usuario o void não retorna nada
}

//Conexao que vai usar o nosso contrato ou vazio
const DepoimentoContexto = createContext<DepoimentoContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function DepoimentoProvedor({ children, depoimentosIniciais = [] }:  {children: ReactNode; depoimentosIniciais?: Depoimento[]} ) {
    const [depoimentoDados, setDepoimentoDados] = useState<Depoimento[]>(depoimentosIniciais);
    
    const depoimentoContextoValor = useMemo(() => ({
        depoimentoDados,
        setDepoimentoDados
    }), [depoimentoDados]);

    return (
        // Enviamos o valor para quem estiver lá dentro
        <DepoimentoContexto.Provider value={depoimentoContextoValor}>
            {children}
        </DepoimentoContexto.Provider>
    );
}

// Avisa se o contexto esta dentro do provedor se estiver fora da erro
export const useDepoimento = () => {
    const context = useContext(DepoimentoContexto);
    if (!context) {
        throw new Error("useDepoimento deve ser usado dentro de um DepoimentoProvedor");
    }
    return context;
};
