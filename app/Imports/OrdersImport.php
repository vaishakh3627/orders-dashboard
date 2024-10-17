<?php

namespace App\Imports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OrdersImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Order([
            'customer_name' => $row['customer_name'],
            'payment_term' => $row['payment_term'],
            'date' => \Carbon\Carbon::parse($row['date']),
            'due_date' => \Carbon\Carbon::parse($row['due_date']),
            'item_name' => $row['item_name'],
            'quantity' => $row['quantity'],
            'amount' => $row['amount'],
        ]);
    }
}
