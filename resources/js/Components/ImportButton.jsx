import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Papa from "papaparse";

function ImportButton() {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null); // Ref to hidden input

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store selected file
    };

    const handleButtonClick = () => {
        if (!file) {
            // Trigger file selection if no file is selected yet
            fileInputRef.current.click();
        } else {
            // If file is already selected, upload it
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

            alert(response.data.message || "Orders imported successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to import orders.");
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
                {file ? "Upload File" : "Select & Import"}
            </Button>
        </div>
    );
}

export default ImportButton;
