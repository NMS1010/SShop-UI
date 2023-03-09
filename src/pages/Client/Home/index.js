import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard';
import * as productsAPI from '../../../services/productsAPI';
import ProductLoading from '../../../components/ProductLoading';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const response = await productsAPI.getAllProducts({ pageSize: 8 });
        if (!response || !response?.isSuccess) {
            setLoading(true);
            setProducts([]);
        } else {
            setLoading(false);
            setProducts(response?.data?.items);
        }
    }, []);
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-screen-xl m-auto p-20 border-solid border-2 border-indigo-600 rounded-lg">
            {loading
                ? Array.from(Array(8)).map((val) => <ProductLoading />)
                : products.map((product) => <ProductCard key={product.productId} product={product} />)}
        </div>
    );
};

export default Home;
