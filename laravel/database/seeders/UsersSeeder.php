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
                'password' => Hash::make('password1'),
                'fullname' => 'John Doe',
                'role_id' => 3,
                'birthday' => '1990-01-01',
                'phonenumber' => '1234567890',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 2,
                'username' => 'jane_doe',
                'email' => 'jane_doe@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password2'),
                'fullname' => 'Jane Doe',
                'role_id' => 2,
                'birthday' => '1991-01-01',
                'phonenumber' => '1234567891',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 3,
                'username' => 'alice_smith',
                'email' => 'alice_smith@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password3'),
                'fullname' => 'Alice Smith',
                'role_id' => 1,
                'birthday' => '1992-01-01',
                'phonenumber' => '1234567892',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 4,
                'username' => 'bob_jones',
                'email' => 'bob_jones@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password4'),
                'fullname' => 'Bob Jones',
                'role_id' => 1,
                'birthday' => '1993-01-01',
                'phonenumber' => '1234567893',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 5,
                'username' => 'charlie_brown',
                'email' => 'charlie_brown@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password5'),
                'fullname' => 'Charlie Brown',
                'role_id' => 2,
                'birthday' => '1994-01-01',
                'phonenumber' => '1234567894',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 6,
                'username' => 'dave_johnson',
                'email' => 'dave_johnson@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password6'),
                'fullname' => 'Dave Johnson',
                'role_id' => 2,
                'birthday' => '1995-01-01',
                'phonenumber' => '1234567895',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 7,
                'username' => 'emily_clark',
                'email' => 'emily_clark@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password7'),
                'fullname' => 'Emily Clark',
                'role_id' => 2,
                'birthday' => '1996-01-01',
                'phonenumber' => '1234567896',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 8,
                'username' => 'fred_johnson',
                'email' => 'fred_johnson@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password8'),
                'fullname' => 'Fred Johnson',
                'role_id' => 2,
                'birthday' => '1997-01-01',
                'phonenumber' => '1234567897',
                'phone_verified_at' => '2023-11-29'
            ],
            [
                'id' => 9,
                'username' => 'grace_clark',
                'email' => 'grace_clark@example.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password9'),
                'fullname' => 'Grace Clark',
                'role_id' => 1,
                'birthday' => '1998-01-01',
                'phonenumber' => '1234567898',
                'phone_verified_at' => '2023-11-29'
            ],
        ]);
    }
}
