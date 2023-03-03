import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NotifyBoard from '../../../components/NotifyBoard';
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as authAction from '../../../redux/actions/authAction';
import * as messageAction from '../../../redux/actions/messageAction';
import { useSelector, useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const Header = ({ title, setIsHideContent, isHideContent }) => {
    const dispatch = useDispatch();
    const { currentUser, isLogin } = useSelector((state) => state?.authReducer);

    const [isShowNotify, setIsShowNotify] = useState(false);
    const [isShowUserOption, setIsShowUserOption] = useState(false);
    const handleShowNotify = () => {
        setIsShowNotify(!isShowNotify);
        setIsShowUserOption(false);
    };
    const handleShowUserOption = () => {
        setIsShowUserOption(!isShowUserOption);
    };
    const logOut = async () => {
        dispatch(await authAction.logout());
        dispatch(
            messageAction.setMessage({
                id: Math.random(),
                title: 'Logout',
                message: 'Logout successfully',
                backgroundColor: '#5cb85c',
                icon: '',
            }),
        );
    };
    return (
        <header className={cx('container')}>
            <div className={cx('info')}>
                <div
                    className={cx('bar')}
                    onClick={() => setIsHideContent(!isHideContent)}
                    style={{ cursor: 'pointer' }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <p className={cx('title')}>{title}</p>
            </div>
            <div className={cx('action')}>
                <div className={cx('notify')}>
                    <FontAwesomeIcon icon={faBell} onClick={() => handleShowNotify()} />
                </div>
                <div className={cx('user-detail')}>
                    {isShowUserOption && (
                        <NotifyBoard
                            TitleComponent={() => (
                                <div className="d-flex justify-content-between">
                                    <img
                                        style={{ width: '7rem', height: '7rem', marginTop: '1rem' }}
                                        src={isLogin && `${process.env.REACT_APP_HOST}${currentUser.avatar}`}
                                        alt={'user avatar'}
                                        onClick={() => handleShowUserOption()}
                                    />

                                    <div className="ms-4">
                                        <p style={{ fontWeight: 'bold' }} className="mt-2 mb-2 fs-3">
                                            {`${currentUser.firstName} ${currentUser.lastName}`}
                                        </p>
                                        <p className="mt-2 mb-2 fs-4">{`${currentUser.phoneNumber}`}</p>
                                    </div>
                                </div>
                            )}
                        >
                            <Link style={{ textAlign: 'left' }} to={'/admin/profile'}>
                                <p className="mb-0">Profile</p>
                                <p className="mb-0 fs-5">Account settings</p>
                            </Link>

                            <Link to={'/admin/login'} onClick={() => logOut()}>
                                Logout
                            </Link>
                        </NotifyBoard>
                    )}
                    <div className="flex mt-2.5" onClick={() => handleShowUserOption()}>
                        <img
                            src={isLogin && `${process.env.REACT_APP_HOST}${currentUser.avatar}`}
                            alt={'user avatar'}
                        />
                        <span className="ms-3 fs-3">Hi, {currentUser.firstName}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
