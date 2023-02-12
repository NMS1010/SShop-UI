import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './Toast.module.scss';
import * as messageAction from '../../redux/actions/messageAction';

const cx = classNames.bind(styles);

const Toast = ({ children, message, dispatch, position, autoDelete, autoDeleteTime = 3000 }) => {
    const [list, setList] = useState(message);
    useEffect(() => {
        setList([...message]);
    }, [message]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && message.length && list.length) {
                deleteToast(message[0].id);
            }
        }, autoDeleteTime);

        return () => clearInterval(interval);
    }, [message, autoDelete, autoDeleteTime, list]);
    const deleteToast = (id) => {
        setList(list.filter((toast) => toast.id !== id));
        dispatch(messageAction.clearMessage(id));
    };
    return (
        <>
            <div className={cx('container') + cx(' ') + cx(`${position}`)}>
                {list.map((toast) => {
                    return (
                        <div
                            key={toast.id}
                            className={cx(`notification`) + cx(' ') + cx(`toast`) + cx(' ') + cx(`${position}`)}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>X</button>
                            <div className="image">
                                <img src={toast?.icon} alt="" />
                            </div>
                            <div>
                                <p className="title">{toast.title}</p>
                                <p className="message">{toast.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {children}
        </>
    );
};
function mapStateToProps(state) {
    return {
        message: state.messageReducer,
    };
}
export default connect(mapStateToProps)(Toast);