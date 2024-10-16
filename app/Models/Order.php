<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Order extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'item_name',
        'amount',
        'quantity',
        'payment_term',
        'due_date',
        'date',
    ];
}
