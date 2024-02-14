<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceTrackRequest;
use App\Models\Invoice;
use App\Models\InvoiceStatus;
use App\Models\InvoiceTrack;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class ApiInvoiceTrackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        $invoice_tracks = InvoiceTrack::all();
        return $invoice_tracks;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceTrackRequest $request)
    {
        InvoiceTrack::create([
            'invoice_id' => $request->invoice_id,
            'invoice_status_id' => $request->invoice_status_id,
            'description' => $this->generateDescriptionInvoiceTrack($request->invoice_id, $request->invoice_status_id)
        ]);
        return response()->json(['message' => 'Cập nhật trạng thái thành công']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function generateDescriptionInvoiceTrack($invoice_id, $invoice_status_id)
    {
        $invoice_status = InvoiceStatus::find($invoice_status_id);
        $invoice = Invoice::find($invoice_id);
        $desc = "Đơn hàng $invoice->code ";
        $desc.= Str::lower($invoice_status->name_vi);
        return $desc;
    }
}
