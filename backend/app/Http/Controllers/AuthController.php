<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validação (Essencial para não dar erro 500)
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Busca o usuário pelo e-mail que o Next enviou
        $user = User::where('email', $request->email)->first();

        // 3. Verifica se o usuário existe e se a senha (password) bate com o Hash do banco
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }
        
        $user->tokens()->delete();
        // 4. Se deu certo, cria o Token (o "crachá")
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }
}
