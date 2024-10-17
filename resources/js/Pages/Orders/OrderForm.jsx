import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";

function OrderForm({ show, getData, onHide, editData }) {
    const [formData, setFormData] = useState({
        customer_name: "",
        date: "",
        payment_term: "",
        due_date: "",
        item_name: "",
        amount: "",
        quantity: "",
    });

    const handleFieldChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        axios({
            method: editData?.id ? "put" : "post",
            url: `orders${editData?.id ? "/" + editData?.id : ""}`,
            data: formData,
        })
            .then((response) => {
                if (response) {
                    if (editData) {
                        toast.info("Order Successfully updated!");
                    } else {
                        toast.success("Order Successfully created!");
                    }
                    getData();
                    setFormData({});
                    onHide();
                }
            })
            .catch((error) => {
                if (error) {
                    toast.error(
                        "Somthing went wrong please contact admin for further support!"
                    );
                }
            });
    };

    useEffect(() => {
        if (editData?.id) {
            setFormData({
                id: editData?.id,
                customer_name: editData?.customer_name ?? "",
                date: editData?.date ?? "",
                payment_term: editData?.payment_term ?? "",
                due_date: editData?.due_date ?? "",
                item_name: editData?.item_name ?? "",
                amount: editData?.amount ?? "",
                quantity: editData?.quantity ?? "",
            });
        }
    }, [editData?.id, show]);

    return (
        <Modal show={show} size="lg" backdrop="static">
            <Modal.Title className="p-3">Create Order</Modal.Title>
            <Modal.Body className="p-3">
                <Row>
                    <Col xs={6} className="mb-2">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={(e) => handleFieldChange(e)}
                            type="text"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Form.Label>Payment Term</Form.Label>
                        <Form.Control
                            name="payment_term"
                            value={formData.payment_term}
                            onChange={(e) => handleFieldChange(e)}
                            type="text"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            name="date"
                            value={formData.date}
                            onChange={(e) => handleFieldChange(e)}
                            type="date"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            name="due_date"
                            value={formData.due_date}
                            onChange={(e) => handleFieldChange(e)}
                            type="date"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            name="item_name"
                            value={formData.item_name}
                            onChange={(e) => handleFieldChange(e)}
                            type="text"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            name="quantity"
                            value={formData.quantity}
                            onChange={(e) => handleFieldChange(e)}
                            type="number"
                        />
                    </Col>
                    <Col xs={6} className="mb-2">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            name="amount"
                            value={formData.amount}
                            onChange={(e) => handleFieldChange(e)}
                            type="number"
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSubmit}>
                    {editData?.id ? "Update" : "Save"}
                </Button>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderForm;
