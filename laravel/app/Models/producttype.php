<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductType extends Model
{
    use HasFactory;
    use SoftDeletes;


    protected $fillable = ['name', 'image'];
    //cho phép khi gọi api tạo product thì name và image được phép thêm
    public function products()
    {
        return $this->hasMany(Product::class);
    }

}
