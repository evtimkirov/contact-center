<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactValidation extends FormRequest
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
                'sometimes',
                'string',
                'min:2',
                'max:100',
            ],
            'email' => [
                'sometimes',
                'string',
                'email:rfc,dns',
                'max:150',
                'unique:contacts,email,' . $this->route('contact'),
            ],
            'phone' => [
                'sometimes',
                'string',
                'regex:/^\+?[0-9\s\-]{7,20}$/',
            ],
            'company' => [
                'sometimes',
                'string',
                'max:150',
            ],
        ];
    }
}
