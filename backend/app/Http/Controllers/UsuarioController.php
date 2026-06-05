<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;

class UsuarioController extends Controller
{
    public function update(Request $request)
    {

        try {
            $request->validate([
                'nome' => 'nullable|string|max:255',
                'foto-usuario' => 'nullable|image|max:2048'
            ]);


            // 2. Busca o usuário logado (pelo Token que o Next enviou)
            $usuario = $request->user();

            // 3.Testa se não veio vazio e salva o Nome
            if ($request->filled('nome')) {
                $usuario->name = $request->input('nome');
            }

            // 4. Salva a Foto (se o Next enviou uma)
            if ($request->hasFile('foto-usuario')) {
                $fotoAtual = $usuario->getRawOriginal('foto_perfil'); // Pega o caminho real do arquivo no banco, sem o Accessor
                // 2. Se o usuário já tinha uma foto antiga, a gente deleta ela do HD
                if ($fotoAtual && Storage::disk('public')->exists($fotoAtual)) {
                    Storage::disk('public')->delete($fotoAtual);
                }

                // O Laravel gera um nome único e salva em storage/app/public/perfil
                $caminho = $request->file('foto-usuario')->store('perfil', 'public');
                $usuario->foto_perfil = $caminho;
            }

            $usuario->save();

            return response()->json([
                'success' => true,
                'message' => 'Perfil atualizado!',
                'data' => $usuario // <-- Mandando o objeto, o Laravel anexa o 'foto_perfil' automaticamente
            ]);
        } catch (\Exception $e) {

            return response()->json([
                'error'   => 'Erro interno no servidor.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
    public function show(User $user)
    {
        try {
            return response()->json([
                'message' => 'Item encontrado!',
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao mostrar o usuário.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
