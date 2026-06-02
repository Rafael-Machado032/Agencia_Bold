<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    
    use HasFactory, Notifiable, HasApiTokens;
    //HasFactory: Permite criar "Fábricas" para gerar usuários falsos (útil para testes).
    //Notifiable: Permite enviar notificações para o usuário (e-mail, SMS, etc).
    //HasApiTokens: Permite que o seu usuário gere "Tokens" (senhas digitais temporárias).

    protected $fillable = [
        'name',
        'email',
        'password',
        'foto_perfil'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function fotoPerfil(): Attribute //Funcão para arquivos
    {
        return Attribute::make(
            get: fn($value) => $value ? asset('storage/' . $value) : null,
        );
    }
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
