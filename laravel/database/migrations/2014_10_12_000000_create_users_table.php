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
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->dateTime('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->string('fullname');
            $table->string('description')->nullable();
            $table->bigInteger('role_id')->unsigned();
            $table->date('birthday');
            $table->string('phonenumber', 10);
            $table->timestamp('phone_verified_at')->nullable();
            $table->tinyInteger('locked_endable')->default(0);
            $table->timestamp('locked_end')->useCurrent();
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
