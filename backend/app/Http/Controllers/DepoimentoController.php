<?php

namespace App\Http\Controllers;

use App\Models\Depoimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DepoimentoController extends Controller
{
    // 1. CRIAR NOVO (SalvarDepoimentoNoServidor)
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'depoimento' => 'required|string',
            'foto-usuario' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $depoimento = new Depoimento();
        $depoimento->nome = $request->nome;
        $depoimento->mensagem = $request->depoimento;

        if ($request->hasFile('foto-usuario')) {
            $depoimento->foto_depoimento = $request->file('foto-usuario')->store('depoimentos', 'public');
        }

        $depoimento->save();

        return response()->json([
            'success' => true,
            'message' => 'Depoimento criado com sucesso!',
            'data' => $depoimento
        ]);
    }

    // 2. ATUALIZAR EXISTENTE (EditarDepoimentoNoServidor)
    // O Laravel injeta o $id automaticamente da URL /depoimento/{id}
    public function update(Request $request, int $id)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'depoimento' => 'required|string',
            'foto-usuario' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $depoimento = Depoimento::findOrFail($id);
        $depoimento->nome = $request->nome;
        $depoimento->mensagem = $request->depoimento;

        if ($request->hasFile('foto-usuario')) {
            // Deleta a foto antiga para não acumular lixo no servidor
            if ($depoimento->foto_depoimento) {
                Storage::disk('public')->delete($depoimento->foto_depoimento);
            }
            $depoimento->foto_depoimento = $request->file('foto-usuario')->store('depoimentos', 'public');
        }

        $depoimento->save();

        return response()->json([
            'success' => true,
            'message' => 'Depoimento atualizado com sucesso!',
            'data' => $depoimento
        ]);
    }

    // 3. DELETAR (DeletarDepoimentoNoServidor)
    public function destroy(int $id)
    {
        $depoimento = Depoimento::findOrFail($id);

        // Deleta o arquivo físico da foto antes de apagar o registro
        if ($depoimento->foto_depoimento) {
            Storage::disk('public')->delete($depoimento->foto_depoimento);
        }

        $depoimento->delete();

        return response()->json([
            'success' => true,
            'message' => 'Depoimento deletado com sucesso!'
        ]);
    }

    public function show()
    {
        // Retorna todos os depoimentos (pode usar orderBy para os mais recentes virem primeiro)
        return response()->json(Depoimento::orderBy('created_at', 'desc')->get());
    }
}
