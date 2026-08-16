<?php

namespace App\Http\Requests\Image;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * 認証は auth:sanctum ミドルウェアで担保する。
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            /** アップロードする画像ファイル */
            'file' => 'required|file|image|mimes:jpg,jpeg,png,webp|max:5120',
            /**
             * 画像のタイトル。省略した場合はファイル名から補完する
             *
             * @var string
             */
            'name' => 'nullable|string|max:50',
            /**
             * 代替テキスト
             *
             * @var string
             */
            'alt' => 'nullable|string|max:50',
            /**
             * 画像の詳細説明
             *
             * @var string
             */
            'description' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.max' => '画像は5MB以内でアップロードしてください。',
            'file.mimes' => '画像は jpg, jpeg, png, webp のいずれかでアップロードしてください。',
        ];
    }
}
