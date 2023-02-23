import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import styles from '../../CommonCSSForm/CommonCSSForm.module.scss';

import FileUploader from '../../../../components/FileUploader';
import Button from '../../../../components/Button';

import * as productsAPI from '../../../../services/productsAPI';
import * as messageAction from '../../../../redux/actions/messageAction';
import logoutHandler from '../../../../../utils/logoutHandler';

const cx = classNames.bind(styles);

const ProductImagesForm = ({ setAction = () => {}, brand = null, brands = [], getAllProductImages = () => {} }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [inputFields, setInputFields] = useState({
        brandName: brand?.brandName,
        origin: brand?.origin,
    });
    const [fileSelected, setFileSelected] = useState(null);
    const [fileSelectedError, setFileSelectedError] = useState('');
    const [validationMessage, setValidationMessage] = useState({
        brandName: '',
        origin: '',
        image: null,
    });

    const validation = useCallback(() => {
        let errors = { ...validationMessage };
        inputFields.brandName?.trim() ? (errors.brandName = '') : (errors.brandName = 'ProductImages name is required');
        inputFields.origin?.trim() ? (errors.origin = '') : (errors.origin = 'Origin is required');
        !fileSelected && !brand?.image ? (errors.image = 'Image is required') : (errors.image = '');
        setValidationMessage(errors);
    });
    useEffect(() => {
        validation();
    }, [inputFields, fileSelected]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValidateErrors = Object.keys(validationMessage).some((err) => {
            return validationMessage[err] !== '';
        });
        if (isValidateErrors) return;
        const brandObj = {
            brandId: brand?.brandId,
            brandName: inputFields?.brandName,
            origin: inputFields?.origin,
            image: fileSelected,
        };
        const handleProductImages = async () => {
            setLoading(true);
            let response =
                brand !== null
                    ? await brandsAPI.updateProductImages(brandObj)
                    : await brandsAPI.createProductImages(brandObj);

            if (!response || !response.isSuccess) {
                if (response.status === 401) {
                    await logoutHandler(dispatch, navigate, messageAction, authAction);
                }
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'ProductImages',
                        message: response?.errors || 'Error while handling this brand',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
            } else {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'ProductImages',
                        message: 'Handling this brand successfully',
                        backgroundColor: '#5cb85c',
                        icon: '',
                    }),
                );
                setAction({ add: false, edit: false, delete: false });
                await getAllProductImages();
            }
            setLoading(false);
        };
        handleProductImages();
    };
    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>ProductImages</h1>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="brandName">Name</label>
                    <input name="brandName" value={inputFields.brandName} type={'text'} onChange={handleChange} />
                    <small>{validationMessage.brandName}</small>
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="origin">Origin</label>
                    <textarea name="origin" onChange={handleChange} value={inputFields.origin}></textarea>
                    <small>{validationMessage.origin}</small>
                </div>
                <div className={cx('form-group')}>
                    <FileUploader
                        accept={'image/*'}
                        setFileSelected={setFileSelected}
                        setFileSelectedError={setFileSelectedError}
                        imgUrl={brand?.image}
                    />
                    <small>{fileSelectedError}</small>
                    <small>{validationMessage.image}</small>
                </div>
                <div className={cx('action-btn')}>
                    <Button className={cx('submit-btn')} type="submit" loading={loading}>
                        {brand ? 'Update' : 'Create'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default ProductImagesForm;
