import { useTheme } from '@/providers/ThemeProvider';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useMemo, useState } from 'react';

// Add custom styles for table default row colors
const customTableStyles = `
  .custom-table tbody tr {
    background-color: var(--row-color) !important;
  }
  .custom-table tbody tr:nth-child(even) {
    background-color: var(--row-color-even) !important;
  }
`;

const PAGE_SIZE = 15;

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Robert',
      lastName: 'Smith',
    },
    address: '566 Brakus Inlet',
    city: 'Westerville',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Yan',
    },
    address: '7777 Kuhic Knoll',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Upton',
    },
    address: '722 Emie Stream',
    city: 'Huntington',
    state: 'Washington',
  },
  {
    name: {
      firstName: 'Nathan',
      lastName: 'Harris',
    },
    address: '1 Kuhic Knoll',
    city: 'Ohiowa',
    state: 'Nebraska',
  },
];

const HrMstDataList = () => {
  const [page, setPage] = useState(1);
  const { themeColor, themeStyles } = useTheme();
  
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    mantineTableProps: {
      highlightOnHover: true, // Re-enable hover for better UX
      striped: false, // Disable default striped since we're using custom colors
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
      className: 'custom-table',
    },
    mantinePaperProps: {
      style: {
        '--row-color': themeColor === 'blue' ? '#eff6ff' : 
                      themeColor === 'pink' ? '#fdf2f8' :
                      themeColor === 'teal' ? '#f0fdfa' :
                      themeColor === 'violet' ? '#faf5ff' :
                      themeColor === 'navbar' ? '#faf5ff' :
                      '#f9fafb',
        '--row-color-even': themeColor === 'blue' ? '#dbeafe' : 
                           themeColor === 'pink' ? '#fce7f3' :
                           themeColor === 'teal' ? '#ccfbf1' :
                           themeColor === 'violet' ? '#f3e8ff' :
                           themeColor === 'navbar' ? '#f3e8ff' :
                           '#f3f4f6',
      } as React.CSSProperties,
    },
  });

  return (
    <>
      <style>{customTableStyles}</style>
      <MantineReactTable table={table} />
    </>
  );
};

export default HrMstDataList;
