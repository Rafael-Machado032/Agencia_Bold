'use server'; // Garante que este código rode APENAS no servidor do Next.js
import { cookies } from 'next/headers'; // Ferramenta para ler/gravar cookies no navegador
import { redirect } from 'next/navigation';


const urlBase = process.env.NEXT_PUBLIC_API_URL;

// --- LOGIN ---
export async function FazerLogin(formData: FormData) {

    try {
        
        const cookieStore = await cookies(); // Tem que ser declarada em cada função porque cada Server Action é um ambiente isolado, não compartilha variáveis nem estados entre si. Então não dá pra declarar o cookieStore lá no topo do arquivo e usar em todas as funções, tem que declarar dentro de cada função que precisa acessar os cookies.
        // 1. Envia os dados para o Laravel (POST /api/login)
        const res = await fetch(`${urlBase}/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ // Converte o FormData em um JSON que o Laravel entende
                email: formData.get("email"),
                password: formData.get("senha") // Pega do input 'senha' e batiza como 'password'
            }),
        });

        const dadosDoBanco = await res.json(); // 2. Transforma a resposta do Laravel em um objeto Javascript

        if (res.ok && dadosDoBanco.token) { // 3. Verifica se o Laravel respondeu 200 (OK) e se enviou um Token

            // 4. Salva o Token nos Cookies
            // httpOnly: true impede que Hackers roubem o token via JavaScript (XSS)
            cookieStore.set('token', dadosDoBanco.token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Só usa HTTPS em produção
                maxAge: 60 * 60 * 24, // Expira em 1 dia
                sameSite: 'lax',
            });
            return {
                success: true,
                dados: dadosDoBanco.user
            };

        } else {
            return { 
                success: false, 
                message: dadosDoBanco.message || 'Credenciais inválidas'
            };
        }
    } catch (error) {
        // Se o servidor Laravel estiver desligado ou a rede cair
        console.error("Erro no fetch:", error);
        return { success: false };
    }
    // Se o login falhou (senha errada, etc), retorna falso
    redirect('/admin'); // Se o login foi bem-sucedido, redireciona para a área admin
}

// --- LOGOUT ---
export async function FazerLogout() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // 1. Avisa o Laravel ANTES de apagar o cookie local
    if (token) {
        try {
            await fetch(`${urlBase}/logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o crachá para o Laravel saber quem deslogar
                }
            });
        } catch (error) {
            console.error("Erro ao avisar logout ao Laravel", error);
        }
    }

    // 2. Agora sim, apaga o cookie no navegador
    cookieStore.delete('token'); // Apaga ambos os cookies relacionados ao login
    // 3. Manda para o login
    redirect('/login');
}

