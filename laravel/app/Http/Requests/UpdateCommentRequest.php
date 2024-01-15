<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommentRequest extends FormRequest
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
            'user_id' => 'required|integer|exists:users,id',
            'product_id' => 'required|integer|exists:products,id',
            'comment_id' => "nullable|integer|exists:comments,id",
            'image' => 'image|mimes:jpg,jpeg,png,bmp|max:10240',
            'content' => 'required|string|max:10000',
            'path' => 'required|string',
        ];
    }
    public function attributes()
    {
        return ['name' => 'Bình luận'];
    }
}
