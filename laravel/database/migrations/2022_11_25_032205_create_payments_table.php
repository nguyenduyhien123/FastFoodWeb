<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transaction')->unique();
            $table->unsignedBigInteger('invoice_id');
            $table->string('reference_number');
            $table->unsignedBigInteger('amount');
            $table->string('bank_account');
            $table->string('content');
            $table->string('status');
            $table->string('message');
            $table->dateTime('time_created');
            $table->dateTime('time_paid');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
