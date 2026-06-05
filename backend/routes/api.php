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

Route::get('/layout/{layout}', [LayoutController::class, 'show']);

Route::get('/depoimentos', [DepoimentoController::class, 'index']);

Route::post('/contato', [MensagemController::class, 'store']);

/*

|--------------------------------------------------------------------------
| Rotas Protegidas (Painel Administrativo)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Token deletado']);
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/layout', [LayoutController::class, 'store']);
    
    Route::get('/usuario/{user}', [UsuarioController::class, 'show']);
    Route::match(['post', 'put'], '/usuario', [UsuarioController::class, 'update']);
    
    Route::post('/depoimento', [DepoimentoController::class, 'store']);
    Route::post('/depoimento/{depoimento}', [DepoimentoController::class, 'update']); 
    Route::delete('/depoimento/{depoimento}', [DepoimentoController::class, 'destroy']); 

    Route::get('/mensagens', [MensagemController::class, 'index']); 
    Route::delete('/mensagens/{mensagem}', [MensagemController::class, 'destroy']);
    Route::patch('/mensagens/{mensagem}/lida', [MensagemController::class, 'marcarComoLida']);
});
