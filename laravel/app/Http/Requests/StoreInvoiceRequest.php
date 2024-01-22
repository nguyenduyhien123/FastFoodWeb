<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class StoreInvoiceRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'staff_id' => 'nullable|exists:users,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'total_price' => 'required|integer',
            'address' => 'required|max:255',
        ];
    }
    public function attributes()
    {
        return [
            'payment_method_id' => 'Phương thức thanh toán',
            'total_price' => 'Tổng tiền',
            'address' => 'Địa chỉ'
        ];
    }
}
