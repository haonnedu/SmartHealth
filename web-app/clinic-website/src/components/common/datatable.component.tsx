"use client";

import { Grid, Pagination, ScrollArea, Select, Table, Text } from "@mantine/core";
import React, { useState } from "react";
import cx from "clsx";
import classes from './styles/datatable.module.css';

type DatatableTemplateFn = (value: any, item: any, row: number ) => React.ReactNode;

interface DatatableColumn {
  field: string;
  name: string | React.ReactNode;
  algin?: string;
  template?: string | React.ReactNode | DatatableTemplateFn;
}

interface DatatableComponentProps {
  height?: number;
  minWight?: number
  data: any[];
  columns: DatatableColumn[];
  dataKey?: string;
  isPaging?: boolean;
  totalItems?: number;
  isRowNumber?: boolean;
}

const renderColumnData = (item: any, col: DatatableColumn, row: number) => {
  if (!col) return <></>;
  if (col.template) {
    if (typeof col.template === "function") {
      return <>{col.template(item[col.field], item, row)}</>;
    }
    return <>{col.template}</>;
  }

  return <>{item[col.field]}</>;
}

const DEFAULT_PAGE_SIZE: number = 20;

const DatatableComponent: React.FC<DatatableComponentProps> = ({
  height,
  minWight,
  data,
  columns,
  dataKey,
  isPaging,
  totalItems,
  isRowNumber,
}) => {
  if (!columns || columns.length === 0) {
    return <></>;
  }
  if (isPaging && (totalItems === undefined || totalItems === null)) {
    throw Error("totalItems is required if isPaging is true.")
  }
  
  const [scrolled, setScrolled] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const handleOnChangePage = (value: number) => {
    setPage(value);
  }

  const handleOnChangePageSize = (value: string | null) => {
    let newPageSize: number = DEFAULT_PAGE_SIZE;
    if (value) {
      newPageSize = +value;
    }
    setPageSize(newPageSize);
  }

  return (
    <>
      <ScrollArea h={height || 300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={minWight || 700}>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              {isRowNumber && <Table.Th className="text-center">STT</Table.Th>}
              {columns.map((col, index) => <Table.Th className="text-center" key={`${col.field}-${index}`}>{col.field}</Table.Th>)}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {(!data || data.length === 0) && (
              <Table.Tr>
                <Table.Td colSpan={columns.length + (isRowNumber ? 1 : 0)} className="text-center">Không tìm thấy dữ liệu.</Table.Td>
              </Table.Tr>
            )}

            {(data && data.length > 0 && (
              <>
                {data.map((item, index) => (
                  <Table.Tr
                  key={!dataKey ? index : (item[dataKey] || index)}
                  >
                    {isRowNumber && (
                      <Table.Td className="text-center" maw={100}>
                        {!isPaging && <>{index + 1}</>}
                        {isPaging && <>{((page - 1) * pageSize) + index + 1}</>}
                      </Table.Td>
                    )}
                    {columns.map((col) => (
                      <Table.Td className={`text-${col.algin || 'left'}`}>
                        {renderColumnData(item, col, index)}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
              </>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
      {isPaging && (
        <Grid mt={20}>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <div className="flex justify-start items-center">
              <Text size="sm">Hiện thị {data.length} / Tổng {totalItems}</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <div className="flex justify-center items-center">
              <Pagination
                total={Math.ceil((totalItems || 0) / pageSize)}
                value={page}
                onChange={handleOnChangePage}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <div className="flex justify-end items-center">
              <span className="mr-5">Dòng trên mỗi trang: </span>
              <Select
                maw={80}
                data={['10', '20', '50']}
                value={pageSize.toString()}
                onChange={handleOnChangePageSize}
              />
            </div>
          </Grid.Col>
      </Grid>
      )}
    </>
  );
}

export default DatatableComponent;