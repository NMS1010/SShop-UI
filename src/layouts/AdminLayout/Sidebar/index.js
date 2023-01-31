import classNames from 'classnames/bind';
import SidebarItem from '../Sidebar/SidebarItem';
import styles from './Sidebar.module.scss';
import logo from '../../../assets/images/admin/logo.svg';

import dashboardIcon from '../../../assets/images/admin/icons/dashboard.svg';
import userIcon from '../../../assets/images/admin/icons/user.svg';
import categoryIcon from '../../../assets/images/admin/icons/category.svg';
import config from '../../../configs';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

const Sidebar = ({ setTitle }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>
                <NavLink to={config.routes.admin_home}>
                    <img src={logo} alt="logo" />
                </NavLink>
            </div>
            <div className={cx('content')}>
                <SidebarItem
                    path={config.routes.admin_home}
                    setTitle={setTitle}
                    content="Dashboard"
                    icon={dashboardIcon}
                />
                <SidebarItem path={config.routes.admin_users} setTitle={setTitle} content="Users" icon={userIcon} />
                <SidebarItem
                    path={config.routes.admin_categories}
                    setTitle={setTitle}
                    content="Categories"
                    icon={categoryIcon}
                />
            </div>
        </div>
    );
};

export default Sidebar;
