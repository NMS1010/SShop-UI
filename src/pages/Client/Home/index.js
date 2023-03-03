import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard';
import * as productsAPI from '../../../services/productsAPI';
import Loading from '../../../components/Loading';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const response = await productsAPI.getAllProducts();
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
    return <>{loading ? <Loading /> : products.map((product) => <ProductCard product={product} />)}</>;
};

export default Home;
