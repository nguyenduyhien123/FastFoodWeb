<?php
return [
    'required' => ':attribute không được để trống.',
    'unique' => ':attribute đã tồn tại.',
    'max' => [
        'string' => ':attribute không được vượt quá :max ký tự.',
    ],
    'min' => [
        'numeric' => ':attribute phải lớn hơn hoặc bằng :min.',
    ],
    'exists' => ':attribute không tồn tại.',
    'mimes' => ':attribute phải là một tệp hợp lệ với định dạng: :values.',
    'date' => ':attribute phải đúng định dạng ngày',
    'integer' => ':attribute phải là số nguyên',
    'string' => ':attribute phải là một chuỗi',
    'before' => ':attribute phải trước ngày :date',
    'attributes' => [
        'name' => 'Tên sản phẩm',
        'price' => 'Giá sản phẩm',
        'category' => 'Loại sản phẩm',
        'desc' => "Mô tả sản phẩm",
        'image' => 'Hình ảnh sản phẩm',
        'percentage' => "Phần trăm",
        'start_date' => "Ngày bắt đầu",
        'end_date' => "Ngày kết thúc",
        'order' => 'thứ tự',
        'avatar' => 'Ảnh đại diện'
        // Thêm các thành phần nhãn khác tại đây
    ],
];
