<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PasswordResetToken extends Model
{
    use HasFactory;
    protected $primaryKey = 'email';
    protected $fillable = ['email', 'token','created_at','updated_at','expires_at'];
}
