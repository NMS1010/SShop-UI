import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as authAction from '../../../redux/features/auth/authSlice';
import * as messageAction from '../../../redux/features/message/messageSlice';
import { useSelector, useDispatch } from 'react-redux';
import logoutHandler from '../../../utils/logoutHandler';
import OptionBoard from '../../../components/OptionBoard';
import config from '../../../configs';

const cx = classNames.bind(styles);

const Header = ({ title, setIsHideContent, isHideContent }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, isLogin } = useSelector((state) => state?.auth);

    const [isShowNotify, setIsShowNotify] = useState(false);
    const [isShowUserOption, setIsShowUserOption] = useState(false);
    const handleShowNotify = () => {
        setIsShowNotify(!isShowNotify);
        setIsShowUserOption(false);
    };
    const handleShowUserOption = () => {
        setIsShowUserOption(!isShowUserOption);
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
                    <OptionBoard
                        boardClassName="p-5 rounded-3xl border-t-4 text-center border bg-white w-max absolute hidden text-gray-700 pt-1 group-hover:block z-10"
                        isDefault={false}
                        Component={() => (
                            <div className="flex items-center justify-between" onClick={() => handleShowUserOption()}>
                                <img
                                    style={{ width: '3rem', height: '3rem', marginTop: '0.5rem' }}
                                    src={isLogin && `${process.env.REACT_APP_HOST}${currentUser.avatar}`}
                                    alt={'user avatar'}
                                />
                                <span className="mt-2 ml-2 text-3xl">Hi, {currentUser.firstName}</span>
                            </div>
                        )}
                    >
                        <div className="flex justify-between">
                            <img
                                style={{ width: '7rem', height: '7rem', marginTop: '1rem' }}
                                src={isLogin && `${process.env.REACT_APP_HOST}${currentUser.avatar}`}
                                alt={'user avatar'}
                            />

                            <div className="ml-4 mt-4">
                                <p className="mt-2 mb-2 text-2xl font-bold">
                                    {`${currentUser.firstName} ${currentUser.lastName}`}
                                </p>
                                <p className="mt-2 mb-2 text-2xl">{`${currentUser.phoneNumber}`}</p>
                            </div>
                        </div>
                        <Link
                            className="p-4 border-t-3 border-indigo-500 mt-4 rounded-lg text-3xl block hover:bg-slate-300"
                            to={config.routes.admin_profile}
                        >
                            <span>Profile</span>
                        </Link>
                        <Link
                            className="block border bg-cyan-600 text-2xl p-4 mt-4 rounded-lg text-white"
                            onClick={async () => await logoutHandler(dispatch, navigate, messageAction, authAction)}
                        >
                            Logout
                        </Link>
                    </OptionBoard>
                </div>
            </div>
        </header>
    );
};

export default Header;
