<?php

namespace App\Http\Controllers;

use App\Models\Depoimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DepoimentoController extends Controller
{

    public function index()
    {
        try {
            // Busca todos os depoimentos, trazendo os mais novos primeiro
            $depoimentos = Depoimento::orderBy('created_at', 'desc')->get();

            return response()->json([
                'message' => 'Lista de depoimentos encontrada!',
                'data' => $depoimentos // 🚀 Mantém o padrão .data que seu Next.js espera ler
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao buscar os depoimentos.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
    // 1. CRIAR NOVO (SalvarDepoimentoNoServidor)
    public function store(Request $request)
    {
        $dadosValidados = $request->validate([
            'nome' => 'required|string|max:255',
            'depoimento' => 'required|string',
            'foto-usuario' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $caminhoArquivo = null;

        if ($request->hasFile('foto-usuario')) {
            $caminhoArquivo = $request->file('foto-usuario')->store('depoimentos', 'public');
        }

        $registro = Depoimento::create([
            'nome' => $dadosValidados['nome'],
            'mensagem' => $dadosValidados['depoimento'],
            'foto_depoimento' => $caminhoArquivo
        ]);

        return response()->json([
            'message' => 'Depoimento criado com sucesso!',
            'data' => $registro
        ]);
    }

    // 2. ATUALIZAR EXISTENTE (EditarDepoimentoNoServidor)
    // O Laravel injeta o $id automaticamente da URL /depoimento/{id}
    public function update(Request $request, Depoimento $depoimento)
    {
        try {
            $dadosValidados = $request->validate([
                'nome' => 'required|string|max:255',
                'depoimento' => 'required|string',
                'foto-usuario' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            // Mantém a foto atual caso o usuário não envie uma nova
            $caminhoArquivo = $depoimento->getRawOriginal('foto_depoimento');

            // Se uma nova foto foi enviada no formulário
            if ($request->hasFile('foto-usuario')) {
                // 1. Apaga a foto antiga fisicamente do disco
                if ($caminhoArquivo && Storage::disk('public')->exists($caminhoArquivo)) {
                    Storage::disk('public')->delete($caminhoArquivo);
                }
                // 2. Salva a foto nova na pasta
                $caminhoArquivo = $request->file('foto-usuario')->store('depoimentos', 'public');
            }

            // 🚀 CORREÇÃO CRUCIAL: Chama o update diretamente na instância ($depoimento)
            $depoimento->update([
                'nome' => $dadosValidados['nome'],
                'mensagem' => $dadosValidados['depoimento'],
                'foto_depoimento' => $caminhoArquivo
            ]);

            return response()->json([
                'message' => 'Depoimento atualizado com sucesso!',
                'data' => $depoimento // Retorna o próprio objeto atualizado
            ], 200); // Status 200 porque é uma atualização de sucesso

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao atualizar o depoimento.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }


    // 3. DELETAR (DeletarDepoimentoNoServidor)
    public function destroy(Depoimento $depoimento)
    {
        $caminhoArquivo = $depoimento->getRawOriginal('foto_depoimento');

        if ($caminhoArquivo && Storage::disk('public')->exists($caminhoArquivo)) {
            Storage::disk('public')->delete($caminhoArquivo);
        }

        $depoimento->delete();

        return response()->json([
            'message' => 'Depoimento deletado com sucesso!'
        ]);
    }
   
}
