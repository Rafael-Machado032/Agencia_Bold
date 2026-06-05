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

export async function buscarLayout() {
    try {
        // Removi o "/api" daqui, pois ele já está no urlBase
        const res = await fetch(`${urlBase}/layout/1`, { 
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Buscar Layout:", dadosDoBanco);

        return {
            success: true,
            dados: dadosDoBanco.data
        };
    } catch (error) {
        console.error("Erro na requisição:", error); // Log do erro para o terminal
        return { success: false }; // Retorna um objeto com success: false em caso de erro
    }
}

export async function SalvarLayout(formData: FormData) {
    const headers = await getAuthHeaders();
    try {
        
        // O Next.js envia o pacote completo (nome + arquivo) para o Laravel
        const res = await fetch(`${urlBase}/layout`, {
            method: 'POST',
            body: formData, // so use o formaData se for carregar imagem
            headers: headers
        });

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor Salvar Layout:", dadosDoBanco);

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
