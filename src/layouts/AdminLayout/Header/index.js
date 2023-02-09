import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NotifyBoard from '../../../components/NotifyBoard';
import PropTypes from 'prop-types';
import { useState } from 'react';
import OutsideAlerter from '../../../components/OutsideAlerter';
const cx = classNames.bind(styles);

const Header = ({ title }) => {
    const [isShowNotify, setIsShowNotify] = useState(false);
    const [isShowUserOption, setIsShowUserOption] = useState(false);
    const handleShowNotify = () => {
        setIsShowNotify(!isShowNotify);
        setIsShowUserOption(false);
    };
    const handleShowUserOption = () => {
        setIsShowNotify(false);
        setIsShowUserOption(!isShowUserOption);
    };
    return (
        <header className={cx('container')}>
            <div className={cx('info')}>
                <div className={cx('bar')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <p className={cx('title')}>{title}</p>
            </div>
            <div className={cx('action')}>
                <div className={cx('notify')}>
                    {isShowNotify && (
                        <NotifyBoard title={'Notifications'}>
                            <p>content</p>
                        </NotifyBoard>
                    )}
                    <FontAwesomeIcon icon={faBell} onClick={() => handleShowNotify()} />
                </div>
                <div className={cx('user-detail')}>
                    {isShowUserOption && (
                        <NotifyBoard title={'User Detail'}>
                            <p>content</p>
                        </NotifyBoard>
                    )}
                    <FontAwesomeIcon icon={faUser} onClick={() => handleShowUserOption()} />
                </div>
            </div>
        </header>
    );
};

export default Header;
