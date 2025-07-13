"use client";

import DatatableComponent from "@/components/common/datatable.component";
import Paging from "@/lib/api/types/paging";
import axiosInstance from "@/lib/axios-instance";
import { Button, Card, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import SubDataPopup from "./pop-up/sub-dataa-pop-up.component";
import { IconEdit } from "@tabler/icons-react";

interface SubDataComponentProps {
  masterCode: string;
}

const SubDataComponent: React.FC<SubDataComponentProps> = ({
  masterCode,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [popUpData, setPopUpData] = useState<any>(null);

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
                onClick={() => {
                  setPopUpData({ masterDataCode: masterCode });
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
              { field: 'action', name: '#', algin: 'center', template(value, item, row) {
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
              { field: 'subDataCode', name: 'Mã', algin: 'center' },
              { field: 'subDataName', name: 'Tên', algin: 'left' },
              { field: 'sortNo', name: 'Sắp sếp', algin: 'right' },
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

      <SubDataPopup
        data={popUpData}
        opened={opened}
        onClose={close}
        onSubmit={(values) => {
          loadSubDataByMasterCode(masterCode);
        } }
      />
    </>
  );
}

export default SubDataComponent;