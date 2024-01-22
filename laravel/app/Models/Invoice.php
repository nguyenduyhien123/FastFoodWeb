<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function staff()
    {
        return $this->belongsTo(User::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function invoiceDetail()
    {
        return $this->hasMany(InvoiceDetail::class);
    }
    public function getCreatedAtAttribute($val){
        return Carbon::parse($val)->getTimestampMs();
    }
    public function getUpdatedAtAttribute($val){
        return Carbon::parse($val)->getTimestampMs();
    }
    protected $fillable = ['user_id','discount_id','staff_id','code', 'payment_method_id','total_price','address','status','created_at','updated_at'];
}
