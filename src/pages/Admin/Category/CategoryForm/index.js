import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CategoryForm.module.scss';
import FileUploader from '../../../../components/FileUploader';
import OutsideAlerter from '../../../../components/OutsideAlerter';
import Button from '../../../../components/Button';
const cx = classNames.bind(styles);
const CategoryForm = ({ category = null, setIsOutClick, categories = [] }) => {
    const [loading, setLoading] = useState(true);
    const [inputFields, setInputFields] = useState({
        name: category?.name,
        content: category?.content,
        parentCategory: category?.parentCategory,
    });
    const [fileSelected, setFileSelected] = useState(null);
    const [fileSelectedError, setFileSelectedError] = useState('');
    const [validationMessage, setValidationMessage] = useState({
        name: '',
        content: '',
        parentCategory: '',
        image: null,
    });

    const validation = () => {
        let errors = { ...validationMessage };
        inputFields.name?.trim() ? (errors.name = '') : (errors.name = 'Name is required');
        inputFields.content?.trim() ? (errors.content = '') : (errors.content = 'Content is required');
        !fileSelected && !category?.image ? (errors.image = 'Image is required') : (errors.image = '');
        setValidationMessage(errors);
    };
    useEffect(() => {
        validation();
    }, [inputFields, fileSelected]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className={cx('container')}>
            <OutsideAlerter setIsOut={setIsOutClick}>
                <div className={cx('content')}>
                    <h1 className={cx('title')}>Catogory</h1>
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        <div className={cx('form-group')}>
                            <label htmlFor="name">Name</label>
                            <input name="name" value={inputFields.name} type={'text'} onChange={handleChange} />
                            <small>{validationMessage.name}</small>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="content">Content</label>
                            <textarea name="content" onChange={handleChange} value={inputFields.content}></textarea>
                            <small>{validationMessage.content}</small>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="parentCategory">Parent Category</label>
                            <select name="parentCategory" onChange={handleChange}>
                                {categories.map((category) => {
                                    return (
                                        <option selected={category.image} value={category.id} key={category.id}>
                                            {category.name}
                                        </option>
                                    );
                                })}
                                <option selected={category?.image} value={null}>
                                    No parent category
                                </option>
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            {category?.image && (
                                <img width={'100px'} src={`${process.env.REACT_APP_HOST}${category?.image}`} />
                            )}
                            <FileUploader
                                setFileSelected={setFileSelected}
                                setFileSelectedError={setFileSelectedError}
                            />
                            <small>{fileSelectedError}</small>
                            <small>{validationMessage.image}</small>
                        </div>
                        <div className={cx('action-btn')}>
                            <Button className={cx('submit-btn')} type="submit">
                                {category ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </OutsideAlerter>
        </div>
    );
};

export default CategoryForm;
