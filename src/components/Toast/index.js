import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

const Toast = ({ toastList, setToastList, position, autoDelete, autoDeleteTime = 300000 }) => {
    const [list, setList] = useState(toastList);
    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);

        return () => clearInterval(interval);
    }, [toastList, autoDelete, autoDeleteTime, list]);
    const deleteToast = (id) => {
        setList(list.filter((toast) => toast.id !== id));
        setToastList(toastList.filter((toast) => toast.id !== id));
    };
    return (
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
    );
};

export default Toast;
