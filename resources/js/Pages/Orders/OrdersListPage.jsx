import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function OrdersListPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("/orders");
            console.log(response, "hi");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    return (
        <Card>
            <Card.Header>Orders</Card.Header>
        </Card>
    );
}

export default OrdersListPage;
