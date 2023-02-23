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
    const [imageURL, setImageURL] = useState(
        imgUrl && !imgUrl.includes('blob') ? `${process.env.REACT_APP_HOST}${imgUrl}` : '',
    );
    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        if (!file) setFileSelectedError('File is required');
        else {
            if (file.size > fileSize) {
                setFileSelectedError(`File size cannot exceed more than ${fileSize}`);
            } else {
                setImageURL(URL.createObjectURL(file));
                setFileSelected(file);
            }
        }
    };
    const id = Math.random();
    return (
        <div className={cx('container')}>
            <input
                className="input-upload"
                accept={accept}
                id={`${id}`}
                type="file"
                onChange={(e) => handleSelectFile(e)}
            />
            <div className={'d-inline-block'}>
                <img id={cx('img-preview')} src={imageURL || preImage} />
                <label htmlFor={`${id}`}>
                    <FontAwesomeIcon fontSize={'1.8rem'} icon={faPenToSquare} />
                </label>
            </div>
        </div>
    );
};

export default FileUploader;
