"use client";

import DatatableComponent from "@/components/common/datatable.component";
import { Appointment } from "@/lib/api/types/appointment";
import Paging from "@/lib/api/types/paging";
import axiosInstance from "@/lib/axios-instance";
import { Badge, Button, Card, Grid, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";


export default function AppointmentListComponent() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  useEffect(() => {
    loadAppointments('3b1894ce-9925-4d75-8020-8ad0cd19aab1', page, pageSize);
  }, [page, pageSize]);

  const loadAppointments = async (userId: string, page: number, pageSize: number) => {
    const { status, data } = await axiosInstance.get<Paging<Appointment>>('/appointments', {
      params: {
        userId: userId,
        page: page,
        limit: pageSize,
      },
    });
    if (status === 200) {
      setTotalItems(data.totalItems);
      setAppointments(data.data);
    } else {
      console.error('Something was wrong when loading appointments');
    }
  }

  const columns = [
    {
      field: "appointmentNo",
      name: "Ngày Hẹn",
      algin: "center",
      minWidth: 200,
    },
    {
      field: "appointmentDate",
      name: "Ngày Hẹn",
      algin: "center",
      minWidth: 200,
    },
    {
      field: "priority",
      name: "Ưu tiên",
      algin: "center",
      template: function(value: any, item: any, index: number) {
        if (value === "Normal") return <Badge radius="sm" color="green">Bình thường</Badge>
        if (value === "Urgent") return <Badge radius="sm" color="red">Gấp</Badge>
        return <></>
      },
      minWidth: 200,
    },
    {
      field: "specialist",
      name: "Chuyên Khoa",
      algin: "center",
      template: function(value: any, item: any, index: number) {
        return value && value instanceof Array ? value.join(', ') : '';
      },
      minWidth: 200,
    },
    {
      field: "doctor",
      name: "Bác Sĩ",
      algin: "left",
      minWidth: 200,
    },
    {
      field: "status",
      name: "Trạng Thái",
      algin: "center",
      template: function(value: any, item: any, index: number) {
        if (value === "Pending") return <Badge radius="sm" color="orange">Hoãn</Badge>
        if (value === "Approved") return <Badge radius="sm" color="green">Chấp nhận</Badge>
        if (value === "Rejected") return <Badge radius="sm" color="red">Từ chối</Badge>
        return <></>
      },
      minWidth: 200,
    },
     {
      field: "message",
      name: "Tin Nhắn",
      algin: "left",
      minWidth: 300,
    },
    {
      field: "action",
      name: "#",
      algin: "center",
      template: <>button</>,
    },
  ];

  return (
    <Card withBorder radius={"md"} className={"p-10"}>
      <Card.Section pb={10} className="border-b border-gray-300">
        <Grid>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <Text fz="lg" fw={500}>Danh sách Cuộc Hẹn</Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }} className="text-right">
            <Button size={"xs"} leftSection={<IconPlus />}>Thêm</Button>
          </Grid.Col>
        </Grid>
      </Card.Section>

      <Card.Section>
        <DatatableComponent 
          data={appointments} 
          columns={columns} 
          isPaging
          totalItems={totalItems}
          isRowNumber
          onChangePage={value => setPage(value)}
          onChangePageSize={value => setPageSize(value)}
        />
      </Card.Section>
    </Card>
  );
}