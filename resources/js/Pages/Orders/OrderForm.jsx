import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

function OrderForm({ show, getData, onHide, editData }) {
    const [formData, setFormData] = useState({});

    const handleFieldChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        axios
            .post("orders", formData)
            .then((res) => {
                if (res) {
                    getData();
                    setFormData({});
                    onHide();
                }
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    };

    useEffect(() => {
        if (editData) {
            console.log(editData);
            setFormData({
                customer_name: editData?.customer_name,
                date: editData?.date,
                payment_term: editData?.payment_term,
                due_date: editData?.due_date,
                item_name: editData?.item_name,
                amount: editData?.amount,
                quantity: editData?.quantity,
            });
        }
    }, [editData]);

    return (
        <Modal show={show}>
            <Modal.Title className="p-3">Create Order</Modal.Title>
            <Modal.Body className="p-3">
                <Row>
                    <Col xs={6}>
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control
                            name="customer_name"
                            value={FormData.customer_name}
                            onChange={(e) => handleFieldChange(e)}
                            type="text"
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Label>Payment Term</Form.Label>
                        <Form.Control
                            name="payment_term"
                            value={FormData.peyment_term}
                            onChange={(e) => handleFieldChange(e)}
                            type="text"
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            name="date"
                            value={FormData.date}
                            onChange={(e) => handleFieldChange(e)}
                            type="date"
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            name="due_date"
                            value={FormData.due_date}
                            onChange={(e) => handleFieldChange(e)}
                            type="date"
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            name="item_name"
                            value={FormData.item_name}
                            onChange={(e) => handleFieldChange(e)}
                            type="text"
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            name="quantity"
                            value={FormData.quantity}
                            onChange={(e) => handleFieldChange(e)}
                            type="number"
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            name="amount"
                            value={FormData.amount}
                            onChange={(e) => handleFieldChange(e)}
                            type="number"
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmit}>
                    Save
                </Button>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderForm;
