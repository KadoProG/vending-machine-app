<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Merchandise extends Model
{
    /** @use HasFactory<\Database\Factories\MerchandiseFactory> */
    use HasFactory, SoftDeletes;

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
        'last_edited_id',
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
        return $this->hasOne(User::class, 'id', 'author_id');
    }

    /**
     * Get the user that last edited the merchandise.
     */
    public function lastEdited()
    {
        return $this->hasOne(User::class, 'id', 'last_edited_id');
    }
}
