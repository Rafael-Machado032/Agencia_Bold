export default function Loading() {
    return (
        <div
            className="flex min-h-[50vh] w-full flex-col items-center justify-center p-6"
            role="status"
            aria-live="polite"
        >
            <div className="relative flex items-center justify-center">
                {/* 1. Anel externo decorativo (Estático) */}
                <div className="h-12 w-12 rounded-full border-4 border-gray-100"></div>

                {/* 2. O Spinner Real (Gira por cima do anel decorativo) */}
                <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>

            {/* 3. Texto Auxiliar com efeito de pulsação suave */}
            <p className="mt-4 animate-pulse text-sm font-medium text-gray-500 dark:text-gray-400">
                Carregando informações...
            </p>

            {/* 4. Texto oculto apenas para leitores de tela (Acessibilidade) */}
            <span className="sr-only">Carregando conteúdo...</span>
        </div>
    );
}
