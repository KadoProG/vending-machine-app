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
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'id' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the background that owns the vending machine.
     */
    public function background()
    {
        return $this->belongsTo(Background::class, 'background_id');
    }

    /**
     * Get the user that owns the vending machine.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Get the merchandises for the vending machine.
     */
    public function merchandises()
    {
        return $this->belongsToMany(
            Merchandise::class,
            'vending_machine_merchandises',
            'vending_machine_id',
            'merchandise_id'
        )->withPivot('stock_quantity', 'temperature_status');
    }
}
