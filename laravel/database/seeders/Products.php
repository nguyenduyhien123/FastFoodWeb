<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Goutte\Client;
class Products extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function crawlBurger(){
        $client = new client();
        $crawler = $client -> request('GET', 'https://burgerking.vn/menu/ala-carte.html');

        $data = $crawler -> filter('.product-item')->each(function ($node){
            return [
                'name' => $node -> filter('.product-title')->text(),
                'price' => $this->convertCurrencyToInteger($node -> filter('.product-price')->text()),
                'des' => $node -> filter('.describe')->text(),
                'img' => $node -> filter('.product-img img')->attr('src'),
            ];
        });
        return $data;
    }

    function convertCurrencyToInteger($amount)
    {
        // Loại bỏ ký tự "VND" trong số tiền
        $amount = str_replace(' VND', '', $amount);

        // Loại bỏ dấu chấm phẩy (,) trong số tiền
        $amount = str_replace(',', '', $amount);

        // Chuyển đổi số tiền thành kiểu số nguyên
        $integerAmount = (int)$amount;

        return $integerAmount;
    }
    public function run(): void
    {
        $crawlData = $this->crawlBurger();
        foreach($crawlData as $product)
        {
            $image = json_encode([$product['img']], JSON_FORCE_OBJECT);
            Product::create(['name'=> $product['name'], 'price' => $product['price'], 'description' => $product['des'], 'image' => $image] );
        }
    }

}
