<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendingMachineMerchandise extends Model
{
    /** @use HasFactory<\Database\Factories\VendingMachineMerchandiseFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'vending_machine_id',
        'merchandise_id',
        'stock_quantity',
        'temperature_status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'id' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $attoributes = [
        'stock_quantity' => 0,
        'temperature_status' => 'default',
    ];

    /**
     * Get the vending machine that owns the vending machine merchandise.
     */
    public function vendingMachine()
    {
        return $this->belongsTo(VendingMachine::class);
    }

    /**
     * Get the merchandise that owns the vending machine merchandise.
     */
    public function merchandise()
    {
        return $this->belongsTo(Merchandise::class);
    }
}
