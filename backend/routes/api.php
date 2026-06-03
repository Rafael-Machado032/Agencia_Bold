<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LayoutController;
use App\Http\Controllers\DepoimentoController;
use App\Http\Controllers\MensagemController;


/*
|--------------------------------------------------------------------------
| Rotas Públicas (Site / Visitante)
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

Route::get('/login', function () {
    return response()->json(['message' => 'Não autorizado'], 401);
})->name('login');

Route::get('/layout/{id}', [LayoutController::class, 'show']);
Route::get('/depoimentos', [DepoimentoController::class, 'show']);
Route::post('/contato', [MensagemController::class, 'store']);

/*

|--------------------------------------------------------------------------
| Rotas Protegidas (Painel Administrativo)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Só quem tem o Token (está logado) consegue entrar aqui
    // Defina explicitamente o POST para o update antes do resource
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Token deletado']);
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //Route::post('/usuario', [UsuarioController::class, 'update']);
    //Route::post('/layout/{id}', [LayoutController::class, 'update']);
    //Route::post('/depoimento', [DepoimentoController::class, 'update']);
    Route::match(['post', 'put'], '/layout/{id}', [LayoutController::class, 'update']);
    
    Route::get('/usuario/{user}', [UsuarioController::class, 'show']);
    Route::match(['post', 'put'], '/usuario', [UsuarioController::class, 'update']);
    
    Route::post('/depoimento', [DepoimentoController::class, 'store']);
    Route::post('/depoimento/{id}', [DepoimentoController::class, 'update']); // Tem que ter o {id}
    Route::delete('/depoimento/{id}', [DepoimentoController::class, 'destroy']); // Tem que ter o {id}

    Route::get('/mensagens', [MensagemController::class, 'index']); // Listar mensagens (só para admin)
    Route::delete('/mensagens/{id}', [MensagemController::class, 'destroy']);
    Route::patch('/mensagens/{id}/lida', [MensagemController::class, 'marcarComoLida']);
});
