<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Product;
use App\Models\Rate;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ApiAnalysisController extends Controller
{
    //
    public function getTotalUsers(){
        $count = User::count();
        return response()->json(['count' => $count]);
    }
    public function index(){
        // Lấy ra ngày tháng hiện tại
        $timeNow = Carbon::now();
        $timeLastMonth = $timeNow->copy()->subMonth();
        // Tài khoản
        $countUser = User::count();
        $countUserNowMonth = User::whereMonth('created_at', $timeNow->month)->whereYear('created_at', $timeNow->year)->count();
        $countUserLastMonth = User::whereMonth('created_at', $timeLastMonth->month)->whereYear('created_at', $timeLastMonth->year)->count();
        $percentageIncreaseUser = 0;
        if($countUserLastMonth != 0 )
        {
        $percentageIncreaseUser = ($countUserNowMonth - $countUserLastMonth) / $countUserLastMonth * 100;
        }
        else if($countUserNowMonth == 0)
        {
            $percentageIncreaseUser = 0;
        }
        else 
        {
            $percentageIncreaseUser = 100; 
        }
        // Đơn hàng
        $countOrder = Invoice::count();
        $countOrderNowMonth = Invoice::whereMonth('created_at', $timeNow->month)->whereYear('created_at', $timeNow->year)->count();
        $countOrderLastMonth = Invoice::whereMonth('created_at', $timeLastMonth->month)->whereYear('created_at', $timeLastMonth->year)->count();
        $percentageIncreaseOrder = 0;
        if($countOrderLastMonth != 0 )
        {
        $percentageIncreaseOrder = ($countOrderNowMonth - $countOrderLastMonth) / $countOrderLastMonth * 100;
        }
        else if($countOrderNowMonth == 0)
        {
            $percentageIncreaseOrder = 0;
        }
        else 
        {
            $percentageIncreaseOrder = 100; 
        }
        // Sản phẩm
        $countProduct = Product::count();
        $countProductNowMonth = Product::whereMonth('created_at', $timeNow->month)->whereYear('created_at', $timeNow->year)->count();
        $countProductLastMonth = Product::whereMonth('created_at', $timeLastMonth->month)->whereYear('created_at', $timeLastMonth->year)->count();
        $percentageIncreaseProduct = 0;
        if($countProductLastMonth != 0 )
        {
        $percentageIncreaseProduct = ($countProductNowMonth - $countProductLastMonth) / $countProductLastMonth * 100;
        }
        else if($countProductNowMonth == 0)
        {
            $percentageIncreaseProduct = 0;
        }
        else 
        {
            $percentageIncreaseProduct = 100; 
        }
        // Đánh giá
        $countRate = Rate::count();
        $countRateNowMonth = Rate::whereMonth('created_at', $timeNow->month)->whereYear('created_at', $timeNow->year)->count();
        $countRateLastMonth = Rate::whereMonth('created_at', $timeLastMonth->month)->whereYear('created_at', $timeLastMonth->year)->count();
        $percentageIncreaseRate = 0;
        if($countRateLastMonth != 0 )
        {
        $percentageIncreaseRate = ($countRateNowMonth - $countRateLastMonth) / $countRateLastMonth * 100;
        }
        else if($countRateNowMonth == 0)
        {
            $percentageIncreaseRate = 0;
        }
        else 
        {
            $percentageIncreaseRate = 100; 
        }
        return response()->json([
            'countUser' => $countUser,
            'countOrder' => $countOrder,
            'countProduct' => $countProduct,
            'countRate' => $countRate,
            'percentageIncreaseUser' => $percentageIncreaseUser,
            'percentageIncreaseOrder' => $percentageIncreaseOrder,
            'percentageIncreaseProduct' => $percentageIncreaseProduct,
            'percentageIncreaseRate' => $percentageIncreaseRate
        ]);
    }
}
