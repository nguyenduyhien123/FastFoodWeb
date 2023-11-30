<?php

namespace Database\Seeders;

use App\Models\Product;
use Goutte\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    function convertCurrencyToInteger($amount)
    {
        // Loại bỏ ký tự "VND" trong số tiền
        $amount = str_replace(' VND', '', $amount);

        // Loại bỏ dấu chấm phẩy (,) trong số tiền
        $amount = str_replace(',', '', $amount);

        // Chuyển đổi số tiền thành kiểu số nguyên
        $integerAmount = (int) $amount;

        return $integerAmount;
    }

    public function scrapeAll()
    {
        //craw data category
        $array_category = ['burger', 'value-meals', 'ga-ran', 'com-vua', 'mon-an-kem', 'thuc-uong'];

        $url_main = "https://burgerking.vn/menu/";
        $client = new Client();
        $data = [];
        foreach ($array_category as $category) {
            //MODEL $CATEGPRY
            $crawler = $client->request('GET', 'https://burgerking.vn/menu/' . $category . ".html");

            switch ($category) {
                case 'burger': {
                        $data[] = $crawler->filter('.product-item')->each(function ($node) {
                            return [
                                'name' => $node->filter('.product-title')->text(),
                                'price' => $this->convertCurrencyToInteger($node->filter('.product-price')->text()),
                                'des' => $node->filter('.describe')->text(),
                                'img' => $node->filter('.product-img img')->attr('src'),
                                'product_type_id' => 1,
                            ];
                        });
                        break;
                    }

                case 'value-meals': {
                        $data[] = $crawler->filter('.product-item')->each(function ($node) {
                            return [
                                'name' => str_replace("'", " ", $node->filter('.product-title')->text()),
                                'price' => $this->convertCurrencyToInteger($node->filter('.product-price')->text()),
                                'des' => $node->filter('.describe')->text(),
                                'img' => $node->filter('.product-img img')->attr('src'),
                                'product_type_id' => 2,
                            ];
                        });
                        break;
                    }

                case 'ga-ran': {
                        $data[] = $crawler->filter('.product-item')->each(function ($node) {
                            return [
                                'name' => $node->filter('.product-title')->text(),
                                'price' => $this->convertCurrencyToInteger($node->filter('.product-price')->text()),
                                'des' => $node->filter('.describe')->text(),
                                'img' => $node->filter('.product-img img')->attr('src'),
                                'product_type_id' => 3,
                            ];
                        });
                        break;
                    }
                case 'com-vua': {
                        $data[] = $crawler->filter('.product-item')->each(function ($node) {
                            return [
                                'name' => $node->filter('.product-title')->text(),
                                'price' => $this->convertCurrencyToInteger($node->filter('.product-price')->text()),
                                'des' => $node->filter('.describe')->text(),
                                'img' => $node->filter('.product-img img')->attr('src'),
                                'product_type_id' => 4,
                            ];
                        });
                        break;
                    }
                case 'mon-an-kem': {
                        $data[] = $crawler->filter('.product-item')->each(function ($node) {
                            return [
                                'name' => $node->filter('.product-title')->text(),
                                'price' => $this->convertCurrencyToInteger($node->filter('.product-price')->text()),
                                'des' => $node->filter('.describe')->text(),
                                'img' => $node->filter('.product-img img')->attr('src'),
                                'product_type_id' => 5,
                            ];
                        });
                        break;
                    }
                case 'thuc-uong': {
                        $data[] = $crawler->filter('.product-item')->each(function ($node) {
                            return [
                                'name' => $node->filter('.product-title')->text(),
                                'price' => $this->convertCurrencyToInteger($node->filter('.product-price')->text()),
                                'des' => $node->filter('.describe')->text(),
                                'img' => $node->filter('.product-img img')->attr('src'),
                                'product_type_id' => 6,
                            ];
                        });
                        break;
                    }
            }
            //luu san pham
        }
        return $data;
    }
    public function run(): void
    {
        $crawlData = $this->scrapeAll();
        foreach ($crawlData as $productArray) {
            foreach ($productArray as $product) {
                $num = Product::where('name', $product['name'])->count();
                if ($num == 0) {
                    $image = json_encode([$product['img']], JSON_FORCE_OBJECT);
                    Product::create(['name' => $product['name'], 'price' => $product['price'], 'description' => $product['des'], 'image' => $image, 'product_type_id' => $product['product_type_id']]);
                }

            }
        }
    }
}
