import { useMemo } from 'react';
import { useTable } from 'react-table';
import styles from './Table.module.scss';
const Table = ({ data, ignoredField = [] }) => {
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
                          if (key == 'image')
                              return {
                                  ...obj,
                                  Cell: ({ value }) => <img src={`${process.env.REACT_APP_HOST}${value}`} />,
                              };
                          return obj;
                      })
                : [],
        [data],
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                if (Array.isArray(cell.value))
                                    return <td {...cell.getCellProps()}>{cell.value.length}</td>;
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default Table;
