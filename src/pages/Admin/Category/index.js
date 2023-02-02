import { useEffect, useState } from 'react';
import * as categoriesAPI from '../../../services/categoriesAPI';

const Category = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            let data = await categoriesAPI.getAllCategories();
            console.log(data);
            setCategories(data ? data.items : []);
        };
        fetchAPI();
    }, []);
    return (
        <div>
            <h1>
                {categories.map((category) => {
                    return <p key={category.id}>{category.name}</p>;
                })}
            </h1>
        </div>
    );
};

export default Category;
