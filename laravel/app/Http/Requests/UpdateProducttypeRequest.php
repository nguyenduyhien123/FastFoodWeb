<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProducttypeRequest extends FormRequest
{
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
            'name' => ['required', 'string', Rule::unique('product_types')->ignore($this->producttype)],
            'image' => 'required|image|mimes:jpg,jpeg, png, bmp',
        ];
    }

    public function messages()
    {
        return [];
    }
    public function attributes()
    {
        return [
            'name' => 'Tên loại sản phẩm',
        ];
    }
}
