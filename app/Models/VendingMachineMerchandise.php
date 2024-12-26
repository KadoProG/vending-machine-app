<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendingMachineMerchandise extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'vending_machine_id',
        'merchandise_id',
        'price',
        'stock_quantity',
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