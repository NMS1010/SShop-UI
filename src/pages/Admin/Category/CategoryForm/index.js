import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CategoryForm.module.scss';
import FileUploader from '../../../../components/FileUploader';
import Button from '../../../../components/Button';
import * as categoriesAPI from '../../../../services/categoriesAPI';
import { connect } from 'react-redux';
import * as messageAction from '../../../../redux/actions/messageAction';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const CategoryForm = ({
    setAction = () => {},
    category = null,
    categories = [],
    dispatch,
    getAllCategories = () => {},
}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    const validation = useCallback(() => {
        let errors = { ...validationMessage };
        inputFields.name?.trim() ? (errors.name = '') : (errors.name = 'Name is required');
        inputFields.content?.trim() ? (errors.content = '') : (errors.content = 'Content is required');
        !fileSelected && !category?.image ? (errors.image = 'Image is required') : (errors.image = '');
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
        const categoryObj = {
            categoryId: category?.categoryId,
            name: inputFields?.name,
            content: inputFields?.content,
            image: fileSelected,
        };
        if (inputFields.parentCategory !== '0') {
            categoryObj['parentCategoryId'] = inputFields.parentCategory;
        }
        const handleCategory = async () => {
            setLoading(true);
            let response = category
                ? await categoriesAPI.updateCategory(categoryObj)
                : await categoriesAPI.createCategory(categoryObj);
            if (response === 'unauthorized') {
                navigate('/admin/login');
                return;
            }
            if (!response || !response.isSuccess) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Category',
                        message: response?.errors || 'Error while handling this category',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
            } else {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Category',
                        message: 'Handling this category successfully',
                        backgroundColor: '#5cb85c',
                        icon: '',
                    }),
                );
                setAction({ add: false, edit: false, delete: false });
                await getAllCategories();
            }
            setLoading(false);
        };
        handleCategory();
    };
    return (
        <div className={cx('container')}>
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
                                <option selected={category.image} value={category.categoryId} key={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                        <option selected={category?.image} value={0}>
                            No parent Category
                        </option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    {category?.image && <img width={'100px'} src={`${process.env.REACT_APP_HOST}${category?.image}`} />}
                    <FileUploader setFileSelected={setFileSelected} setFileSelectedError={setFileSelectedError} />
                    <small>{fileSelectedError}</small>
                    <small>{validationMessage.image}</small>
                </div>
                <div className={cx('action-btn')}>
                    <Button className={cx('submit-btn')} type="submit" loading={loading}>
                        {category ? 'Update' : 'Create'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
function mapStateToProps(state) {
    const { currentUser, isLogin } = state.authReducer;
    const { message } = state.messageReducer;
    return {
        currentUser: currentUser,
        message: message,
        isLogin: isLogin,
    };
}
export default connect(mapStateToProps)(CategoryForm);
