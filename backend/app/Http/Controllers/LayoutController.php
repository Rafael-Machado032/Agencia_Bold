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
                // 🚀 EXCLUIR A FOTO ANTIGA: Se o registro já existe e tem uma foto salva, apaga ela do disco
                if ($layoutAtual && $layoutAtual->foto_layout) {
                    Storage::disk('public')->delete($layoutAtual->foto_layout);
                }
                // 'pasta_destino' é onde o arquivo vai ficar no storage/app/public
                $caminhoArquivo = $request->file('foto-pc')->store('layouts', 'public');
            }

            // Se quiser usar o nome original do arquivo, pode usar storeAs:
            // if ($request->hasFile('campo_arquivo')) {
            //     $file = $request->file('campo_arquivo');
            //     $nomeOriginal = $file->getClientOriginalName();
            //     // storeAs garante que use o nome que você passou
            //     $path = $file->storeAs('pasta_destino', $nomeOriginal, 'public');
            // }

            // 3. PERSISTÊNCIA (SALVAR NO BANCO)
            // Mapeie: 'coluna_no_banco' => $dadosValidados['campo_do_form']
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
