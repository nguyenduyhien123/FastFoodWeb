<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneNumberRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Sử dụng biểu thức chính quy để xác thực định dạng số điện thoại
        if (!preg_match('/^(0)[0-9]{9}$/', $value)) {
            $fail("Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số.");
        }    
    }
}
