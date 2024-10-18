import { React } from "react";
import { Card, Table } from "react-bootstrap";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

function Activity() {
    const { data } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Activity" />
            <Card>
                <Card.Header>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        User Activity
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Action</th>
                                <th>Details</th>
                                <th>Recorded At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data?.length > 0 &&
                                data.map((item, key) => (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{item?.action ?? "-"}</td>
                                        <td>{item?.details ?? "-"}</td>
                                        <td>{item?.updated_at ?? "-"}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </AuthenticatedLayout>
    );
}

export default Activity;
