import Header from './Header';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="admin-container">
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
