<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_types')->insert([
            ['id' => 1, 'name' => 'Burger', 'image' => 'https://burgerking.vn/media/wysiwyg/navigation/P-BURGER.jpg', 'created_at' => Carbon::now()],
            ['id' => 2, 'name' => 'Combo', 'image' => 'https://burgerking.vn/media/wysiwyg/navigation/P-VALUE-MEALS.jpg', 'created_at' => Carbon::now()],
            ['id' => 3, 'name' => 'Gà rán', 'image' => 'https://burgerking.vn/media/wysiwyg/navigation/P-GA-RAN.jpg', 'created_at' => Carbon::now()],
            ['id' => 4, 'name' => 'Cơm', 'image' => 'https://burgerking.vn/media/wysiwyg/navigation/P-RICE-KING.png', 'created_at' => Carbon::now()],
            ['id' => 5, 'name' => 'Ăn kèm', 'image' => 'https://burgerking.vn/media/wysiwyg/navigation/P-MON-AN-KEM.png', 'created_at' => Carbon::now()],
            ['id' => 6, 'name' => 'Đồ uống', 'image' => 'https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/c/o/coke-2.jpg', 'created_at' => Carbon::now()]
        ]);
    }
}
