'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode } from 'react';

// 2. Definimos os nomes das abas para o TypeScript não nos deixar errar o nome
type AbaId = "home" | "depoimento" | "mensagem";

// 3. Definimos o que o nosso "contrato" de dados terá:
// - abaAtiva: a string com o nome da aba atual
// - setAbaAtiva: a função para trocar esse nome
interface NavigationContextType {
    abaAtiva: AbaId;
    setAbaAtiva: (id: AbaId) => void;
}

// 4. Criamos o "espaço" do contexto na memória
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// 5. O Provider (Provedor): É o componente que vai "abraçar" o layout
export function NavegacaoProvedor({ children }: { children: ReactNode }) {
    const [abaAtiva, setAbaAtiva] = useState<AbaId>("home"); // Estado global

    return (
        // Enviamos o valor para quem estiver lá dentro
        <NavigationContext.Provider value={{ abaAtiva, setAbaAtiva }}>
            {children}
        </NavigationContext.Provider>
    );
}

// 6. O Hook Personalizado: Para não ter que importar o 'useContext' e o 'NavigationContext' toda vez
export const useNavegacao = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useNavigation deve ser usado dentro de um NavigationProvider");
    }
    return context;
};
