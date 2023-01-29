import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

const SidebarItem = ({ icon, content }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>
                <img src={icon} alt="image" />
            </div>
            <div className={cx('content')}>{content}</div>
        </div>
    );
};
SidebarItem.propTypes = {
    icon: PropTypes.any.isRequired,
    content: PropTypes.string.isRequired,
};
export default SidebarItem;
