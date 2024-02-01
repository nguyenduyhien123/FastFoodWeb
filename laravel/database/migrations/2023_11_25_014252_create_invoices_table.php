<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('discount_id')->nullable();
            $table->unsignedBigInteger('staff_id')->nullable();
            $table->string('code')->unique();
            $table->bigInteger('total_price')->unsigned();
            $table->string('address'); 
            $table->unsignedBigInteger('payment_method_id');
            $table->datetime('paid_at')->nullable();
            // $table->unsignedBigInteger('invoice_status_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('discount_id')->references('id')->on('discounts');
            $table->foreign('staff_id')->references('id')->on('users');
            $table->foreign('payment_method_id')->references('id')->on('payment_methods');
            // $table->foreign('invoice_status_id')->references('id')->on('invoice_statuses');
            // $table->foreign('payment_id')->references('id')->on('payments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
