'use server'; // Isso diz ao Next: "Rode isso APENAS no servidor"
import { cookies } from 'next/headers'; // Se você salvar o token em cookies
import { revalidatePath } from 'next/cache'; // Para atualizar a página após salvar o layout

const urlBase = process.env.NEXT_PUBLIC_API_URL;

// Função privada: Só usada internamente aqui para as funções que precisam de Token
async function getAuthHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

export async function SalvarUsuario(formData: FormData) {
    // CORREÇÃO: Adicione o await aqui
    const headers = await getAuthHeaders(); // Pega o token dos cookies para enviar ao Laravel
    formData.append('_method', 'PUT');
    try {
        // O Next.js envia o pacote completo (nome + arquivo) para o Laravel
        const res = await fetch(`${urlBase}/usuario`, {
            method: 'POST',
            body: formData, // so use o formaData se for carregar imagem
            headers: headers
        });

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Salvar Usuário:", dadosDoBanco);

        revalidatePath('/admin');

        return {
            success: true,
            dados: dadosDoBanco.data
        };

    } catch (error) {
        console.error("Erro no Backend:", error);
        return { success: false };
    }
}

export async function buscarUsuario() {
    try {
        const headers = await getAuthHeaders(); // Pega o token
        const res = await fetch(`${urlBase}/usuario/1`, {
            method: 'GET',
            cache: 'no-store',
            headers: headers // Envia os headers com o token
        });

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Buscar Usuário:", dadosDoBanco);

        if (!res.ok) return { success: false };
        return {
            success: true,
            dados: dadosDoBanco.data
        };

    } catch (error) {
        console.error("Erro na requisição de usuário:", error);
        return { success: false };
    }
}

