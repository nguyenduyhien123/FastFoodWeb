<?php

namespace App\Http\Requests;

use App\Rules\EmailRule;
use App\Rules\PhoneNumberRule;
use Faker\Provider\vi_VN\PhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class RegisterUserRequest extends FormRequest
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
            'firstname' => 'required|string|min:1|max:40',
            'lastname' => 'required|string|min:1|max:20',
            'email' => ['required', new EmailRule(),'unique:users,email'],
            'phone' => ['required', new PhoneNumberRule(),'unique:users,phone'],
            'password' => 'required|min:6|max:30'
        ];
    }
    public function messages()
    {
        return [
            'email.email' => 'Định dạng email không hợp lệ'
        ];
    }
    public function attributes()
    {
        return [
            'firstname' => 'Họ và tên đệm',
            'lastname' => 'Tên',
            'email' => 'Email',
            'phone' => 'Số điện thoại',
            'password' => 'Mật khẩu'
        ];
    }
}
