<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceTrack extends Model
{
    use HasFactory, SoftDeletes;
    public function invoice(){
        return $this->belongsTo(Invoice::class);
    }
    public function invoiceStatus(){
        return $this->belongsTo(InvoiceStatus::class);
    }
    public function getCreatedAtAttribute($val){
        return Carbon::parse($val)->getTimestampMs();
    }
    public function getUpdatedAtAttribute($val){
        return Carbon::parse($val)->getTimestampMs();
    }
    protected $fillable  = ['invoice_id','invoice_status_id','description','created_at','updated_at'];
}
