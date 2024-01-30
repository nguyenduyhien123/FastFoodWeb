<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;


    public function comments():HasMany{
        return $this->hasMany(Comment::class);
    }

    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function carts(){
        return $this->hasMany(Cart::class);
    }

    public function rates(){
        return $this->hasMany(Rate::class);
    }

    public function wishlists(){
        return $this->hasMany(Wishlist::class);
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */ 
    protected $fillable = [
        'name',
        'email',
        'password',
        'firstname',
        'lastname',
        'phone',
        'avatar',
        'role_id',
        'birthday',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function getFullnameAttribute(){
        return $this->lastname .' '.$this->firstname;
    }
    public function getCreatedAtAttribute($val){
        return Carbon::parse($val)->setTimezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i:s');
    }
    public function getUpdatedAtAttribute($val){
        return Carbon::parse($val)->setTimezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i:s');
    }
    protected $appends = ['fullname'];
}
