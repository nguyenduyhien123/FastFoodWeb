<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvoiceStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('invoice_statuses')->insert([
        [
            'name_vi' => 'Đã đặt',
            'name_en' => 'placed',
            'created_at' => Carbon::now(),
            'updated_at' =>  Carbon::now()
        ],
        [
            'name_vi' => 'Đã xác nhận',
            'name_en' => 'verified',
            'created_at' => Carbon::now(),
            'updated_at' =>  Carbon::now()
        ],
        [
            'name_vi' => 'Đang giao',
            'name_en' => 'delivering',
            'created_at' => Carbon::now(),
            'updated_at' =>  Carbon::now()
        ],
        [
            'name_vi' => 'Đã giao',
            'name_en' => 'delivered',
            'created_at' => Carbon::now(),
            'updated_at' =>  Carbon::now()
        ],
        [
            'name_vi' => 'Đã huỷ',
            'name_en' => 'cancelled',
            'created_at' => Carbon::now(),
            'updated_at' =>  Carbon::now()
        ]
        ]);
    }
}
