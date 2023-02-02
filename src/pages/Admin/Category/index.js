import { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import * as categoriesAPI from '../../../services/categoriesAPI';

const Category = () => {
    const ignoredField = ['parentCategoryId', 'parentCategoryName'];
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            let data = await categoriesAPI.getAllCategories();
            setCategories(data ? data.items : []);
        };
        fetchAPI();
    }, []);
    return (
        <div>
            <Table data={categories} ignoredField={ignoredField} />
        </div>
    );
};

export default Category;
