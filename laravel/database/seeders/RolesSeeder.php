<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['id' => 1, 'name' =>'Nhân viên', 'created_at' => Carbon::now()],
            ['id' => 2, 'name' =>'Khách hàng', 'created_at' => Carbon::now()],
            ['id' => 3, 'name' =>'Admin', 'created_at' => Carbon::now()],
        ]);
    }
}
