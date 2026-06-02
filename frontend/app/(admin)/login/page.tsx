"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Ferramenta para mudar de página
import { FazerLogin } from "@/api/LoginLogout"; // A função que vai lá no Laravel validar o login (POST /api/login) e devolver os dados do usuário e o token
import { useUsuario } from "@/contexts/UsuarioContext"; // Contexto para guardar os dados do usuário logado e compartilhar com toda a aplicação
import Loading from "@/components/loading"; // Componente de loading para mostrar enquanto o login está sendo processado

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // 2. Inicialize o router
    const { setUsuarioDados } = useUsuario(); // 3. Inicialize o contexto do usuário

    const login = async (formData: FormData) => {
        setIsLoading(true); // Mostra o loading enquanto processa o login
        const emailInput = formData.get("email") as string
        const senhaInput = formData.get("senha") as string

        if (emailInput && emailInput.trim() != "" && senhaInput && senhaInput.trim() != "") {
            
            const resultado = await FazerLogin(formData) // Chama a Server Action que faz o fetch para o Laravel (POST /api/login)
            setIsLoading(false);
            if (!resultado?.success) {
                // Se o Laravel disser que a senha/email não batem, ou se der algum erro, mostra um alerta
                alert("Usuario ou Senha Incorreto")
            } else {
                setUsuarioDados(resultado.dados); // 4. Armazena os dados do usuário no contexto
                router.push("/admin");// 2. Manda o usuário para a área restrita (/admin)
            }
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            {isLoading ? (
                <Loading />
            ) : (
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Entrar na Conta</h1>

                <form action={login} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 outline-none"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Acessar Sistema
                    </button>
                </form>
            </div>
            )}
        </main>
    );
}
