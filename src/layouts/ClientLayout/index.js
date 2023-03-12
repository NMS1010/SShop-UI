import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const ClientLayout = ({ children }) => {
    return (
        <div className="flex flex-col mt-48">
            <Header />
            <div>
                {/* <Sidebar /> */}
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default ClientLayout;
