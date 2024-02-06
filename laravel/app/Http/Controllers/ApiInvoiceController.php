<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Models\Cart;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\InvoiceTrack;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\View;
use TCPDF;

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
            $invoice_code = '';
            DB::transaction(function () use ($request, &$invoice_code) {
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
                $invoice_code = $code;
                $invoice = Invoice::create([
                    'user_id' => $request->user->id,
                    'payment_method_id' => $request->payment_method_id,
                    'code' => $code,
                    'total_price' => 0,
                    'address' => $request->address,
                    'note' => $request->note,
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
                Cart::where('user_id', $request->user->id)->delete();
            });
            return response()->json(['message' => 'Tạo đơn hàng thành công', 'code' => $invoice_code]);
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
            $invoices = Invoice::with(['user', 'paymentMethod', 'invoiceTracks', 'lastStatus.invoiceStatus'])
                ->whereHas('invoiceTracks', function ($query) use ($statusId) {
                    $query->where('invoice_status_id', $statusId)
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
    public function getInvoiceByUser(Request $request)
    {
        $queryInvoice = Invoice::with(['user', 'paymentMethod', 'lastStatus.invoiceStatus', 'invoiceTracks'])->whereHas('user', function ($query) use ($request) {
            $query->where('id', $request->user->id);
        });
        // Lấy các đơn hàng theo người dùng
        // Nếu có status_id thì lọc theo trạng thái đơn hàng, các trạng thái từ 1 đến 5
        if ($request->status_id != 0) {
            $statusId = $request->status_id; // Trạng thái được truyền vào
            $queryInvoice->whereHas('user', function ($query) use ($request) {
                $query->where('id', $request->user->id);
            })->whereHas('invoiceTracks', function ($query) use ($statusId) {
                $query->where('invoice_status_id', $statusId)
                    ->whereRaw('invoice_tracks.id = (SELECT MAX(id) FROM invoice_tracks WHERE invoice_tracks.invoice_id = invoices.id)');
            });
        }
        // Nếu mà không có trạng thái đơn hàng
        // else
        // {
        //     $invoices = Invoice::with(['user', 'paymentMethod', 'lastStatus.invoiceStatus', 'invoiceTracks'])->whereHas('user', function ($query) use ($request) {
        //         $query->where('id', $request->user->id);
        //     })->get();
        //     return $invoices;
        // }
        if($request->code)
        {
            $queryInvoice->where('code', $request->code);
        }
        $invoices = $queryInvoice->get();
        return $invoices;
    }
    public function getInvoiceByUserAndCode(Request $request)
        {
            $request->validate([
                'code' => 'required|exists:invoices,code'
            ]);
            $invoice = Invoice::with(['user', 'paymentMethod','invoiceDetail.product', 'lastStatus.invoiceStatus', 'invoiceTracks'])->where('code', $request->code)->whereHas('user', function ($query) use ($request) {
                $query->where('id', $request->user->id);
            })->first();
            return $invoice;
        }
    public function printInvoice(Request $request){
        try {
            $validator = $this->validate($request, [
                'code' => 'required|exists:invoices,code'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        }
        // Truy vấn lấy hoá đơn
        $invoice = Invoice::with(['user', 'paymentMethod','invoiceDetail.product', 'lastStatus.invoiceStatus', 'invoiceTracks'])->where('code', $request->code)->first();
        if(!empty($invoice))
        {
        $pdf = new TCPDF();
        $code = $invoice->code;
        $time = Carbon::now()->format('dmYHis');
        $pdf->SetCreator('Your Name');
        $pdf->SetAuthor('Your Name');
        $pdf->SetTitle("HOADON_$code"."_$time.pdf");
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $pdf->setFontSubsetting(false);
        // $pdf->SetFont('freesans', '', 10, '', false);
        $pdf->SetFont('dejavusans', '', 10, '', false);
        $html = view('invoice.printInvoice', ['invoice' => $invoice])->render();
        $pdf->AddPage();
        $pdf->writeHTML($html, true, false, true, false, '');

        return $pdf->Output("HOADON_$code"."_$time.pdf", 'I');
        }
        return response()->json(['message' => 'Không tồn tại hoá đơn trên']);
    }
}
