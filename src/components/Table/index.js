import { useMemo, useState } from 'react';
import { usePagination, useRowSelect, useTable, useSortBy } from 'react-table';
import CheckBox from './CheckBox';
import styles from './Table.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

const cx = classNames.bind(styles);
const Table = ({
    data,
    ignoredField = [],
    uniqueField,
    isSearch = true,
    isAddNew = false,
    handleAddNew = () => {},
    handleUpdateItem = () => {},
    handleDeleteItem = () => {},
}) => {
    const [filterData, setFilterData] = useState({ keyword: '', items: data });
    const columns = useMemo(
        () =>
            data[0]
                ? Object.keys(data[0])
                      .filter((key) => !ignoredField.includes(key))
                      .map((key) => {
                          let obj = {
                              Header: key.charAt(0).toUpperCase() + key.slice(1),
                              accessor: key,
                          };
                          if (key === 'image' || key.toLowerCase().includes('image'))
                              return {
                                  ...obj,
                                  Cell: ({ value }) => (
                                      <img
                                          width={'80rem'}
                                          height={'80rem'}
                                          src={`${process.env.REACT_APP_HOST}${value}`}
                                      />
                                  ),
                              };
                          return obj;
                      })
                : [],
        [data, ignoredField],
    );
    // Create selection (include checkbox) column
    const addColumns = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            // Let's make a column for selection
            {
                id: 'selection',
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllPageRowsSelectedProps }) => (
                    <CheckBox {...getToggleAllPageRowsSelectedProps()} />
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => <CheckBox {...row.getToggleRowSelectedProps()} />,
            },
            ...columns,
        ]);
    };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data: filterData.items,
        },
        useSortBy,
        usePagination,
        useRowSelect,
        addColumns,
    );
    const handleSearch = (e) => {
        setFilterData({
            keyword: e.target.value,
            items: data.filter((val) => {
                console.log(page);
                return Object.keys(val).some((attr) => {
                    return (
                        attr !== 'image' && val[attr]?.toString().toLowerCase().includes(e.target.value.toLowerCase())
                    );
                });
            }),
        });
    };
    return (
        <div className={cx('container')}>
            <div className={cx('tool')}>
                {isSearch && (
                    <div className={cx('search')}>
                        <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                        <input
                            type={'text'}
                            className={cx('search-input')}
                            placeholder="Search"
                            onChange={(e) => {
                                handleSearch(e);
                            }}
                        />
                    </div>
                )}
                {isAddNew && <Button children={'Add New'} className={cx('add-btn')} onClick={handleAddNew} />}
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>
                                </th>
                            ))}
                            <th>Action</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    if (Array.isArray(cell.value))
                                        return <td {...cell.getCellProps()}>{cell.value.length}</td>;
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                                <td className={cx('action')}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                                            Action
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleUpdateItem(row.values[uniqueField])}>
                                                Sửa
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteItem(row.values[uniqueField])}>
                                                Xoá
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={cx('pagination')}>
                <div className={cx('forward')}>
                    Go to{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                    />
                </div>
                <div className={cx('pagination-button')}>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                </div>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default Table;
