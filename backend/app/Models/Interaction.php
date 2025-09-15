<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Interaction extends Model
{
    use HasFactory;

    /**
     * Available columns
     *
     * @var string[]
     */
    protected $fillable = [
        'type',
        'timestamp',
        'note',
    ];


    /**
     * Change all the columns with dates - created_at, updated_at, etc.
     *
     * @param \DateTimeInterface $date
     * @return string
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }
}
