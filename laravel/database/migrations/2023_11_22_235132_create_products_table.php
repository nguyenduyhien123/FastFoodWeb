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
            $table->string('name')->unique();
            $table->text('description');
            $table->bigInteger('price')->unsigned();
            $table->boolean('status');
            $table->json('image');
            $table->bigInteger('product_type_id')->unsigned();
            $table->tinyInteger('star');
            $table->timestamps();
            $table->softDeletes();

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
