<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Background extends Model
{
    /** @use HasFactory<\Database\Factories\BackgroundFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'css_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'id' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
