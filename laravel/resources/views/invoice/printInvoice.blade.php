@php
    use Carbon\Carbon;
@endphp
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Tangerine&display=swap" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hoá đơn</title>
    <link href="http://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
    <link href="http://fonts.googleapis.com/css2?family=Amiri&display=swap" rel="stylesheet">

    <style>
        /* body {
            font-family: 'Montserrat';        }

        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: normal;
            src: url(https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swapf) format('truetype');
        } */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');

        body {
            font-family: 'Times New Roman', Times, serif, sans-serif;
        }

        .print-invoice {
            margin: 0 auto;

        }

        .print-invoice .title {
            text-align: center;
        }
        .print-invoice h1
        {
            margin : 0px;
        }
        .print-invoice .title .code {
            /* color: red; */

        }

        .mc-invoice-group {
            display: flex;
            /* justify-content: space-between;
            gap: 20px; */
            margin-bottom: 30px;
        }

        .mc-invoice-recieved h6,
        .mc-invoice-shipment h6 {
            font-weight: 600;
            margin-bottom: 8px;
            text-transform: capitalize;
            font-size: 20px;
        }

        .mc-table-responsive {
            overflow-x: auto;
        }

        .mc-table {
            width: 100%;
            border-collapse: collapse;
        }

        table {
            caption-side: bottom;
            border-collapse: collapse;
        }

        .mc-table-head {
            border-top: 1px solid #d2cdcd;
            border-bottom: 1px solid #d2cdcd;
        }

        .mc-table th,
        .mc-table td,
        .mc-table p {
            font-size: 11px !important;
        }

        tbody,
        td,
        tfoot,
        th,
        thead,
        tr {
            border-color: inherit;
            border-style: solid;
            border-width: 0;
        }
        tr td:first-child, tr th:first-child
        {
            width: 5px;
        }
        tr td:nth-child(2), tr th:nth-child(2)
        {
            width: 200px;
        }
        .mc-table-head tr th {
            max-width: 120px;
            min-width: -moz-fit-content;
            min-width: fit-content;
            padding: 15px 15px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            border-right: 1px solid #d2cdcd;
            border-left: 1px solid #d2cdcd;

        }

        .mc-table-body tr td {
            min-width: -moz-fit-content;
            min-width: fit-content;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 15px 15px;
            font-size: 14px;
            font-weight: 400;
            border-right: 1px solid #d2cdcd;
            border-bottom: 1px solid #d2cdcd;
            border-left: 1px solid #d2cdcd;
        }

        tbody,
        td,
        tfoot,
        th,
        thead,
        tr {
            border-color: inherit;
            border-style: solid;
            border-width: 0;
        }

        .mc-table-product {
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 0px 8px;
        }

        .mc-table-product.sm img {
            width: 50px;
            height: 50px;
        }

        .mc-table-product img {
            width: 100px;
            height: 100px;
            flex-shrink: 0;
            border-radius: 8px;
            object-fit: cover;
            border: 1px solid #d2cdcd;
            box-shadow: 0px 7px 15px 0px rgba(var(--blackRGB), 6%);
        }

        .mc-table-product p {
            font-size: 13px;
            line-height: 18px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .mc-table .total_price {
            font-weight: bold
        }

        .mc-table .total_invoice {
            font-weight: bolder;
            font-size: 11px !important;
            color: #f0002a;
        }

        .hello {
            margin-top: 40px;
            text-align: center;
            text-transform: uppercase
        }
    </style>
</head>

<body>
    <div class="print-invoice">
        <h1 class="title">HOÁ ĐƠN</h1>
            <div class="mc-invoice-recieved">
                <h1>Thông tin người nhận</h1>
                <div>Họ tên : {{ $invoice->user->fullname }}</div>
                <div>Địa chỉ email : {{ $invoice->user->email }}</div>
                <h1>Thông tin đơn hàng</h1>
                <div>Đơn hàng : <span class="code">{{$invoice->code}}</span></div>
                <div>Ngày đặt hàng : {{ Carbon::createFromTimestamp($invoice->created_at/1000)->format('d-m-Y H:i:s') }}</div>
                <div>Địa chỉ nhận hàng : {{ $invoice->address }}</div>
                <div>Ghi chú : {{ $invoice->note }}</div>
                <div>Phương thức thanh toán : {{ $invoice->paymentMethod->name }}</div>
                <div>Trạng thái thanh toán : {{ $invoice->paid_at ? 'Đã thanh toán' : 'Chưa thanh toán' }}</div>
            </div>

        <div class="mc-invoice-shipment">

        </div>
        <div class="mc-table-responsive">
            <table class="mc-table">
                <thead class="mc-table-head">
                    <tr>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody class="mc-table-body">
                    @foreach ($invoice->invoiceDetail as $item)                  
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>
                            {{ $item->product->name }}
                        </td>
                        <td>{{ $item->price }}</td>
                        <td>{{ $item->quantity}}</td>
                        <td class="total_price">{{ $item->total}}</td>
                    </tr>
                    @endforeach
                    <tr>
                        <td colspan="3">

                        </td>
                        <td>
                            Tổng cộng
                        </td>
                        <td class="fw-bold total_invoice">
                            {{ $invoice->total_price }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2 class="hello">Cảm ơn quý khách đã ủng hộ !!</h2>
    </div>
</body>

</html>
