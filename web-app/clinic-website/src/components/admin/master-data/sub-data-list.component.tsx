"use client";

import DatatableComponent from "@/components/common/datatable.component";
import Paging from "@/lib/api/types/paging";
import axiosInstance from "@/lib/axios-instance";
import { Button, Card, Grid } from "@mantine/core";
import { useEffect, useState } from "react";

interface SubDataComponentProps {
  masterCode: string;
}

const SubDataComponent: React.FC<SubDataComponentProps> = ({
  masterCode,
}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    if (masterCode) {
      loadSubDataByMasterCode(masterCode);
    }
  }, [masterCode]);

  const loadSubDataByMasterCode = async (masterCode: string) => {
    try {
      const params = {
        masterCode: masterCode,
        page: page,
        limit: pageSize,
      };
      const { status, data } = await axiosInstance.get<Paging<any>>(`/master-data/findSubMasterDataByFilterWithPaging`, { params: params });
      if (status === 200) {
        setItems(data.items);
        setTotalItems(data.totalItems);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card withBorder radius={"md"} className={"p-10"}>
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 7 }}>
              Dữ liệu
            </Grid.Col>
            <Grid.Col 
              span={{ base: 12, xs: 5 }}
              className="text-right"
            >
              <Button
                size="xs" 
                radius="xs"
                color="green"
                variant="outline"
              >
                Thêm
              </Button>
            </Grid.Col>
          </Grid>
        </Card.Section>

        <Card.Section mt={10}>
          <DatatableComponent 
            height={400}
            data={items}
            columns={[
              { field: 'masterDataCode', name: 'Mã', algin: 'center' },
              { field: 'subDataCode', name: 'Tên', algin: 'left' },
              { field: 'sortNo', name: 'Sắp sếp', algin: 'right' },
              { field: 'action', name: '#', algin: 'center', template(value, item, row) {
                  return <>edit | delete</>
              }, },
            ]}
            totalItems={totalItems}
            isPaging
            isRowNumber
            isShowPagingLabel={false}
            onChangePage={page => setPage(page)}
            itemPerPage={pageSize}
          />
        </Card.Section>
      </Card>
    </>
  );
}

export default SubDataComponent;