<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel; 
use App\Imports\OrdersImport;
use App\Models\UserLog;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'Orders Successfully retrived!',
            'status' => true,
            'data' => $orders
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'customer_name' => 'required|string',
            'payment_term' => 'required|string',
            'date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:date',
            'item_name' => 'required|string',
            'quantity' => 'required|integer',
            'amount' => 'required|numeric',
        ]);
        $order = Order::create($validatedData);
        UserLog::create([
            'user_id' => auth()->id(),
            'action' => 'created_order',
            'details' => 'Order ID: ' . $order->id,
        ]);
        return response()->json([
            'message' => 'Orders Successfully created!',
            'status' => true,
            'data' => $order
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return $order;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validatedData = $request->validate([
            'customer_name' => 'required|string',
            'payment_term' => 'required|string',
            'date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:date',
            'item_name' => 'required|string',
            'quantity' => 'required|integer',
            'amount' => 'required|numeric',
        ]);
        $order->update($validatedData);
        UserLog::create([
            'user_id' => auth()->id(),
            'action' => 'order_updated',
            'details' => 'Order ID: ' . $order->id,
        ]);
        return response()->json([
            'message' => 'Orders Successfully updated!',
            'status' => true,
            'data' => $order
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        UserLog::create([
            'user_id' => auth()->id(),
            'action' => 'order_deleted',
            'details' => 'Order ID: ' . $order->id,
        ]);
        return response()->json([
            'message' => 'Orders Successfully deleted!',
            'status' => true,
            'data' => $order
        ], 200);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|max:2048', 
        ]);
        Excel::import(new OrdersImport, $request->file('file'));

        UserLog::create([
            'user_id' => auth()->id(),
            'action' => 'order_import',
            'details' => 'Orders Imported',
        ]);

        return response()->json([
            'message' => 'Excel successfully imported!',
            'status' => true,
        ], 200);
    }
}
