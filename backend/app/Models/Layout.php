<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Layout extends Model
{
    // 1. Permite preencher a coluna no banco
    protected $fillable = ['id', 'foto_layout'];

    protected function fotoLayout(): Attribute //Funcão para arquivos
    {
        return Attribute::make(
            get: fn($value) => $value ? asset('storage/' . $value) : null,
        );
    }
}
