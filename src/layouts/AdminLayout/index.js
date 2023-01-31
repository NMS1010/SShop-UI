import Header from './Header';
import Sidebar from './Sidebar';

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const AdminLayout = ({ children }) => {
    const [title, setTitle] = useState('Dashboard');
    return (
        <div className={cx('container')}>
            <Sidebar setTitle={setTitle} />
            <div className={cx('page')}>
                <Header title={title} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
