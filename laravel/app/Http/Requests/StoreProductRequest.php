<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreProductRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'image' => 'image|mimes:jpg,jpeg,png,bmp|max:10240',
            'price' => 'required|integer|min:1000|max:1000000000',
            'product_type_id' => 'required|integer|exists:product_types,id',
        ];
    }
    public function messages()
    {
        return [

        ];
    }
    public function attributes()
    {
        return [
            'name' => 'Tên Sản phẩm'
        ];
    }
}
