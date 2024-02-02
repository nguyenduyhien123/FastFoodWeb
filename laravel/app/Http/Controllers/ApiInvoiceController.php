<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Models\Cart;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\InvoiceTrack;
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
        $invoices = Invoice::with('user', 'paymentMethod', 'lastStatus.invoiceStatus', 'invoiceTracks')->get();
        return $invoices;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        try {
            DB::transaction(function () use ($request,) {
                function generateCode()
                {
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
                    // 'invoice_status_id' => 1,
                    'paid_at' => null,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
                $carts = Cart::with('product')->where('user_id', $request->user->id)->get();
                $totalInvoice = 0;
                foreach ($carts as $cart) {
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
                // Tạo track cho hoá đơn
                InvoiceTrack::create([
                    'invoice_id' =>  $invoice->id,
                    'invoice_status_id' => 1,
                    'description' => "Đơn hàng $code đã đặt",
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
                // Xoá giỏ hàng
                Cart::where('user_id', $request->user->id)->delete();;
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

        $invoices = Invoice::with('user', 'paymentMethod', 'invoiceDetail.product', 'lastStatus.invoiceStatus', 'invoiceTracks')->find($id);
        if (!empty($invoices)) {
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
    public function getInvoiceByStatus(Request $request)
    {
        if ($request->status_id) {
            // $invoices = Invoice::whereIn('id', function ($query) use ($request) {
            //     $query->select('invoice_id')
            //         ->from('invoice_tracks')
            //         ->whereIn('invoice_status_id', [$request->status_id])
            //         ->groupBy('invoice_id')
            //         ->havingRaw('MAX(created_at)');
            // })->get();

            // return $invoices;
            // $invoices = Invoice::whereHas('lastStatus', function ($query) use($request) {
            //     $query->where('invoice_status_id', $request->status_id);
            // })->get();
            $statusId = $request->status_id; // Trạng thái được truyền vào
            $invoices = Invoice::with(['user', 'paymentMethod', 'invoiceTracks', 'lastStatus'])
            ->whereHas('invoiceTracks', function ($query) use($statusId) {
                $query->where('invoice_status_id',$statusId)
                      ->whereRaw('invoice_tracks.id = (SELECT MAX(id) FROM invoice_tracks WHERE invoice_tracks.invoice_id = invoices.id)');
            })
            ->get();
        
        return $invoices;
//         $invoices = Invoice::with(['user', 'paymentMethod', 'invoiceTracks'])
//     ->whereHas('lastStatus', function ($query) {
//         $query->where('invoice_status_id', 2);
//     })
//     ->get();

// return $invoices;
        
        }
        return response()->json(['message' => 'Không hợp lệ']);
    }
}
