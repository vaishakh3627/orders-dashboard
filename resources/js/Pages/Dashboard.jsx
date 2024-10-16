import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import OrdersListPage from "./Orders/OrdersListPage";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <OrdersListPage />
        </AuthenticatedLayout>
    );
}
