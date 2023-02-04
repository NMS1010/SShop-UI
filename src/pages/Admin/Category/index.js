import { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import * as categoriesAPI from '../../../services/categoriesAPI';
import CategoryForm from './CategoryForm';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';
const cx = classNames.bind(styles);
const Category = () => {
    const ignoredField = ['parentCategoryId', 'parentCategoryName'];
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOutClick, setIsOutClick] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [action, setAction] = useState({
        add: false,
        edit: false,
        delete: false,
        outClick: false,
    });
    useEffect(() => {
        const fetchAPI = async () => {
            let data = await categoriesAPI.getAllCategories({ pageSize: 5 });
            setLoading(data ? false : true);
            setCategories(data ? data.items : []);
        };
        fetchAPI();
    }, []);
    const handleAddCategory = () => {
        setAction({ add: true, edit: false, delete: false });
        setIsOutClick(false);
    };
    const handleUpdateCategory = (categoryId) => {
        const category = categories.find((val) => val.categoryId === categoryId);
        setSelectedCategory(category);
        setAction({ add: false, edit: true, delete: false });
        setIsOutClick(false);
    };
    const handleDeleteCategory = (categoryId) => {
        const category = categories.find((val) => val.categoryId === categoryId);
        setAction({ add: false, edit: false, delete: true });
        setSelectedCategory(category);
    };
    return (
        <div className={cx('container')}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Table
                        data={categories}
                        ignoredField={ignoredField}
                        uniqueField={'categoryId'}
                        isAddNew={true}
                        handleAddNew={handleAddCategory}
                        handleUpdateItem={handleUpdateCategory}
                        handleDeleteItem={handleDeleteCategory}
                    />
                    {action.add && !isOutClick && (
                        <CategoryForm setIsOutClick={setIsOutClick} categories={categories} />
                    )}
                    {action.edit && !isOutClick && (
                        <CategoryForm
                            setIsOutClick={setIsOutClick}
                            categories={categories}
                            category={selectedCategory}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Category;
