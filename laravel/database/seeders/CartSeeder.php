<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('carts')->insert([
            [
                'product_id' => 5,
                'user_id' => 3,
                'quantity' => 20,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 4,
                'user_id' => 3,
                'quantity' => 34,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 3,
                'user_id' => 4,
                'quantity' => 43,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 10,
                'user_id' => 5,
                'quantity' => 4,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 7,
                'user_id' => 7,
                'quantity' => 8,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 25,
                'user_id' => 8,
                'quantity' => 5,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 32,
                'user_id' => 8,
                'quantity' => 6,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 7,
                'user_id' => 8,
                'quantity' => 3,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 20,
                'user_id' => 9,
                'quantity' => 7,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 2,
                'user_id' => 9,
                'quantity' => 5,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 18,
                'user_id' => 6,
                'quantity' => 1,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 45,
                'user_id' => 10,
                'quantity' => 9,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ],
            [
                'product_id' => 25,
                'user_id' => 8,
                'quantity' => 4,
                'created_at' => Carbon::now(),
                'updated_at' =>  Carbon::now(),
            ]

        ]);
    }
}
