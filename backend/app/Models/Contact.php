<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;

    /**
     * Available columns
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
    ];
}
