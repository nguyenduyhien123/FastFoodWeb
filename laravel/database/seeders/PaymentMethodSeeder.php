<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payment_methods')->insert([
            [
            'name' => 'Thanh toán khi nhận hàng',
            'logo' => '/images/payments/cod.svg',
            'created_at' => Carbon::now(),
            'updated_at' =>  Carbon::now(),
            ],
            [
            'name' => 'Thanh toán qua ngân hàng(VietQR)',
            'logo' => '/images/payments/vietqr.svg',
            'created_at' => Carbon::now(),
            'updated_at' =>  Carbon::now(),
            ]
        ]);
    }
}
