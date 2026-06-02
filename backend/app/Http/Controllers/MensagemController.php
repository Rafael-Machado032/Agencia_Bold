<?php

namespace App\Http\Controllers;

use App\Models\Mensagem;
use Illuminate\Http\Request;

class MensagemController extends Controller
{
    // App\Http\Controllers\MensagemController.php

    public function marcarComoLida($id)
    {
        try {
            // Busca a mensagem ou retorna 404 se não existir
            $mensagem = Mensagem::findOrFail($id);

            // Atualiza a coluna 'lida' para true (1)
            $mensagem->update(['lida' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Mensagem marcada como lida!',
                'data' => $mensagem
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar mensagem',
            ], 500);
        }
    }

    public function index()
    {
        try {
            // Busca direto da classe (Estático)
            $mensagens = Mensagem::orderBy('created_at', 'desc')->get();
            return response()->json($mensagens);
        } catch (\Exception $e) {
            // Isso vai forçar o erro a aparecer no log se algo falhar no banco
            error_log("ERRO NO INDEX: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        error_log("Dados vindo do Next: " . json_encode($request->all(), JSON_PRETTY_PRINT));
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'mensagem' => 'required|string',
        ]);
        error_log("Depois (pelo array): " . json_encode($request->all(), JSON_PRETTY_PRINT));

        $mensagens = Mensagem::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso!',
            'data' => $mensagens
        ]);
    }

    public function destroy($id)
    {
        $mensagem = Mensagem::findOrFail($id); // Se não achar, dá erro 404
        $mensagem->delete();
        return response()->json([
            'success' => true,
            'message' => 'Mensagem excluída com sucesso!'
        ]);
    }
}
