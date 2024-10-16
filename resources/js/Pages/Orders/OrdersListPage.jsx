import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import OrderForm from "./OrderForm";

function OrdersListPage() {
    const [openForm, setOpenForm] = useState(false);
    const [orders, setOrders] = useState([]);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleEdit = (item) => {
        setEditData(item);
        setOpenForm(true);
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        Orders
                        <Button
                            variant="success"
                            onClick={() => handleOpenForm()}
                        >
                            Create Order
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Payment Term</th>
                                <th>Due Date</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders &&
                                orders?.length > 0 &&
                                orders.map((item, key) => (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{item?.customer_name ?? "-"}</td>
                                        <td>{item?.date ?? "-"}</td>
                                        <td>{item?.payment_term ?? "-"}</td>
                                        <td>{item?.due_date ?? "-"}</td>
                                        <td>{item?.item_name ?? "-"}</td>
                                        <td>{item?.quantity ?? "-"}</td>
                                        <td>{item?.amount ?? "-"}</td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <Button
                                                    variant="info"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button variant="danger">
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <OrderForm
                show={openForm}
                getData={fetchOrders}
                onHide={handleCloseForm}
                editData={editData}
            />
        </>
    );
}

export default OrdersListPage;
