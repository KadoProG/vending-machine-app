<?php

namespace App\Models;

use Database\Factories\MerchandiseFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Merchandise extends Model
{
    /** @use HasFactory<MerchandiseFactory> */
    use HasFactory, HasUuids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_id',
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
     * Get the image that owns the merchandise.
     */
    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    /**
     * Get the user that owns the merchandise.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
