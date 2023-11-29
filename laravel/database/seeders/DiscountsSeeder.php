<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiscountsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('discounts')->insert([
            [
                'id' => 1,
                'name' => 'Black Friday Sale',
                'percentage' => 20,
                'start_date' => '2023-11-23',
                'end_date' => '2023-11-29'
             ],
             [
                'id' => 2,
                'name' => 'Cyber Monday Sale',
                'percentage' => 25,
                'start_date' => '2023-11-27',
                'end_date' => '2023-11-30'
             ],
             [
                'id' => 3,
                'name' => 'Christmas Sale',
                'percentage' => 30,
                'start_date' => '2023-12-01',
                'end_date' => '2023-12-25'
             ],
             [
                'id' => 4,
                'name' => 'New Year Sale',
                'percentage' => 15,
                'start_date' => '2023-12-31',
                'end_date' => '2024-01-07'
             ],
             [
                'id' => 5,
                'name' => 'Spring Sale',
                'percentage' => 10,
                'start_date' => '2024-03-01',
                'end_date' => '2024-03-31'
             ]
             ]);
    }
}
