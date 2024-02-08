<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceTrack;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use PayOS\PayOS;

class ApiPaymentController extends Controller
{
    private string $payOSClientId;
    private string $payOSApiKey;
    private string $payOSChecksumKey;

    public function __construct()
    {
        $this->payOSClientId = env("PAYOS_CLIENT_ID");
        $this->payOSApiKey = env("PAYOS_API_KEY");
        $this->payOSChecksumKey = env("PAYOS_CHECKSUM_KEY");
    }
    // Lấy thông tin thanh toán
    // id : có thể là mã đơn hàng hoặc là mã link thanh toán
    public function getPaymentLinkInfoOfOrder(string $id)
    {
        $payOS = new PayOS($this->payOSClientId, $this->payOSApiKey, $this->payOSChecksumKey);
        try {
            $response = $payOS->getPaymentLinkInfomation($id);
            return response()->json([
                "error" => 0,
                "message" => "Success",
                "data" => $response
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "error" => $th->getCode(),
                "message" => $th->getMessage(),
                "data" => null
            ]);
        }
    }
    public function cancelPaymentLinkOfOrder(Request $request, string $id)
    {
        $body = json_decode($request->getContent(), true);
        $payOS = new PayOS($this->payOSClientId, $this->payOSApiKey, $this->payOSChecksumKey);
        try {
            $cancelBody = is_array($body) && $body["cancellationReason"] ? $body : null;
            $response = $payOS->cancelPaymentLink($id, $cancelBody);
            return response()->json([
                "error" => 0,
                "message" => "Success",
                "data" => $response["data"]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "error" => $th->getCode(),
                "message" => $th->getMessage(),
                "data" => null
            ]);
        }
    }
    // Xử lý khi thanh toán thành công
    public function paymentSuccess(Request $request)
    {
        if ($request->codeInvoice) {
            $code = $request->codeInvoice;
            $invoice = Invoice::where('code', $code)->first();
            $invoice->paid_at = Carbon::now();
            $invoice->save();
            return redirect("http://localhost:3000/accounts/manage-order/$code");
        }
    }
    // Xử lý khi thanh toán thất bại
    public function paymentFail(Request $request)
    {

        if ($request->codeInvoice) {
            $code = $request->codeInvoice;
            $invoice = Invoice::where('code', $code)->first();
            InvoiceTrack::create([
                'invoice_id' =>  $invoice->id,
                'invoice_status_id' => 5,
                'description' => "Đơn hàng $code đã huỷ",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
            return redirect("http://localhost:3000/accounts/manage-order/$code");
        }
    }
    // Tạo link thanh toán
    public function createPaymentLink($data)
    {
        // tạo mã đơn hàng ngẫu nhiên 9 chữ số
        $data['orderCode'] = intval(substr(strval(Carbon::now()->getTimestampMs() * mt_rand(2, 99) * mt_rand(2, 99)), -9));
        error_log($data['orderCode']);
        $PAYOS_CLIENT_ID = env('PAYOS_CLIENT_ID');
        $PAYOS_API_KEY = env('PAYOS_API_KEY');
        $PAYOS_CHECKSUM_KEY = env('PAYOS_CHECKSUM_KEY');
        $payOS = new PayOS($PAYOS_CLIENT_ID, $PAYOS_API_KEY, $PAYOS_CHECKSUM_KEY);
        // Số lần thử
        $maxAttempts = 5;
        $attempts = 0;
        do {
            try {
                $response = $payOS->createPaymentLink($data);
                return $response['checkoutUrl'];
                // $response = $payOS->getPaymentLinkInfomation($data['orderCode']);
                // return $response;
            } catch (\Throwable $th) {
                $data['orderCode'] = intval(substr(strval(Carbon::now()->getTimestampMs() * mt_rand(2, 99) * mt_rand(2, 99)), -9));
                $attempts++;
            }
        } while ($attempts < $maxAttempts);
        return response()->json(['message' => 'Thanh toán đang gặp vấn đề kỹ thuật, vui lòng thử lại sau'], 500);
    }
}
