import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return ( 
        <div className="admin-sidebar">
            <Link to="/admin-dashboard" className="admin-sidebar-title">
                <i className="bi bi-columns"></i>
                Dashboard
            </Link>
            <ul className="admin-sidebar-list">
                <Link className="admin-sidebar-link" to="/admin-dashboard/users-table">
                    <i className="bi bi-person">
                        Users
                    </i>
                </Link>
                <Link className="admin-sidebar-link" to="/admin-dashboard/posts-table">
                    <i className="bi bi-file-post">
                        Post
                    </i>
                </Link>
                <Link className="admin-sidebar-link" to="/admin-dashboard/categories-table">
                    <i className="bi bi-tag-fill">
                        Categories
                    </i>
                </Link>
                <Link className="admin-sidebar-link" to="/admin-dashboard/comments-table">
                    <i className="bi bi-chat-left-text">
                        Comments
                    </i>
                </Link>
            </ul>
        </div>
    );
}

export default AdminSidebar;