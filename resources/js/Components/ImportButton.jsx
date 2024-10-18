import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function ImportButton({ getData }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleButtonClick = () => {
        if (!file) {
            fileInputRef.current.click();
        } else {
            handleUpload();
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("orders/import", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response?.data?.status) {
                setFile(null);
                getData();
                toast.success("Order Successfully imported!");
            }
        } catch (error) {
            if (error) {
                setFile(null);
                toast.error(
                    "Somthing went wrong please contact admin for further support!"
                );
            }
        }
    };

    return (
        <div>
            <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv,.xlsx,.xls"
                style={{ display: "none" }}
            />

            <Button variant="dark" onClick={handleButtonClick}>
                {file ? "Upload File" : "Select File"}
            </Button>
        </div>
    );
}

export default ImportButton;
