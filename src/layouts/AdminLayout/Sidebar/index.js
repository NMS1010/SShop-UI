import classNames from 'classnames/bind';
import SidebarItem from '../../../components/SidebarItem';
import styles from './Sidebar.module.scss';
import logo from '../../../assets/images/admin/logo.svg';

import dashboardIcon from '../../../assets/images/admin/icons/dashboard.svg';
import userIcon from '../../../assets/images/admin/icons/user.svg';
const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>
                <img src={logo} alt="logo" />
            </div>
            <div className={cx('content')}>
                <SidebarItem content="Dashboard" icon={dashboardIcon} />
                <SidebarItem content="User" icon={userIcon} />
            </div>
        </div>
    );
};

export default Sidebar;
