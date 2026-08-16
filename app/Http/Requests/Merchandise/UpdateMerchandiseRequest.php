<?php

namespace App\Http\Requests\Merchandise;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMerchandiseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * 認可はコントローラ側の Gate::authorize で判定する。
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
            /** 商品名 */
            'name' => 'required|string|max:50',
            /**
             * 商品の説明
             *
             * @var string
             */
            'description' => 'nullable|string',
            /** 商品の価格 */
            'price' => 'required|numeric|min:0|max:99999999.99',
            /**
             * 商品の画像ID
             *
             * @var string
             */
            'image_id' => 'nullable|uuid|exists:images,id',
        ];
    }
}
