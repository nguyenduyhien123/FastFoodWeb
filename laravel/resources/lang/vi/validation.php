<?php
return [
    'required' => ':attribute không được để trống.',
    'unique' => ':attribute đã tồn tại.',
    'max' => [
        'string' => ':attribute có tối đa :max ký tự.',
        'numeric' => ':attribute phải nhỏ hơn :max. ',
    ],
    'min' => [
        'string' => ':attribute có tối thiểu :min ký tự.',
        'numeric' => ':attribute phải lớn hơn hoặc bằng :min.',
    ],
    'exists' => ':attribute không tồn tại.',
    'mimes' => ':attribute phải là một tệp hợp lệ với định dạng: :values.',
    'date' => ':attribute phải đúng định dạng ngày',
    'integer' => ':attribute phải là số nguyên',
    'string' => ':attribute phải là một chuỗi',
    'before' => ':attribute phải trước ngày :date',
            'numeric' => 'The :attribute must be between :min and :max.',
            'file' => 'The :attribute must be between :min and :max kilobytes.',
            'array' => 'The :attribute must have between :min and :max items.',
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
