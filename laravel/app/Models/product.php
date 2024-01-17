<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'price', 'description', 'image', 'product_type_id', 'status'];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function rates()
    {
        return $this->hasMany(Rate::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function invoiceDetail()
    {
        return $this->hasMany(InvoiceDetail::class);
    }
}
