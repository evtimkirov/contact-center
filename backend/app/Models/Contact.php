<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * Change all the columns with dates - created_at, updated_at, etc.
     *
     * @param Carbon $date
     * @return string
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }

    /**
     * One-to-many relationship with the interactions
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function interactions(): HasMany
    {
        return $this->hasMany(Interaction::class);
    }
}
