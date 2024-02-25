<?php

namespace App\Models;

use Carbon\Carbon;
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
    public function getCreatedAtAttribute($val){
        return Carbon::parse($val)->setTimezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i:s');
    }
    public function getUpdatedAtAttribute($val){
        return Carbon::parse($val)->setTimezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i:s');
    }
}
