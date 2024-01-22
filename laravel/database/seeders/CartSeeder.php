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

        ]);
    }
}
