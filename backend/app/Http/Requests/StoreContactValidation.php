<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactValidation extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:100',
            ],
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:150',
                'unique:contacts,email',
            ],
            'phone' => [
                'required',
                'string',
                'regex:/^\+?[0-9\s\-]{7,20}$/',
            ],
            'company' => [
                'required',
                'string',
                'max:150',
            ],
        ];
    }
}
