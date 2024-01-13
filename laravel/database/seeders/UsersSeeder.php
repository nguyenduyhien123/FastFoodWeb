<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'username' => 'john_doe',
                'email' => 'john_doe@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'John',
                'lastname' => 'Doe',
                'role_id' => 3,
                'birthday' => '1990-01-01',
                'phone' => '1234567890',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 2,
                'username' => 'jane_doe',
                'email' => 'jane_doe@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Jane',
                'lastname' => 'Doe',
                'role_id' => 2,
                'birthday' => '1991-01-01',
                'phone' => '1234567891',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 3,
                'username' => 'alice_smith',
                'email' => 'alice_smith@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Alice',
                'lastname' => 'Smith',
                'role_id' => 1,
                'birthday' => '1992-01-01',
                'phone' => '1234567892',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 4,
                'username' => 'bob_jones',
                'email' => 'bob_jones@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Bob',
                'lastname' => 'Jones',
                'role_id' => 1,
                'birthday' => '1993-01-01',
                'phone' => '1234567893',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 5,
                'username' => 'charlie_brown',
                'email' => 'charlie_brown@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Charlie',
                'lastname' => 'Brown',
                'role_id' => 2,
                'birthday' => '1994-01-01',
                'phone' => '1234567894',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 6,
                'username' => 'dave_johnson',
                'email' => 'dave_johnson@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Dave',
                'lastname' => 'Johnson',
                'role_id' => 2,
                'birthday' => '1995-01-01',
                'phone' => '1234567895',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 7,
                'username' => 'emily_clark',
                'email' => 'emily_clark@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Emily',
                'lastname' => 'Clark',
                'role_id' => 2,
                'birthday' => '1996-01-01',
                'phone' => '1234567896',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 8,
                'username' => 'fred_johnson',
                'email' => 'fred_johnson@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Fred',
                'lastname' => 'Johnson',
                'role_id' => 2,
                'birthday' => '1997-01-01',
                'phone' => '1234567897',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 9,
                'username' => 'grace_clark',
                'email' => 'grace_clark@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Grace',
                'lastname' => 'Clark',
                'role_id' => 1,
                'birthday' => '1998-01-01',
                'phone' => '1234567898',
                'phone_verified_at' => '2023-11-29',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
        ]);
    }
}
