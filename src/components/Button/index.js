import classNames from 'classnames/bind';
const Button = ({ type = '', className, children, onClick }) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};
export default Button;
