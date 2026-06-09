'use server'
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

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

export async function buscarMensagens() {
    try {
        const headers = await getAuthHeaders(); // Pega o token
        const res = await fetch(`${urlBase}/mensagens`, {
            method: 'GET',
            headers: headers, // Envia os headers com o token
            next: { revalidate: 86400 } // Salva em cache por 24 horas (86400 segundos)
        });

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Buscar Mensagens:", dadosDoBanco);

        if (!res.ok) return { success: false };
        return {
            success: true,
            dados: dadosDoBanco
        };

    } catch (error) {
        console.error("Erro na requisição de mensagens:", error);
        return { success: false };
    }
}

export async function EnviarMensagemContato(formData: FormData) {
    try {
        const res = await fetch(`${urlBase}/contato`, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Enviar Mensagem:", dadosDoBanco);

        return {
            success: true,
            dados: dadosDoBanco.data
        };

    } catch (error) {
        console.error("Erro na requisição:", error); // Log do erro para o terminal
        return { success: false };
    }
}


// DELETAR MENSAGEM
export async function DeletarMensagem(id: number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/mensagens/${id}`, {
            method: 'DELETE',
            headers: headers
        });
        
        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Deletar Mensagem:", dadosDoBanco);

        if (!res.ok) return { success: false };

        revalidatePath('/admin');

        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        return { success: false };
    }
}

// MARCAR COMO LIDA (Opcional: se quiser salvar no banco que você já viu)
export async function MarcarMensagemLida(id: number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/mensagens/${id}/lida`, {
            method: 'PATCH',
            headers: headers
        });
        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Marcar Mensagem Lida:", dadosDoBanco);

        revalidatePath('/admin');

        if (!res.ok) return { success: false };
        return {
            success: true,
            dados: dadosDoBanco.data
        };
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        return { success: false };
    }
}
