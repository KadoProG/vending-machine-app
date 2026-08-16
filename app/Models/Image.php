<?php

namespace App\Models;

use Database\Factories\ImageFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    /** @use HasFactory<ImageFactory> */
    use HasFactory, HasUuids, SoftDeletes;

    public const PUBLIC_TYPE_PUBLIC = 'public';

    public const PUBLIC_TYPE_PRIVATE = 'private';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'alt',
        'description',
        'disk',
        'path',
        'original_name',
        'mime_type',
        'size',
        'width',
        'height',
        'public_type',
        'author_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'id' => 'string',
        'size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'url',
    ];

    /**
     * Get the user that owns the image.
     */
    public function user()
    {
        return $this->hasOne(User::class, 'image_id');
    }

    /**
     * Get the user that uploaded the image.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Get the merchandises that use the image.
     */
    public function merchandises()
    {
        return $this->hasMany(Merchandise::class, 'image_id');
    }

    /**
     * Get the filesystem disk where the image is stored.
     */
    public function disk(): FilesystemAdapter
    {
        /** @var FilesystemAdapter $disk */
        $disk = Storage::disk($this->disk);

        return $disk;
    }

    /**
     * Determine whether the image is publicly accessible.
     */
    public function isPublic(): bool
    {
        return $this->public_type === self::PUBLIC_TYPE_PUBLIC;
    }

    /**
     * Get the URL used to display the image.
     *
     * 非公開画像は Web サーバから直接配信させず、認可を挟むコントローラ経由で返す。
     */
    public function getUrlAttribute(): string
    {
        if (! $this->isPublic()) {
            return route('images.show', ['image' => $this->id]);
        }

        return $this->disk()->url($this->path);
    }
}
