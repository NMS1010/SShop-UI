import Header from './Header';
import Sidebar from './Sidebar';

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

const AdminLayout = ({ children }) => {
    return (
        <div className={cx('container')}>
            <Sidebar />
            <div className={cx('page')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
