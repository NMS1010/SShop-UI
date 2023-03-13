import { useCallback, useEffect, useState } from 'react';
import MultiRangeSlider from '../components/MultiRangeSlider';
import * as brandsAPI from '../../../services/brandsAPI';
import * as categoriesAPI from '../../../services/categoriesAPI';
import * as productsAPI from '../../../services/productsAPI';
import ProductLoading from '../components/ProductLoading';
import ProductCard from '../components/ProductCard';
import { InputGroup } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDebounce from '../../../hooks/useDebounce';
import { PAGE_SIZE, SORT_PRODUCTS } from '../../../constants';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import useNavigateSearch from '../../../hooks/useNavigateSearch';
import CheckBox from '../../../components/CheckBox';
import OptionBoard from '../../../components/OptionBoard';
const DEFAULT_PAGE_SIZE = 2;
const Shop = () => {
    const [searchVal, setSearchVal] = useState('');
    const [sortVal, setSortVal] = useState({ key: 0, value: 'Name A-Z', param: 'name_a_z' });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState({
        pageIndex: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        totalItem: null,
        totalPage: null,
    });
    const [filters, setFilters] = useState({
        categoryIds: [],
        brandIds: [],
        minPrice: 0,
        maxPrice: 100000000,
    });
    const fetchAll = useCallback((getFunc, setFunc) => {
        return (async () => {
            const response = await getFunc();
            if (response && response.isSuccess) {
                setFunc(response.data.items);
            }
        })();
    }, []);
    useEffect(() => {
        fetchAll(brandsAPI.getAllBrands, setBrands);
        fetchAll(categoriesAPI.getAllCategories, setCategories);
    }, []);

    const debouncedSearchVal = useDebounce(searchVal);
    const debouncedFiltersVal = useDebounce(filters);
    const navigateSearch = useNavigateSearch();
    useEffect(() => {
        setLoading(true);
        (async () => {
            const params = new URLSearchParams();
            params.append('keyword', debouncedSearchVal);
            params.append('sortBy', sortVal.key);
            params.append('pageIndex', debouncedSearchVal ? 1 : paging.pageIndex);
            params.append('pageSize', paging.pageSize);
            filters.categoryIds.forEach((id) => params.append('categoryIds', id));
            filters.brandIds.forEach((id) => params.append('brandIds', id));
            params.append('minPrice', filters.minPrice);
            params.append('maxPrice', filters.maxPrice);

            const response = await productsAPI.getAllProducts(params);
            if (response && response.isSuccess) {
                setProducts(response.data.items);
                setPaging({
                    ...paging,
                    totalItem: response.data.totalItem,
                    totalPage: Math.ceil(response.data.totalItem / paging.pageSize),
                });
                setLoading(false);
            }
            // Array.from(params.keys()).forEach((p) => console.log(p));

            // navigateSearch('/shop', { ...params, sortBy: sortVal.param });
        })();
    }, [debouncedSearchVal, sortVal, paging.pageIndex, paging.pageSize, debouncedFiltersVal]);
    const handleChange = (e) => {
        setSearchVal(e.target.value);
    };
    return (
        <div className=" max-w-screen-xl m-auto border-solid border-2 border-indigo-600 rounded-lg">
            <div className="row p-5">
                <div className="col-3">
                    <div className="flex items-center justify-between">
                        <h2 className="capitalize p-8 text-2xl">Filters</h2>
                        <a className="cursor-pointer text-2xl mb-1 text-yellow-600">Clear all</a>
                    </div>
                    <div>
                        <h2 className="text-yellow-600 capitalize p-8 text-2xl border-t-2 mt-5">Price</h2>
                        <MultiRangeSlider
                            step={100000}
                            min={0}
                            max={100000000}
                            onChange={({ min, max }) => {
                                setFilters({ ...filters, maxPrice: max, minPrice: min });
                            }}
                        />
                        <div className="flex mt-5 justify-evenly text-xl text-center">
                            <div className="bg-red-300 p-3 rounded-xl">
                                <span>FROM</span>
                                <br></br>
                                <span className="font-bold">
                                    {new Intl.NumberFormat().format(filters.minPrice)} VND
                                </span>
                            </div>
                            <div className="bg-red-300 p-3 rounded-xl">
                                <span>TO </span>
                                <br></br>
                                <span className="font-bold">
                                    {new Intl.NumberFormat().format(filters.maxPrice)} VND
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-yellow-600 capitalize p-8 text-2xl border-t-2 mt-5">Categories</h2>
                        <div>
                            {categories.map((category) => {
                                return (
                                    <CheckBox
                                        className={
                                            'bg-amber-200 hover:bg-amber-400 focus-within:ring-0 cursor-pointer w-7 h-7 border-3 border-rose-500 rounded-lg checked:bg-green-500 mb-1'
                                        }
                                        label={`${category.name} (${category.totalProduct})`}
                                        onClick={(e) => {
                                            let categoryIds;
                                            if (e.target.checked) {
                                                categoryIds = [...filters.categoryIds, category.categoryId];
                                            } else {
                                                categoryIds = filters.categoryIds.filter(
                                                    (id) => id !== category.categoryId,
                                                );
                                            }
                                            setFilters({
                                                ...filters,
                                                categoryIds: [...categoryIds],
                                            });
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-yellow-600 capitalize p-8 text-2xl border-t-2 mt-5">Brands</h2>
                        <div>
                            {brands.map((brand) => {
                                return (
                                    <CheckBox
                                        className={
                                            'bg-amber-200 hover:bg-amber-400 focus-within:ring-0 cursor-pointer w-7 h-7 border-3 border-rose-500 rounded-lg checked:bg-green-500 mb-1'
                                        }
                                        label={`${brand.brandName} (${brand.totalProduct})`}
                                        onClick={(e) => {
                                            let brandIds;
                                            if (e.target.checked) {
                                                brandIds = [...filters.brandIds, brand.brandId];
                                            } else {
                                                brandIds = filters.brandIds.filter((id) => id !== brand.brandId);
                                            }
                                            setFilters({
                                                ...filters,
                                                brandIds: [...brandIds],
                                            });
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-9 px-5">
                    <h1 className="mb-5">Products</h1>
                    <div className="flex pb-5 ">
                        <InputGroup className="mb-3 w-1/2">
                            <InputGroup.Text className="bg-white">
                                <FontAwesomeIcon className="p-3 text-2xl" icon={faSearch} />
                            </InputGroup.Text>
                            <input
                                type={'text'}
                                className="border focus:ring-0 p-3 border-1 border-solid border-slate-500 rounded-r-lg text-xl"
                                placeholder="Search for product...."
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <div className="flex">
                            <OptionBoard
                                value={sortVal.value}
                                boardClassName="p-0 absolute hidden text-gray-700 pt-1 group-hover:block z-10 text-center w-full"
                            >
                                {SORT_PRODUCTS.map((data) => {
                                    return (
                                        <li key={data.key} className="">
                                            <Link
                                                className={`text-yellow-500 bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ${
                                                    data.key === sortVal.key && 'bg-amber-500 text-white'
                                                }`}
                                                onClick={() => {
                                                    setSortVal({
                                                        key: data.key,
                                                        value: data.value,
                                                        param: data.param,
                                                    });
                                                    setPaging({ ...paging, pageIndex: 1 });
                                                }}
                                            >
                                                {data.value}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </OptionBoard>
                            <div className="ml-3 mr-3"></div>
                            <OptionBoard
                                value={`Show ${paging.pageSize}`}
                                boardClassName="p-0 absolute hidden text-gray-700 pt-1 group-hover:block z-10 text-center w-full"
                            >
                                {PAGE_SIZE.map((val) => {
                                    return (
                                        <li
                                            key={val}
                                            className={`cursor-pointer text-yellow-500 bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ${
                                                val === paging.pageSize && 'bg-amber-500 text-white'
                                            }`}
                                            onClick={() => {
                                                setPaging({ ...paging, pageSize: val });
                                            }}
                                        >
                                            {val}
                                        </li>
                                    );
                                })}
                            </OptionBoard>
                        </div>
                    </div>
                    <div className="row">
                        {loading
                            ? Array.from(Array(6)).map((val) => (
                                  <div key={val} className="col-4">
                                      <ProductLoading />
                                  </div>
                              ))
                            : products.map((product) => (
                                  <div key={product.productId} className="col-4">
                                      <ProductCard key={product.productId} product={product} />
                                  </div>
                              ))}
                    </div>
                    {products.length > 0 && (
                        <div className="flex flex-col items-center my-12">
                            <ReactPaginate
                                pageCount={paging.totalPage}
                                containerClassName={'flex text-gray-700'}
                                nextLabel=">"
                                breakLabel="..."
                                previousLabel="<"
                                pageLinkClassName={
                                    'mx-3 h-12 font-medium rounded-full bg-gray-200 w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full'
                                }
                                previousLinkClassName={
                                    'h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'
                                }
                                nextLinkClassName={
                                    'h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'
                                }
                                activeLinkClassName={'bg-teal-600 text-white'}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                onPageChange={(e) => setPaging({ ...paging, pageIndex: e.selected + 1 })}
                                forcePage={paging.pageIndex - 1}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
