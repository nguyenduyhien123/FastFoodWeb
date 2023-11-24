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
    public function producttypes(): HasMany{
        return $this->hasMany(Producttype::class);
    }

    public function comments(): HasMany{
        return $this->hasMany(Comment::class);
    }

    public function carts(){
        return $this->hasMany(Cart::class);
    }

    public function rates(){
        return $this->hasMany(Rate::class);
    }
}
