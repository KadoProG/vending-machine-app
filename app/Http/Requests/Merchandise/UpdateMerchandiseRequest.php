<?php

namespace App\Http\Requests\Merchandise;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
             * 商品の画像ID。空文字を指定すると画像を解除する
             *
             * @var string
             */
            'image_id' => [
                'nullable',
                'uuid',
                // 他人がアップロードした画像は指定できない。指定できると、
                // その画像を含む商品を公開することで他人の非公開画像を
                // 閲覧可能にできてしまうため
                Rule::exists('images', 'id')->where('author_id', $this->user()?->id),
            ],
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * 画像の解除は空文字で表現される。そのままでは uuid の検証に通らないため
     * null へ変換する。
     */
    protected function prepareForValidation(): void
    {
        if ($this->input('image_id') === '') {
            $this->merge(['image_id' => null]);
        }
    }
}
