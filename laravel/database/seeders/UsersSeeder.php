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
                'username' => 'ngthithu',
                'email' => 'ngthithu@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Thu',
                'lastname' => 'Nguyễn Thị',
                'role_id' => 2,
                'birthday' => '1992-03-10',
                'phone' => '037557031',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Nguyễn Thị Thu đây !!!',
                'address' => '456 Lê Lợi, Phường Bến Thành, Quận 1, TPHCM',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 2,
                'username' => 'nguyenduyhien',
                'email' => 'nguyenduyhien0123456789@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Hiện',
                'lastname' => 'Nguyễn Duy',
                'role_id' => 2,
                'birthday' => '1990-01-01',
                'phone' => '0943851465',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Nguyễn Duy Hiện đây !!!',
                'address' => '234 Hai Bà Trưng, Phường Bến Nghé, Quận 1, TPHCM',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-dep-thien-nhien.jpg'
            ],
            [
                'id' => 3,
                'username' => 'lehoanganh',
                'email' => 'lehoanganh@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Anh',
                'lastname' => 'Lê Hoàng',
                'role_id' => 1,
                'birthday' => '1992-01-01',
                'phone' => '0357500482',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Lê Hoàng Anh đây !!!',
                'address' => '567 Võ Văn Tần, Phường 6, Quận 3, TPHCM',
                'avatar' => 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'
            ],
            [
                'id' => 4,
                'username' => 'nguyenanhminh',
                'email' => 'nguyenanhminh@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Minh',
                'lastname' => 'Nguyễn Anh',
                'role_id' => 1,
                'birthday' => '1995-12-03',
                'phone' => '0325937753',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Nguyễn Anh Minh đây !!!',
                'address' => '432 Trần Quang Diệu, Phường 14, Quận 3, TPHCM',
                'avatar' => 'https://www.fodors.com/wp-content/uploads/2021/09/3-FallFoliage-Aspen-shutterstock_1866243163-390x260.jpg'
            ],
            [
                'id' => 5,
                'username' => 'dtntrinh',
                'email' => 'dtntrinh@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Trinh',
                'lastname' => 'Đặng Thị Ngọc',
                'role_id' => 2,
                'birthday' => '1991-06-15',
                'phone' => '0362498105',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Đặng Thị Ngọc Trinh đây !!!',
                'address' => '987 Nguyễn Đức Cảnh, Phường Tân Phong, Quận 7, TPHCM',
                'avatar' => 'https://fatafatsewa.com/storage/media/76/ktslI21609.jpg'
            ],
            [
                'id' => 6,
                'username' => 'ngthimylinh',
                'email' => 'ngthimylinh@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Linh',
                'lastname' => 'Nguyễn Thị Mỹ',
                'role_id' => 2,
                'birthday' => '1999-06-12',
                'phone' => '0385849442',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Nguyễn Thị Mỹ Linh đây !!!',
                'address' => '876 Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TPHCM',
                'avatar' => 'https://msmobile.com.vn/upload_images/images/hinh-nen-thien-nhien-dep-cho-laptop-7.jpg'
            ],
            [
                'id' => 7,
                'username' => 'ngovanduc',
                'email' => 'ngovanduc@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Đức',
                'lastname' => 'Ngô Văn',
                'role_id' => 2,
                'birthday' => '1998-04-23',
                'phone' => '0347589641',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Ngô Văn Đức đây !!!',
                'address' => '654 Lê Văn Khương, Phường Hiệp Thành, Quận 12, TPHCM',
                'avatar' => 'https://www.fodors.com/wp-content/uploads/2021/09/3-FallFoliage-Aspen-shutterstock_1866243163-390x260.jpg'
            ],
            [
                'id' => 8,
                'username' => 'lethibichngoc',
                'email' => 'lethibichngoc@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Ngọc',
                'lastname' => 'Lê Thị Bích',
                'role_id' => 2,
                'birthday' => '1994-11-27',
                'phone' => '0376326443',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Lê Thị Bích Ngọc đây !!!',
                'address' => '876 Cộng Hòa, Phường 15, Quận Tân Bình, TPHCM',
                'avatar' => 'https://fatafatsewa.com/storage/media/76/ktslI21609.jpg'
            ],
            [
                'id' => 9,
                'username' => 'nguyenthuykieu',
                'email' => 'nguyenthuykieu@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Kiều',
                'lastname' => 'Nguyễn Thuý',
                'role_id' => 1,
                'birthday' => '1995-01-30',
                'phone' => '0343062645',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Nguyễn Thuý Kiều đây !!!',
                'address' => '654 Trường Chinh, Phường 14, Quận Tân Bình, TPHCM',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-dep-thien-nhien.jpg'
            ],
            [
                'id' => 10,
                'username' => 'vuminhhieu',
                'email' => 'vuminhhieu@gmail.com',
                'email_verified_at' => '2023-11-29',
                'password' => Hash::make('password'),
                'firstname' => 'Hiếu',
                'lastname' => 'Vũ Minh',
                'role_id' => 1,
                'birthday' => '1999-11-06',
                'phone' => '0868289045',
                'phone_verified_at' => '2023-11-29',
                'description' => 'Xin chào mình là Vũ Minh Hiếu đây !!!',
                'address' => '321 Lạc Long Quân, Phường 3, Quận Tân Phú, TPHCM',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2020/02/hinh-anh-dep-thien-nhien.jpg'
            ],
        ]);
    }
}
