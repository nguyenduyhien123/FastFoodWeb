<?php

namespace App\Http\Requests;

use App\Rules\EmailRule;
use App\Rules\PhoneNumberRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Date;
use Illuminate\Validation\Rule;
class UpdateAccountRequest extends FormRequest
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
        $userId = $this->id;
        return [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => [Rule::unique('users')->ignore($userId), new PhoneNumberRule()],
            'description' => 'required|string|max:5000',
            'address' => 'required|max:255',
            'gender' => ['required',Rule::in(['Nam','Nữ'])],
            'birthday' => 'required|date|before:' . Date::now()->subYears(10)->format('Y-m-d'),
            'id' => 'required|integer|exists:users,id'
        ];
    }
    public function attributes()
    {
        return [
            'firstname' => 'Tên',
            'lastname' => 'Họ',
            'phone' => 'Số điện thoại',
            'description' => 'Mô tả',
            'avatar' => 'Ảnh đại diện',
            'gender' => 'Giới tính',
            'address' => 'Địa chỉ',
            'birthday' => 'Ngày sinh'

        ];
    }
}
