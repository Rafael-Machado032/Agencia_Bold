<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;

class UsuarioController extends Controller
{
    public function update(Request $request)
    {
        // 1. Validação (Segurança)
        error_log("Dados vindo do Next: " . json_encode($request->all(), JSON_PRETTY_PRINT));
        try {
            $request->validate([
                'nome' => 'nullable|string|max:255',
                'foto-usuario' => 'nullable|image|max:2048'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Isso vai imprimir no seu terminal EXATAMENTE o que deu errado
            error_log(print_r($e->errors(), true));
            throw $e; // Reança o erro para manter o comportamento padrão
        }
        error_log("Depois (pelo array): " . json_encode($request->all(), JSON_PRETTY_PRINT));
        //required: Para informações vitais (Nome, E-mail, Senha). O usuário não pode apagar e deixar em branco.
        //nullable: Para informações opcionais (Foto, Bio, Telefone). O usuário escolhe se quer preencher ou não.

        // 2. Busca o usuário logado (pelo Token que o Next enviou)
        $usuario = $request->user();

        // 3.Testa se não veio vazio e salva o Nome
        if ($request->filled('nome')) {
            $usuario->name = $request->input('nome');
        }

        // 4. Salva a Foto (se o Next enviou uma)
        if ($request->hasFile('foto-usuario')) {

            // 2. Se o usuário já tinha uma foto antiga, a gente deleta ela do HD
            if ($usuario->foto) {
                Storage::disk('public')->delete($usuario->foto);
            }

            // O Laravel gera um nome único e salva em storage/app/public/perfil
            $caminho = $request->file('foto-usuario')->store('perfil', 'public');
            $usuario->foto_perfil = $caminho;
        }

        $usuario->save();

        return response()->json([
            'success' => true,
            'message' => 'Perfil atualizado!',
            'data' => $usuario // <-- Mandando o objeto, o Laravel anexa o 'foto_depoimento' automaticamente
        ]);
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

