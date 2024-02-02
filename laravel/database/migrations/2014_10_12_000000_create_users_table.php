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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique()->nullable();
            $table->string('email')->unique();
            $table->dateTime('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken()->nullable();
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('description')->nullable();
            $table->string('avatar')->nullable();
            $table->bigInteger('role_id')->unsigned()->nullable();
            $table->enum('gender',['Nam','Nữ']);
            $table->date('birthday')->nullable();
            $table->string('phone', 10)->nullable();
            $table->string('address')->nullable();
            $table->timestamp('phone_verified_at')->nullable();
            $table->tinyInteger('locked_end')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
