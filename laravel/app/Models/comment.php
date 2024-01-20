<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
 
class Comment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['user_id', 'product_id', 'comment_id', 'image', 'content', 'path','created_at'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'comment_id');
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, 'comment_id');
    }
    // Lấy cấp của bình luận dựa vào dấu /
    public function getLevelAttribute(){
        if($this->path != "")
        {
            $level = substr_count($this->path,'/');
            return $level + 1;
        }
        return 1;
    }
    public function getCreatedAtAttribute($val){
        return Carbon::parse($val)->getTimestampMs();
    }
    protected $appends = ['level'];
}
