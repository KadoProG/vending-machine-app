<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VendingMachine extends Model
{
    /** @use HasFactory<\Database\Factories\VendingMachineFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'background_id',
        'author_id',
    ];

    /**
     * Get the background that owns the vending machine.
     */
    public function background()
    {
        return $this->belongsTo(Background::class);
    }

    /**
     * Get the user that owns the vending machine.
     */
    public function author()
    {
        return $this->belongsTo(User::class);
    }
}
