import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FileUploader.module.scss';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import preImage from '../../assets/images/common/preImage.jpg';

const cx = classNames.bind(styles);
const FileUploader = ({
    setFileSelected,
    setFileSelectedError,
    fileSize = 2048 * 1024,
    accept = 'image/*',
    imgUrl = '',
}) => {
    const [imageURL, setImageURL] = useState(imgUrl && `${process.env.REACT_APP_HOST}${imgUrl}`);
    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        if (!file) setFileSelectedError('File is required');
        else {
            if (file.size > fileSize) {
                setFileSelectedError(`File size cannot exceed more than ${fileSize}`);
            } else {
                setFileSelected(file);
                setImageURL(URL.createObjectURL(e.target.files[0]));
            }
        }
    };
    return (
        <div className={cx('container')}>
            <label htmlFor={cx('file-input')}>
                <FontAwesomeIcon fontSize={'1.8rem'} icon={faPenToSquare} />
            </label>
            <input accept={accept} type="file" id={cx('file-input')} onChange={(e) => handleSelectFile(e)} />
            <img id={cx('img-preview')} src={imageURL || preImage} />
        </div>
    );
};

export default FileUploader;
