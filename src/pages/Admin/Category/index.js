import { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import * as categoriesAPI from '../../../services/categoriesAPI';

const Category = () => {
    const ignoredField = ['parentCategoryId', 'parentCategoryName'];
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAPI = async () => {
            let data = await categoriesAPI.getAllCategories({ pageSize: 5 });
            setLoading(data ? false : true);
            setCategories(data ? data.items : []);
        };
        fetchAPI();
    }, []);
    return (
        <div>
            {loading ? <Loading /> : <Table data={categories} ignoredField={ignoredField} uniqueField={'categoryId'} />}
        </div>
    );
};

export default Category;
