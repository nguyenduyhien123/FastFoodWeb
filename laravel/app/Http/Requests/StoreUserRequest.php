<?php

namespace App\Http\Requests;

use App\Rules\EmailRule;
use App\Rules\PhoneNumberRule;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Date;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserRequest extends FormRequest
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
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => ['required', new EmailRule()],
            'phone' => ['required', new PhoneNumberRule()],
            'description' => 'required|string|max:5000',
            'address' => 'required|max:255',
            'birthday' => 'required|date|before:' . Date::now()->subYears(10)->format('Y-m-d'),
            'role_id' => ['required','exists:roles,id' ,'not_in:3'],
            'password' => 'required|min:6|max:60',
            'avatar' => ['required', 'mimes:png,jpg,gif,jpeg']
        ];
    }
    public function attributes()
    {
        return [
            'firstname' => 'Tên',
            'lastname' => 'Họ',
            'email' => 'Email',
            'phone' => 'Số điện thoại',
            'description' => 'Mô tả',
            'avatar' => 'Ảnh đại diện',
            'address' => 'Địa chỉ',
            'role_id' => 'Quyền',
            'birthday' => 'Ngày sinh',
            'password' => 'Mật khẩu'
        ];
    }
}
