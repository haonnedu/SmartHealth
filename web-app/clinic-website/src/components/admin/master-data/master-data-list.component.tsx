"use client";

import DatatableComponent from "@/components/common/datatable.component";
import Paging from "@/lib/api/types/paging";
import axiosInstance from "@/lib/axios-instance";
import { Button, Card, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import MasterDataPopUp from "./pop-up/master-data-pop-up.component";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

interface MasterDataListComponentProps {
  onItemClick: (item: any, rowNum: number) => void;
}

const MasterDataListComponent: React.FC<MasterDataListComponentProps> = ({
  onItemClick,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [popUpData, setPopUpData] = useState<any>(null);

  useEffect(() => {
    loadMasterData();
  }, [page, pageSize]);

  const loadMasterData = async () => {
    try {
      const params = {
        page: page,
        limit: pageSize,
      };
      const { status, data } = await axiosInstance.get<Paging<any>>(`/master-data/findMasterDataByFilterWithPaging`, { params: params });
      if (status === 200) {
        setItems(data.items || []);
        setTotalItems(data.totalItems);
      } 
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnItemClick = (item: any, row: number) => {
    if (typeof onItemClick === "function") {
      onItemClick(item, row);
    }
  }

  return (
    <>
      <Card withBorder radius={"md"} className={"p-10"}>
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 7 }}>
              Loại dữ liệu
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
                onClick={() => {
                  setPopUpData(null);
                  open();
                }}
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
              { field: '#', name: '#', algin: 'center', width: 100, template(value, item, row) {
                return (
                  <>
                    <Button
                      size="compact-sm"
                      radius="xs"
                      color="green"
                      variant="outline"
                      onClick={() => {
                        setPopUpData(item);
                        open();
                      }}
                    >
                     <IconEdit size={16} /> 
                    </Button>
                  </>
                )
              }, },
              { field: 'masterDataCode', name: 'Mã', algin: 'center' },
              { field: 'masterDataName', name: 'Tên', algin: 'Left' },
            ]}
            totalItems={totalItems}
            isPaging
            isRowNumber
            isShowPagingLabel={false}
            onChangePage={page => setPage(page)}
            itemPerPage={pageSize}
            onItemClick={handleOnItemClick}
          />
        </Card.Section>
      </Card>

      <MasterDataPopUp 
        opened={opened} 
        onClose={close} data={popUpData} 
        onSubmit={(data) => {
          loadMasterData();
        }}
      />
    </>
  );
}

export default MasterDataListComponent;