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
    'attributes' => [
        'name' => 'Tên sản phẩm',
        'price' => 'Giá sản phẩm',
        'category' => 'Loại sản phẩm',
        'desc' => "Mô tả sản phẩm",
        'image' => 'Hình ảnh sản phẩm'
        // Thêm các thành phần nhãn khác tại đây
    ],
];
