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

export async function buscarDepoimentos() {
    try {

        // Removi o "/api" daqui, pois ele já está no urlBase
        const res = await fetch(`${urlBase}/depoimentos`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Buscar Depoimentos:", dadosDoBanco);

        return {
            success: true,
            dados: dadosDoBanco.data
        };

    } catch (error) {
        console.error("Erro na requisição:", error); // Log do erro para o terminal
        return { success: false };
    }
}

export async function SalvarDepoimento(formData: FormData) {
    // CORREÇÃO: Adicione o await aqui para garantir que pegamos os headers antes de fazer a requisição
    try {
        const headers = await getAuthHeaders();
        // O Next.js envia o pacote completo (nome + arquivo) para o Laravel
        const res = await fetch(`${urlBase}/depoimento`, {
            method: 'POST',
            body: formData, // so use o formaData se for carregar imagem
            headers: headers
        });

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Salvar Depoimento:", dadosDoBanco);

        if (!res.ok) return { success: false };

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

// 2. EDITAR DEPOIMENTO
export async function EditarDepoimento(id: number, formData: FormData) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/depoimento/${id}`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Editar Depoimento:", dadosDoBanco);

        if (!res.ok) return { success: false };

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

// 3. DELETAR DEPOIMENTO
export async function DeletarDepoimento(id: number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/depoimento/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (!res.ok) return { success: false };

        revalidatePath('/admin');

        return { success: true };

    } catch (error) {
        console.error("Erro no Backend:", error);
        return { success: false };
    }
}
