import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import loader from '../../assets/images/loader.svg';

const Button = ({ type = '', className, children, onClick, loading = false }) => {
    let styles = loading ? { backgroundColor: '#e7e8e9', color: '#9fa3a9', cursor: 'not-allowed' } : {};
    return (
        <button style={styles} type={type} onClick={onClick} className={className} disabled={loading}>
            {!loading ? children : <img src={loader} alt="Loading" />}
        </button>
    );
};
export default Button;
