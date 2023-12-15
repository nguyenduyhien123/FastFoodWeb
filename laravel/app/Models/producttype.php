<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producttype extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = ['producttypes'];
    protected $fillable = ['name', 'image'];
    //cho phép khi gọi api tạo product thì name và image được phép thêm
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
