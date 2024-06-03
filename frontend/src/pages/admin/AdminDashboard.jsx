import AdminSidebar from "./AdminSidebar";
import AdminMain from "./adminMain";
import "./admindashboard.css"

const AdminDashboard = () => {
    return ( 
        <section className="admin-dashboard">
            <AdminSidebar />
            <AdminMain />

        </section>
    );
}

export default AdminDashboard;