<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LayoutController extends Controller
{
    public function store(Request $request)
    {
        // 1. REGRAS DE VALIDAÇÃO
        try { // Troque as chaves pelos nomes dos campos do seu formulário/frontend
            $request->validate([
                'foto-pc' => 'required|image|max:5000', // 'foto-pc' é o name do seu input no Next
            ]);

            // 1. BUSCA O REGISTRO ATUAL NO BANCO (Se existir)
            $layoutAtual = Layout::find(1);

            $caminhoArquivo = null;

            // 2. LÓGICA DE UPLOAD
            if ($request->hasFile('foto-pc')) {
                if ($layoutAtual) {
                    // 🚀 O SEGREDO: getRawOriginal garante o caminho real ('layouts/foto.jpg') sem o 'http://...' do Accessor
                    $fotoAntigaPura = $layoutAtual->getRawOriginal('foto_layout');

                    // Verifica se o arquivo antigo realmente existe e deleta ele do disco
                    if ($fotoAntigaPura && Storage::disk('public')->exists($fotoAntigaPura)) {
                        Storage::disk('public')->delete($fotoAntigaPura);
                    }
                }
                $caminhoArquivo = $request->file('foto-pc')->store('layouts', 'public');
            }

            $registro = Layout::updateOrCreate(
                ['id' => 1], // Condição para encontrar o registro (aqui sempre o ID 1)
                ['foto_layout' => $caminhoArquivo], // Dados a atualizar ou criar
            );

            return response()->json([
                'message' => 'Criado com sucesso!',
                'data'    => $registro // Não esquesa que de usar .dados para pegar as irfomações do item criado
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'error'   => 'Erro interno no servidor.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
    public function show(Layout $layout)
    {
        try {
            return response()->json([
                'message' => 'Item encontrado!',
                'data' => $layout
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao mostrar o projeto.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
