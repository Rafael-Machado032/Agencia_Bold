<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LayoutController extends Controller
{
    public function update(Request $request, $id)
    {
        // 1. Validação (Sempre importante!)
        try {
            $request->validate([
                'foto-pc' => 'required|image|max:5000', // 'foto-pc' é o name do seu input no Next
            ]);
 

        // 2. Busca o Layout pelo ID (no seu caso, passamos o ID 1)
        // Se não existir, o findOrFail já retorna um erro 404 sozinho
        $layout = Layout::findOrFail($id);

        // 3. Se enviou um arquivo novo...
        if ($request->hasFile('foto-pc')) {

            // Deleta a foto anterior do HD se ela existir
            if ($layout->foto_layout) {
                Storage::disk('public')->delete($layout->foto_layout);
            }

            // Salva a nova na pasta 'layouts' dentro do storage
            $caminho = $request->file('foto-pc')->store('layouts', 'public');

            // Atualiza o caminho no objeto
            $layout->foto_layout = $caminho;
        }

        // 4. Grava no Banco de Dados
        $layout->save();

        return response()->json([
            'success' => true,
            'message' => 'Layout atualizado com sucesso!',
            'data' => $layout // Aqui o Next.js já recebe o 'foto_layout' graças ao Accessor e ao $appends
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'Erro ao atualizar o Layout.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    public function show($id)
    {
        $layout = Layout::findOrFail($id);
        return response()->json([
            'data' => $layout
        ]);
    }
}
