<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class AccountChangePasswordRequest extends FormRequest
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
            'password_old' => 'required|string',
            'password' => 'string|required|confirmed|min:6|max:40',
        ];
    }
    public function messages()
    {
        return [
            'password.confirmed' => 'Mật khẩu không trùng khớp.'
        ];
    }
    public function attributes()
    {
        return [
            'password' => 'Mật khẩu',
            'password_old' => 'Mật khẩu cũ'
        ];
    }
}
