<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Goutte\Client;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([ProductTypesSeeder::class, ProductsSeeder::class, RolesSeeder::class, UsersSeeder::class, DiscountsSeeder::class,PaymentMethodSeeder::class, CartSeeder::class, InvoiceStatusSeeder::class]);
    }
}
