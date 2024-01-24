<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Models\Cart;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ApiInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::with('user','paymentMethod')->get();
        return $invoices;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        try {
            DB::transaction(function () use($request,){
                function generateCode(){
                    // Lấy ngày hiện tại
                    $currentDate = Carbon::now()->format('ymd');

                    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $charactersLength = strlen($characters);
                    $randomString = '';
                
                    for ($i = 0; $i < 10; $i++) {
                        $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
                    }

                    // Kết hợp ngày và chuỗi ngẫu nhiên để tạo mã đơn hàng
                    $orderCode = $currentDate . $randomString;
                    return $orderCode;
                }
                $code = '';
                do {
                    $code = generateCode();
                } while (Invoice::where('code', $code)->exists());            
                $invoice = Invoice::create([
                    'user_id' => $request->user->id,
                    'payment_method_id' => $request->payment_method_id,
                    'code' => $code,
                    'total_price' => 0,
                    'address' => $request->address,
                    'status' => 'Chờ duyệt',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
                $carts = Cart::with('product')->where('user_id',$request->user->id)->get();
                $totalInvoice = 0;
                foreach($carts as $cart)
                {
                    $totalInvoiceDetail = $cart->quantity * $cart->product->price;
                    $totalInvoice += $totalInvoiceDetail;
                    $invoiceDetail = InvoiceDetail::create([
                        'invoice_id' => $invoice->id,
                        'product_id' => $cart->product->id,
                        'quantity' => $cart->quantity,
                        'price' => $cart->product->price,
                        'total' => $totalInvoiceDetail,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]);
                }
                $invoice->total_price = $totalInvoice;
                $invoice->save();               
            });
            return response()->json(['Tạo hoá đơn thành công']);
        } catch (\Exception $e) {
            // Xử lý lỗi
            echo 'Lỗi: ' . $e->getMessage();
            return response()->json(['Tạo hoá đơn thất bại'], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $invoices = Invoice::with('user','paymentMethod', 'invoiceDetail.product')->where('id', $id)->get();
        if(!empty($invoices))
        {
            return $invoices;
        }
        return response()->json(['message' => 'Không tìm thấy hoá đơn'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

}
