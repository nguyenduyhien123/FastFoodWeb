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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name',255);
            $table->text('description');
            $table->bigInteger('price')->unsigned();
            $table->tinyInterger('status');
            $table->string('image');
            $table->bigInterger('product_type_id');
            $table->tinyInterger('star');
            $table->timestamps();

            $table->foreign('product_type_id')->references('id')->on('producttypes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
