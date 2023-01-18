import Header from './Header';
import Sidebar from './Sidebar';

const ClientLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="client-container">
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default ClientLayout;
