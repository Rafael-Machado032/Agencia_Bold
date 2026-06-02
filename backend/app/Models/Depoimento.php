<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Depoimento extends Model
{

    protected $fillable = ['nome', 'mensagem', 'foto_depoimento'];

    protected function fotoDepoimento(): Attribute //Funcão para arquivos
    {
        return Attribute::make(
            get: fn($value) => $value ? asset('storage/' . $value) : null,
        );
    }
}
